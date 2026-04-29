import os
import smtplib
from email.message import EmailMessage

MAIL_SMTP_HOST = (os.getenv("MAIL_SMTP_HOST") or "").strip()
MAIL_SMTP_PORT = int(os.getenv("MAIL_SMTP_PORT", "587"))
MAIL_SMTP_USER = (os.getenv("MAIL_SMTP_USER") or "").strip()
MAIL_SMTP_PASSWORD = (os.getenv("MAIL_SMTP_PASSWORD") or "").strip()
MAIL_FROM_EMAIL = (os.getenv("MAIL_FROM_EMAIL") or "").strip()
MAIL_FROM_NAME = (os.getenv("MAIL_FROM_NAME") or "Setly").strip() or "Setly"
MAIL_USE_SSL = os.getenv("MAIL_SMTP_SSL", "0") == "1"
MAIL_USE_STARTTLS = os.getenv("MAIL_SMTP_STARTTLS", "1") == "1"


def _require_mail_config() -> None:
    if not MAIL_SMTP_HOST or not MAIL_FROM_EMAIL:
        raise RuntimeError("Mail server is not configured")
    if MAIL_SMTP_USER and not MAIL_SMTP_PASSWORD:
        raise RuntimeError("MAIL_SMTP_PASSWORD is required when MAIL_SMTP_USER is set")


def send_password_recovery_email(to_email: str, recovery_url: str) -> None:
    _require_mail_config()

    subject = "Восстановление пароля"
    html = f"""
    <html>
      <body style="margin:0;padding:0;background:#F9F9F9;font-family:Inter,Arial,sans-serif;color:#383838;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9F9F9;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;padding:28px 24px;">
                <tr>
                  <td style="font-size:28px;font-weight:600;line-height:1.2;color:#245DF5;">Setly</td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-size:20px;font-weight:600;color:#383838;">Восстановление пароля</td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:14px;line-height:1.5;color:#383838;">
                    Мы получили запрос на смену пароля. Нажмите на кнопку ниже, чтобы задать новый пароль.
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;">
                    <a href="{recovery_url}" style="display:inline-block;background:#245DF5;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;padding:12px 18px;border-radius:10px;">
                      Перейти к восстановлению
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;font-size:12px;line-height:1.45;color:#A6A6A6;">
                    Ссылка действует ограниченное время и может быть использована только один раз.
                    Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """.strip()

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{MAIL_FROM_NAME} <{MAIL_FROM_EMAIL}>"
    message["To"] = to_email
    message.set_content(
        "Для восстановления пароля перейдите по ссылке:\n"
        f"{recovery_url}\n\n"
        "Если вы не запрашивали восстановление, проигнорируйте это письмо."
    )
    message.add_alternative(html, subtype="html")

    if MAIL_USE_SSL:
        with smtplib.SMTP_SSL(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
            if MAIL_SMTP_USER:
                smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
            smtp.send_message(message)
        return

    with smtplib.SMTP(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
        if MAIL_USE_STARTTLS:
            smtp.starttls()
        if MAIL_SMTP_USER:
            smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
        smtp.send_message(message)


def send_admin_otp_email(to_email: str, otp_code: str) -> None:
    _require_mail_config()

    subject = "Код входа — Setly Admin"
    html = f"""
    <html>
      <body style="margin:0;padding:0;background:#F9F9F9;font-family:Inter,Arial,sans-serif;color:#383838;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9F9F9;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;padding:28px 24px;">
                <tr>
                  <td style="font-size:28px;font-weight:600;line-height:1.2;color:#245DF5;">Setly</td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-size:20px;font-weight:600;color:#383838;">Код входа в панель администратора</td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:14px;line-height:1.5;color:#383838;">
                    Ваш одноразовый код для входа в панель администратора Setly:
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;">
                    <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#245DF5;background:#F0F4FF;border-radius:10px;padding:16px 24px;text-align:center;">
                      {otp_code}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;font-size:12px;line-height:1.45;color:#A6A6A6;">
                    Код действует 10 минут и может быть использован только один раз.
                    Если вы не запрашивали вход, проигнорируйте это письмо.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """.strip()

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{MAIL_FROM_NAME} <{MAIL_FROM_EMAIL}>"
    message["To"] = to_email
    message.set_content(
        f"Ваш код входа в панель администратора Setly: {otp_code}\n\n"
        "Код действует 10 минут."
    )
    message.add_alternative(html, subtype="html")

    if MAIL_USE_SSL:
        with smtplib.SMTP_SSL(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
            if MAIL_SMTP_USER:
                smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
            smtp.send_message(message)
        return

    with smtplib.SMTP(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
        if MAIL_USE_STARTTLS:
            smtp.starttls()
        if MAIL_SMTP_USER:
            smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
        smtp.send_message(message)


def send_email_verification_otp(to_email: str, otp_code: str) -> None:
    _require_mail_config()

    subject = "Подтверждение почты — Setly"
    html = f"""
    <html>
      <body style="margin:0;padding:0;background:#F9F9F9;font-family:Inter,Arial,sans-serif;color:#383838;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9F9F9;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;padding:28px 24px;">
                <tr>
                  <td style="font-size:28px;font-weight:600;line-height:1.2;color:#245DF5;">Setly</td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-size:20px;font-weight:600;color:#383838;">Подтверждение электронной почты</td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:14px;line-height:1.5;color:#383838;">
                    Для завершения регистрации введите код подтверждения:
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;">
                    <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#245DF5;background:#F0F4FF;border-radius:10px;padding:16px 24px;text-align:center;">
                      {otp_code}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;font-size:12px;line-height:1.45;color:#A6A6A6;">
                    Код действует 10 минут. Если вы не регистрировались на Setly, проигнорируйте это письмо.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """.strip()

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{MAIL_FROM_NAME} <{MAIL_FROM_EMAIL}>"
    message["To"] = to_email
    message.set_content(
        f"Ваш код подтверждения почты Setly: {otp_code}\n\nКод действует 10 минут."
    )
    message.add_alternative(html, subtype="html")

    if MAIL_USE_SSL:
        with smtplib.SMTP_SSL(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
            if MAIL_SMTP_USER:
                smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
            smtp.send_message(message)
        return

    with smtplib.SMTP(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
        if MAIL_USE_STARTTLS:
            smtp.starttls()
        if MAIL_SMTP_USER:
            smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
        smtp.send_message(message)


def send_recovery_otp_email(to_email: str, otp_code: str) -> None:
    _require_mail_config()

    subject = "Восстановление пароля — Setly"
    html = f"""
    <html>
      <body style="margin:0;padding:0;background:#F9F9F9;font-family:Inter,Arial,sans-serif;color:#383838;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9F9F9;padding:24px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border-radius:14px;padding:28px 24px;">
                <tr>
                  <td style="font-size:28px;font-weight:600;line-height:1.2;color:#245DF5;">Setly</td>
                </tr>
                <tr>
                  <td style="padding-top:16px;font-size:20px;font-weight:600;color:#383838;">Восстановление пароля</td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-size:14px;line-height:1.5;color:#383838;">
                    Введите код для подтверждения и сброса пароля:
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;">
                    <div style="font-size:36px;font-weight:700;letter-spacing:8px;color:#245DF5;background:#F0F4FF;border-radius:10px;padding:16px 24px;text-align:center;">
                      {otp_code}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:18px;font-size:12px;line-height:1.45;color:#A6A6A6;">
                    Код действует 10 минут. Если вы не запрашивали восстановление пароля, проигнорируйте это письмо.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    """.strip()

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = f"{MAIL_FROM_NAME} <{MAIL_FROM_EMAIL}>"
    message["To"] = to_email
    message.set_content(
        f"Ваш код восстановления пароля Setly: {otp_code}\n\nКод действует 10 минут."
    )
    message.add_alternative(html, subtype="html")

    if MAIL_USE_SSL:
        with smtplib.SMTP_SSL(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
            if MAIL_SMTP_USER:
                smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
            smtp.send_message(message)
        return

    with smtplib.SMTP(MAIL_SMTP_HOST, MAIL_SMTP_PORT, timeout=20) as smtp:
        if MAIL_USE_STARTTLS:
            smtp.starttls()
        if MAIL_SMTP_USER:
            smtp.login(MAIL_SMTP_USER, MAIL_SMTP_PASSWORD)
        smtp.send_message(message)
