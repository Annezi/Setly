from totp_utils import (
    decrypt_secret,
    encrypt_secret,
    generate_backup_codes,
    generate_totp_secret,
    hash_backup_code,
    verify_totp_code,
)


def test_encrypt_roundtrip():
    secret = generate_totp_secret()
    encrypted = encrypt_secret(secret)
    assert encrypted
    assert decrypt_secret(encrypted) == secret


def test_totp_generation_and_verify():
    secret = generate_totp_secret()
    assert verify_totp_code(secret, "12") is False
    assert verify_totp_code(secret, "abcdef") is False
    # smoke for format: generated secret should be base32-like
    assert len(secret) >= 16


def test_backup_codes_hashing():
    codes = generate_backup_codes(amount=4)
    assert len(codes) == 4
    hashed = [hash_backup_code(c) for c in codes]
    assert len(set(hashed)) == 4
