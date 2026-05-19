import base64
import hashlib
import hmac
import os
import secrets
import struct
import time
from typing import List

try:
    from cryptography.fernet import Fernet, InvalidToken

    _FERNET_AVAILABLE = True
except ImportError:
    Fernet = None  # type: ignore[misc, assignment]
    InvalidToken = Exception  # type: ignore[misc, assignment]
    _FERNET_AVAILABLE = False


TOTP_TIME_STEP = 30
TOTP_DIGITS = 6


def _fernet_key_bytes() -> bytes:
    raw = (os.getenv("TOTP_ENCRYPTION_KEY") or "").strip()
    if raw:
        try:
            return raw.encode("utf-8")
        except Exception:
            pass
    seed = (os.getenv("JWT_SECRET") or "totp-dev-key").encode("utf-8")
    return base64.urlsafe_b64encode(hashlib.sha256(seed).digest())


def _fernet() -> "Fernet":
    if not _FERNET_AVAILABLE:
        raise RuntimeError("cryptography package is not installed")
    return Fernet(_fernet_key_bytes())


def _xor_cipher_key() -> bytes:
    raw = (os.getenv("TOTP_ENCRYPTION_KEY") or os.getenv("JWT_SECRET") or "").encode("utf-8")
    if not raw:
        raise RuntimeError("TOTP_ENCRYPTION_KEY or JWT_SECRET is required")
    return hashlib.sha256(raw).digest()


def _xor_encrypt(raw_secret: str) -> str:
    data = raw_secret.encode("utf-8")
    key = _xor_cipher_key()
    xored = bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])
    return base64.urlsafe_b64encode(xored).decode("utf-8")


def _xor_decrypt(enc_secret: str) -> str:
    data = base64.urlsafe_b64decode(enc_secret.encode("utf-8"))
    key = _xor_cipher_key()
    raw = bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])
    return raw.decode("utf-8")


def encrypt_secret(raw_secret: str) -> str:
    if _FERNET_AVAILABLE:
        return _fernet().encrypt(raw_secret.encode("utf-8")).decode("utf-8")
    return _xor_encrypt(raw_secret)


def decrypt_secret(enc_secret: str) -> str:
    if not enc_secret:
        return ""
    if _FERNET_AVAILABLE:
        try:
            return _fernet().decrypt(enc_secret.encode("utf-8")).decode("utf-8")
        except (InvalidToken, ValueError):
            return _xor_decrypt(enc_secret)
    return _xor_decrypt(enc_secret)


def generate_totp_secret() -> str:
    return base64.b32encode(secrets.token_bytes(20)).decode("utf-8").replace("=", "")


def _hotp(secret: str, counter: int) -> str:
    padded = secret + "=" * ((8 - len(secret) % 8) % 8)
    key = base64.b32decode(padded, casefold=True)
    msg = struct.pack(">Q", counter)
    digest = hmac.new(key, msg, hashlib.sha1).digest()
    offset = digest[-1] & 0x0F
    code_int = (
        ((digest[offset] & 0x7F) << 24)
        | (digest[offset + 1] << 16)
        | (digest[offset + 2] << 8)
        | digest[offset + 3]
    )
    return str(code_int % (10 ** TOTP_DIGITS)).zfill(TOTP_DIGITS)


def verify_totp_code(secret: str, code: str, window: int = 1) -> bool:
    normalized = (code or "").strip().replace(" ", "")
    if not normalized.isdigit() or len(normalized) != TOTP_DIGITS:
        return False
    now_counter = int(time.time() // TOTP_TIME_STEP)
    for delta in range(-window, window + 1):
        if hmac.compare_digest(_hotp(secret, now_counter + delta), normalized):
            return True
    return False


def make_totp_uri(secret: str, email: str, issuer: str = "Setly") -> str:
    from urllib.parse import quote

    label = quote(f"{issuer}:{email}")
    issuer_q = quote(issuer)
    return (
        f"otpauth://totp/{label}?secret={secret}&issuer={issuer_q}&algorithm=SHA1&digits=6&period=30"
    )


def hash_backup_code(code: str) -> str:
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


def generate_backup_codes(amount: int = 8) -> List[str]:
    return [secrets.token_hex(4).upper() for _ in range(amount)]
