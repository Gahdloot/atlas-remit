import os
import boto3
from botocore.exceptions import NoCredentialsError

# DigitalOcean Spaces credentials
SPACE_NAME = os.environ.get("DO_SPACE_NAME")
REGION = "your-region"  # Example: "nyc3"
ACCESS_KEY = os.environ.get("DO_ACCESS_KEY")
SECRET_KEY = os.environ.get("DO_SECRET_KEY")

# Initialize DigitalOcean Spaces client
s3_client = boto3.client(
    "s3",
    region_name="nyc3",
    endpoint_url="https://files-processor.nyc3.digitaloceanspaces.com",
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)


def upload_to_spaces(uploaded_file, filename):
    """Uploads file from request.FILES to DigitalOcean Spaces"""
    try:
        # file_name = uploaded_file.name  # Get the file name
        s3_client.upload_fileobj(uploaded_file, SPACE_NAME, filename + ".pdf")

        # Generate the file URL
        file_url = f"https://{SPACE_NAME}.nyc3.digitaloceanspaces.com/{filename}"

        print(f"File uploaded successfully: {file_url}")
        return file_url  # Return the URL of the uploaded file

    except NoCredentialsError:
        print("Credentials not available")
        return None


# Download a file
def download_file(object_name, file_name):
    """Download a file from DigitalOcean Spaces"""
    try:
        s3_client.download_file(SPACE_NAME, object_name, file_name)
        print(f"File '{object_name}' downloaded as '{file_name}'")
    except NoCredentialsError:
        print("Credentials not available")


# List all files in the Space
def list_files():
    """List files in DigitalOcean Spaces"""
    try:
        response = s3_client.list_objects_v2(Bucket=SPACE_NAME)
        if "Contents" in response:
            for obj in response["Contents"]:
                print(obj["Key"])
        else:
            print("No files found")
    except NoCredentialsError:
        print("Credentials not available")


# Delete a file
def delete_file(object_name):
    """Delete a file from DigitalOcean Spaces"""
    try:
        s3_client.delete_object(Bucket=SPACE_NAME, Key=object_name)
        # TODO: test deletion after file processing
        print(f"File '{object_name}' deleted")
    except NoCredentialsError:
        print("Credentials not available")
