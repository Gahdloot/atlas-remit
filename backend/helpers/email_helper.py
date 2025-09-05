# import threading
# from django.core.mail import EmailMessage
# from django.template.loader import render_to_string
# from django.conf import settings
# from typing import List, Optional, Dict, Tuple


# class EmailHelper:
#     @staticmethod
#     def send_email_with_attachment(
#         subject: str,
#         to: List[str],
#         template_name: str,
#         context: Dict,
#         pdf_file: Optional[Tuple[str, bytes, str]] = None,  # (filename, file_data, mime_type)
#         from_email: Optional[str] = None,
#     ) -> bool:
#         """
#         Send an email using a template, with optional PDF attachment.

#         :param subject: Email subject
#         :param to: List of recipients
#         :param template_name: Path to HTML template
#         :param context: Context for rendering the template
#         :param pdf_file: Tuple of (filename, file_data, mime_type), e.g. ("receipt.pdf", b"...", "application/pdf")
#         :param from_email: Optional sender email
#         :return: True if sent successfully
#         """
#         try:
#             from_email = from_email or settings.DEFAULT_FROM_EMAIL

#             html_body = render_to_string(template_name, context)

#             email = EmailMessage(subject, html_body, from_email, to)
#             email.content_subtype = "html"

#             if pdf_file:
#                 email.attach(*pdf_file)  

#             threading.Thread(target=email.send, kwargs={"fail_silently": False}).start()

#             return True
#         except Exception as e:
#             print(f"Error sending email: {e}")
#             return False



import os
import threading
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content, Attachment, FileContent, FileName, FileType, Disposition
from django.template.loader import render_to_string
from django.conf import settings
from typing import List, Optional, Dict, Tuple
import base64


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
        Send an email using SendGrid API with optional PDF attachment.
        """
        try:
            from_email = from_email or settings.DEFAULT_FROM_EMAIL
            html_body = render_to_string(template_name, context)

            message = Mail(
                from_email=Email(from_email),
                to_emails=[To(email) for email in to],
                subject=subject,
                html_content=Content("text/html", html_body),
            )

            if pdf_file:
                filename, file_data, mime_type = pdf_file
                encoded_file = base64.b64encode(file_data).decode()
                attachment = Attachment(
                    FileContent(encoded_file),
                    FileName(filename),
                    FileType(mime_type),
                    Disposition("attachment")
                )
                message.attachment = attachment

            def send():
                sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                response = sg.send(message)
                print(f"SendGrid response: {response.status_code}")

            threading.Thread(target=send).start()

            return True
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
