from rest_framework import serializers

from account.models.payment_request import SchoolPaymentRequest

class SchoolPaymentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolPaymentRequest
        fields = [
            'id', 'name', 'created_at',
            'student_first_name', 'student_last_name', 'student_email',
            'student_id', 'student_id_type', 'student_id_expired_at',
            'student_document',
            'country_paying_from', 'country_paying_to', 'payment_amount',
            'payer', 'payer_id_type', 'payer_id_expired_at', 'payer_id_document',
            'university', 'payment_status', 'payment_receipt'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_payment_amount(self, value):
        """Validate payment amount is positive"""
        if value <= 0:
            raise serializers.ValidationError("Payment amount must be greater than 0")
        return value

    def validate_student_email(self, value):
        """Basic email validation"""
        if not value or '@' not in value:
            raise serializers.ValidationError("Please provide a valid email address")
        return value

    def validate(self, data):
        """Cross-field validation"""
        # from datetime import date
        
        # # Check if ID expiry dates are not in the past
        # if data.get('student_id_expired_at') and data['student_id_expired_at'] < date.today():
        #     raise serializers.ValidationError({
        #         'student_id_expired_at': 'Student ID expiry date cannot be in the past'
        #     })
        
        # if data.get('payer_id_expired_at') and data['payer_id_expired_at'] < date.today():
        #     raise serializers.ValidationError({
        #         'payer_id_expired_at': 'Payer ID expiry date cannot be in the past'
        #     })
        
        return data
