from rest_framework import serializers

from account.models.payment_request import SchoolPaymentRequest

class SchoolPaymentRequestSerializer(serializers.ModelSerializer):
    # Map camelCase JSON keys to snake_case model fields:
    amountNGN = serializers.DecimalField(source='amount_ngn', max_digits=15, decimal_places=2)
    amountCAD = serializers.DecimalField(source='amount_cad', max_digits=15, decimal_places=2)
    studentFirstName = serializers.CharField(source='student_first_name')
    studentLastName = serializers.CharField(source='student_last_name')
    studentEmail = serializers.EmailField(source='student_email')
    studentPersonalEmail = serializers.EmailField(source='student_personal_email', allow_null=True, required=False)
    studentPhoneNumber = serializers.CharField(source='student_phone_number', allow_null=True, required=False)
    studentDateOfBirth = serializers.DateField(source='student_date_of_birth', allow_null=True, required=False)
    studentExpectedYearOfCompletion = serializers.CharField(source='student_expected_year_of_completion', allow_null=True, required=False)
    studentInstitution = serializers.CharField(source='student_institution', allow_null=True, required=False)
    studentProgramStudied = serializers.CharField(source='student_program_studied', allow_null=True, required=False)

    countryFrom = serializers.CharField(source='country_from', allow_null=True, required=False)
    payerAddress = serializers.CharField(source='payer_address', allow_null=True, required=False)
    payerCity = serializers.CharField(source='payer_city', allow_null=True, required=False)
    payerFirstName = serializers.CharField(source='payer_first_name', allow_null=True, required=False)
    payerLastName = serializers.CharField(source='payer_last_name', allow_null=True, required=False)
    payerPhoneNumber = serializers.CharField(source='payer_phone_number', allow_null=True, required=False)
    payerState = serializers.CharField(source='payer_state', allow_null=True, required=False)
    payerType = serializers.CharField(source='payer_type', allow_null=True, required=False)
    payerZipCode = serializers.CharField(source='payer_zip_code', allow_null=True, required=False)
    paymentType = serializers.CharField(source='payment_type', allow_null=True, required=False)

    class Meta:
        model = SchoolPaymentRequest
        fields = [
            'id',  'created_at',
            'amountNGN', 'amountCAD',
            'countryFrom', 'payerAddress', 'payerCity', 'payerFirstName', 'payerLastName',
            'payerPhoneNumber', 'payerState', 'payerType', 'payerZipCode', 'paymentType',
            'studentDateOfBirth', 'studentEmail', 'studentExpectedYearOfCompletion', 'studentFirstName',
            'studentInstitution', 'studentLastName', 'studentPersonalEmail', 'studentPhoneNumber',
            'studentProgramStudied',
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


class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    type = serializers.CharField(max_length=50, required=False, default='welcome')


class VirtualAccountSerializer(serializers.Serializer):
    payment_request_id = serializers.CharField()
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)


class PaymentVerificationSerializer(serializers.Serializer):
    payment_reference = serializers.CharField(required=False)
    transaction_id = serializers.CharField(required=False)