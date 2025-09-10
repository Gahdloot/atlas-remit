import os
import mimetypes
import boto3
from botocore.exceptions import NoCredentialsError, ClientError
from botocore.exceptions import NoCredentialsError
import environ
from backend.settings import BASE_DIR

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# DigitalOcean Spaces credentials
SPACE_NAME = env("DO_SPACE_NAME")
ACCESS_KEY = env("DO_ACCESS_KEY")
SECRET_KEY = env("DO_SECRET_KEY")
REGION = env("DO_REGION", default="sfo3") 

s3_client = boto3.client(
    "s3",
    region_name=REGION,
    endpoint_url=f"https://{REGION}.digitaloceanspaces.com",
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)


def upload_to_spaces(uploaded_file, filename, content_type=None):
    """
    Uploads a file-like object to DigitalOcean Spaces.
    Puts all files inside the 'nexus' folder.
    """
    try:
        region = env("DO_REGION", default="sfo3")

        extension = mimetypes.guess_extension(content_type) if content_type else None
        if not extension:
            extension = ".jpg"

        name, _ = os.path.splitext(filename)
        full_filename = f"nexus/{name}{extension}"  # <-- prefix with folder

        # Upload file with key 'nexus/filename.ext'
        s3_client.upload_fileobj(uploaded_file, SPACE_NAME, full_filename)

        file_url = f"https://{SPACE_NAME}.{region}.digitaloceanspaces.com/{full_filename}"
        print(f"File uploaded successfully: {file_url}")
        return file_url

    except (NoCredentialsError, ClientError) as e:
        print(f"Upload failed: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
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


