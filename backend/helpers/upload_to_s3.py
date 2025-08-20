import boto3
from django.conf import settings

def upload_base64_to_s3(file, filename, bucket=None, folder="documents"):
    s3 = boto3.client('s3')
    bucket = bucket or settings.AWS_STORAGE_BUCKET_NAME
    key = f"{folder}/{filename}"
    
    s3.upload_fileobj(file, bucket, key, ExtraArgs={'ACL': 'public-read'})
    return f"https://{bucket}.s3.amazonaws.com/{key}"
