import random
import string
import uuid
from django.db import models




class SchoolPaymentRequestInitializer(models.Model):
    id = models.UUIDField(
        primary_key=True,  
        default=uuid.uuid4,  
        editable=False 
    )
    created_at = models.DateTimeField(auto_now_add=True)
    email = models.EmailField()
    status = models.CharField(
        choices=(
            ('pending','pending'),
            ('completed','completed'),
        ),
        max_length=10, 
        null=True, 
        blank=True
    )


    def __str__(self):
        return self.email


class SchoolPaymentRequest(models.Model):
    id = models.UUIDField(
        primary_key=True,  
        default=uuid.uuid4,  
        editable=False 
    )
    created_at = models.DateTimeField(auto_now_add=True)

    amount_ngn = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    amount_cad = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    country_from = models.CharField(max_length=64, null=True, blank=True)
    payer_address = models.CharField(max_length=255, null=True, blank=True)
    payer_city = models.CharField(max_length=64, null=True, blank=True)
    payer_first_name = models.CharField(max_length=64, null=True, blank=True)
    payer_last_name = models.CharField(max_length=64, null=True, blank=True)
    payer_phone_number = models.CharField(max_length=20, null=True, blank=True)
    payer_state = models.CharField(max_length=64, null=True, blank=True)
    payer_type = models.CharField(max_length=50, null=True, blank=True)
    payer_zip_code = models.CharField(max_length=20, null=True, blank=True)
    payment_type = models.CharField(max_length=100, null=True, blank=True)
    student_date_of_birth = models.DateField(null=True, blank=True)
    student_email = models.EmailField()
    student_expected_year_of_completion = models.CharField(max_length=4, null=True, blank=True)
    student_first_name = models.CharField(max_length=64)
    student_institution = models.CharField(max_length=100, null=True, blank=True)
    student_last_name = models.CharField(max_length=64)
    student_personal_email = models.EmailField(null=True, blank=True)
    student_phone_number = models.CharField(max_length=20, null=True, blank=True)
    student_program_studied = models.CharField(max_length=100, null=True, blank=True)
    payment_initializer = models.OneToOneField(SchoolPaymentRequestInitializer, on_delete=models.SET_NULL, null=True, blank=True)
    processing_status = models.CharField(
        max_length=20,
        choices=(
            ("pending",'pending'),
            ("initiated",'initiated'),
            ("processing",'processing'),
            ("in-transit",'in-transit'),
            ("delivered",'delivered'),
            ("confirmed",'confirmed'),
        ),
        default='pending'
    )
    payment_id = models.CharField(
        max_length=16,
        unique=True,
        null=True,
        blank=True
    )


    def generate_unique_payment_id(self):
        while True:
            new_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
            if not SchoolPaymentRequest.objects.filter(payment_id=new_id).exists():
                return new_id

    def save(self, *args, **kwargs):
        if not self.payment_id:
            self.payment_id = self.generate_unique_payment_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student_first_name} {self.student_last_name} - {self.payment_id}"



