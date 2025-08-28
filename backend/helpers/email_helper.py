import threading
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.conf import settings
from typing import List, Optional, Dict, Tuple


class EmailHelper:
    @staticmethod
    def send_email_with_attachment(
        subject: str,
        to: List[str],
        template_name: str,
        context: Dict,
        pdf_file: Optional[Tuple[str, bytes, str]] = None,  # (filename, file_data, mime_type)
        from_email: Optional[str] = None,
    ) -> bool:
        """
        Send an email using a template, with optional PDF attachment.

        :param subject: Email subject
        :param to: List of recipients
        :param template_name: Path to HTML template
        :param context: Context for rendering the template
        :param pdf_file: Tuple of (filename, file_data, mime_type), e.g. ("receipt.pdf", b"...", "application/pdf")
        :param from_email: Optional sender email
        :return: True if sent successfully
        """
        try:
            from_email = from_email or settings.DEFAULT_FROM_EMAIL

            html_body = render_to_string(template_name, context)

            email = EmailMessage(subject, html_body, from_email, to)
            email.content_subtype = "html"

            if pdf_file:
                email.attach(*pdf_file)  

            threading.Thread(target=email.send, kwargs={"fail_silently": False}).start()

            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
