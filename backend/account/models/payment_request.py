import uuid
from django.db import models



class SchoolPaymentRequest(models.Model):
    id = models.UUIDField(
        primary_key=True,  
        default=uuid.uuid4,  
        editable=False 
    )
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    # student data
    student_first_name = models.CharField(max_length=64)
    student_last_name = models.CharField(max_length=64)
    student_email = models.EmailField()
    student_id = models.CharField(max_length=64)
    student_id_type = models.CharField(max_length=64)
    student_id_expired_at = models.DateField()
    student_document = models.TextField() 

    # payment details
    country_paying_from = models.CharField(max_length=64)
    country_paying_to = models.CharField(max_length=64)
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payer = models.CharField(max_length=64)
    payer_id_type = models.CharField(max_length=64)
    payer_id_expired_at = models.DateField()
    payer_id_document = models.TextField() # this will be url

    # university detail
    university = models.CharField(max_length=100)

    payment_status = models.CharField(
        max_length=10, 
        default='penidng',
        choices=(
        ('pending','pending'),
        ('paid','paid'),
        ('failed','failed'),
    ),
    )

    payment_receipt = models.TextField(null=True)





    def __str__(self):
        return self.name
