import requests
import json
import hashlib
import hmac
import time
import uuid
from datetime import datetime
from typing import Dict, Optional, Any, List
from dataclasses import dataclass
import logging
import ssl
import urllib3
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from cryptography.hazmat.backends import default_backend
import base64
import hashlib

# Disable SSL warnings for testing (remove in production)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class PalmPayConfig:
    """Configuration class for PalmPay API settings"""
    merchant_id: str
    secret_key: str
    app_id: str
    base_url: str = "https://open-gw-daily.palmpay-inc.com"
    sandbox_url: str = "https://open-gw-daily.palmpay-inc.com"
    is_sandbox: bool = True
    timeout: int = 30

@dataclass
class OrderItem:
    """Represents an item in the order"""
    goods_id: str
    name: str
    price: float
    quantity: int = 1
    description: Optional[str] = None
    category: Optional[str] = None

@dataclass
class CustomerInfo:
    """Customer information for the order"""
    user_id: str
    user_name: str
    email: str
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None

@dataclass
class SplitMerchant:
    """Split merchant information"""
    split_merchant_id: str
    split_amount: float
    remark: str = ""

@dataclass
class SplitDetail:
    """Split payment configuration"""
    is_split: bool
    split_amount_type: int  # 1 for fixed amount, 2 for percentage
    split_fee_type: int  # Fee type
    split_merchant_list: List[SplitMerchant]

class PalmPayException(Exception):
    """Custom exception for PalmPay API errors"""
    def __init__(self, message: str, error_code: str = None, response_data: dict = None):
        super().__init__(message)
        self.error_code = error_code
        self.response_data = response_data

class PalmPayCheckout:
    """
    PalmPay Checkout API Integration Helper
    
    This class provides methods to integrate with PalmPay's checkout API
    for creating payment orders and handling transactions.
    """
    
    def __init__(self, config: PalmPayConfig):
        """
        Initialize PalmPay checkout helper
        
        Args:
            config (PalmPayConfig): Configuration object with API credentials
        """
        self.config = config
        self.base_url = config.sandbox_url if config.is_sandbox else config.base_url
        self.session = requests.Session()
        
        # Configure SSL settings for testing (remove verify=False in production)
        self.session.verify = False
        
        # Set default headers
        self.session.headers.update({
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'CountryCode': 'NG'
        })
    
    def _generate_nonce_str(self) -> str:
        """Generate a random nonce string"""
        return str(uuid.uuid4()).replace('-', '')[:32]
    
    def _generate_signature(self, payload: dict) -> str:
        """
        Generate signature for API authentication based on PalmPay documentation
        
        The correct PalmPay signature method:
        1. Sort parameters by ASCII order
        2. Create string in format key1=value1&key2=value2...&key=secret_key
        3. MD5 hash and convert to uppercase
        
        Args:
            payload (dict): Request payload
            
        Returns:
            str: Generated signature
        """
        # Step 1: Create sorted parameter string
        def flatten_dict(d, parent_key=''):
            items = []
            for k, v in sorted(d.items()):  # Sort by key
                if isinstance(v, dict):
                    # For nested objects, flatten them
                    items.extend(flatten_dict(v, f"{parent_key}.{k}" if parent_key else k))
                elif isinstance(v, list):
                    # Convert lists to JSON string
                    items.append((k, json.dumps(v, separators=(',', ':'))))
                elif v is not None and str(v).strip():  # Skip empty values
                    items.append((k, str(v)))
            return items
        
        # Get all non-empty parameters and sort them
        params = []
        for k, v in sorted(payload.items()):
            if v is not None and str(v).strip():
                if isinstance(v, (dict, list)):
                    params.append((k, json.dumps(v, separators=(',', ':'))))
                else:
                    params.append((k, str(v)))
        
        # Create string to sign
        string_to_sign = '&'.join([f"{k}={v}" for k, v in params])
        string_to_sign += f"&key={self.config.secret_key}"
        
        print(f"String to sign: {string_to_sign}")
        
        # Step 2: MD5 hash and convert to uppercase
        signature = hashlib.md5(string_to_sign.encode('utf-8')).hexdigest().upper()
        print(f"Generated signature: {signature}")
        
        return signature
    
    def _get_headers(self, payload: dict) -> dict:
        """
        Generate headers with authentication signature
        
        Args:
            payload (dict): Request payload
            
        Returns:
            dict: Headers with signature
        """
        signature = self._generate_signature(payload)
        
        return {
            'Authorization': f'Bearer {self.config.app_id}',
            'Signature': signature,
        }
    
    def _make_request(self, method: str, endpoint: str, payload: dict = None) -> dict:
        """
        Make API request with proper authentication
        
        Args:
            method (str): HTTP method
            endpoint (str): API endpoint
            payload (dict): Request payload
            
        Returns:
            dict: API response
            
        Raises:
            PalmPayException: If API request fails
        """
        url = f"{self.base_url}{endpoint}"
        print('===='*10)
        print(f"Request URL: {url}")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        try:
            if payload:
                headers = self._get_headers(payload)
                self.session.headers.update(headers)
                
                print(f"Headers: {dict(self.session.headers)}")
                
                response = self.session.request(
                    method, 
                    url, 
                    json=payload, 
                    timeout=self.config.timeout
                )
            else:
                response = self.session.request(
                    method, 
                    url, 
                    timeout=self.config.timeout
                )
            
            # Log request details (excluding sensitive data)
            logger.info(f"{method} {url} - Status: {response.status_code}")
            print(f"Response Status: {response.status_code}")
            print(f"Response Text: {response.text}")
            
            response_data = response.json() if response.content else {}
            
            if not response.ok:
                error_message = response_data.get('message', f'HTTP {response.status_code} error')
                error_code = response_data.get('code', str(response.status_code))
                raise PalmPayException(
                    error_message, 
                    error_code=error_code, 
                    response_data=response_data
                )
            
            return response_data
            
        except requests.exceptions.SSLError as e:
            logger.error(f"SSL Error: {str(e)}")
            print(f"SSL Error - this might be due to certificate issues with the sandbox environment")
            print(f"Consider using a different approach or contacting PalmPay support")
            raise PalmPayException(f"SSL Error: {str(e)}")
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {str(e)}")
            raise PalmPayException(f"Request failed: {str(e)}")
        except json.JSONDecodeError:
            raise PalmPayException("Invalid JSON response from API")
    
    def create_order(
        self,
        order_id: str,
        amount: float,
        currency: str,
        customer: CustomerInfo,
        title: str,
        items: List[OrderItem] = None,
        notify_url: str = None,
        callback_url: str = None,
        description: str = None,
        remark: str = None,
        split_detail: SplitDetail = None
    ) -> dict:
        """
        Create a new payment order following PalmPay API specification
        
        Args:
            order_id (str): Unique order identifier
            amount (float): Order amount
            currency (str): Currency code (e.g., 'NGN', 'USD')
            customer (CustomerInfo): Customer information
            title (str): Order title
            items (List[OrderItem]): List of order items
            notify_url (str): Webhook URL for payment notifications
            callback_url (str): URL to redirect after payment
            description (str): Order description
            remark (str): Order remark
            split_detail (SplitDetail): Split payment configuration
            
        Returns:
            dict: Order creation response with payment URL
        """
        current_time_ms = int(time.time() * 1000)
        nonce_str = self._generate_nonce_str()
        
        # Build payload with only required and provided optional parameters
        payload = {
            'requestTime': current_time_ms,
            'version': 'V1.1',
            'nonceStr': nonce_str,
            'amount': int(amount),  # PalmPay expects integer amount in smallest currency unit
            'orderId': order_id,
            'title': title,
            'currency': currency.upper()
        }
        
        # Add optional parameters only if provided
        if description:
            payload['description'] = description
            
        if notify_url:
            payload['notifyUrl'] = notify_url
            
        if callback_url:
            payload['callBackUrl'] = callback_url
            
        if remark:
            payload['remark'] = remark
        
        # Add customer info as JSON string
        customer_info = {
            'userId': customer.user_id,
            'userName': customer.user_name,
            'phone': customer.phone,
            'email': customer.email
        }
        
        if customer.address:
            customer_info['address'] = customer.address
        if customer.city:
            customer_info['city'] = customer.city
        if customer.country:
            customer_info['country'] = customer.country
            
        # payload['customerInfo'] = json.dumps(customer_info, separators=(',', ':'))
        
        # Add goods details as JSON string
        if items:
            goods_details = []
            for item in items:
                item_dict = {
                    'goodsId': item.goods_id,
                    'name': item.name,
                    'price': item.price,
                    'quantity': item.quantity
                }
                
                # Add optional item details
                if item.description:
                    item_dict['description'] = item.description
                if item.category:
                    item_dict['category'] = item.category
                    
                goods_details.append(item_dict)
            
            payload['goodsDetails'] = json.dumps(goods_details, separators=(',', ':'))
        
        # Add split details if provided
        if split_detail and split_detail.is_split:
            split_data = {
                'isSplit': split_detail.is_split,
                'splitAmountType': split_detail.split_amount_type,
                'splitFeeType': split_detail.split_fee_type,
                'splitMerchantList': [
                    {
                        'splitMerchantId': merchant.split_merchant_id,
                        'splitAmount': int(merchant.split_amount),
                        'remark': merchant.remark
                    }
                    for merchant in split_detail.split_merchant_list
                ]
            }
            payload['splitDetail'] = json.dumps(split_data, separators=(',', ':'))
        
        response = self._make_request('POST', '/api/v2/payment/merchant/createorder', payload)
        
        logger.info(f"Order created successfully: {order_id}")
        return response
    
    def get_order_status(self, order_id: str) -> dict:
        """
        Get order status and payment details
        
        Args:
            order_id (str): Order identifier
            
        Returns:
            dict: Order status information
        """
        current_time_ms = int(time.time() * 1000)
        nonce_str = self._generate_nonce_str()
        
        payload = {
            'requestTime': current_time_ms,
            'version': 'V1.1',
            'nonceStr': nonce_str,
            'orderId': order_id
        }
        
        response = self._make_request('POST', '/api/v2/payment/merchant/queryorder', payload)
        
        logger.info(f"Retrieved status for order: {order_id}")
        return response
    
    def verify_webhook_signature(self, payload: dict, signature: str) -> bool:
        """
        Verify webhook signature for security
        
        Args:
            payload (dict): Webhook payload
            signature (str): Signature from webhook headers
            
        Returns:
            bool: True if signature is valid
        """
        expected_signature = self._generate_signature(payload)
        return hmac.compare_digest(signature.upper(), expected_signature)
    
    def handle_webhook(self, request_data: dict, signature: str = None) -> dict:
        """
        Handle incoming webhook notification
        
        Args:
            request_data (dict): Webhook payload
            signature (str): Webhook signature (optional)
            
        Returns:
            dict: Processed webhook data
            
        Raises:
            PalmPayException: If webhook verification fails
        """
        if signature and not self.verify_webhook_signature(request_data, signature):
            raise PalmPayException("Invalid webhook signature")
        
        order_id = request_data.get('orderId')
        status = request_data.get('status')
        
        logger.info(f"Webhook received for order {order_id} with status {status}")
        
        return {
            'order_id': order_id,
            'status': status,
            'amount': request_data.get('amount'),
            'currency': request_data.get('currency'),
            'transaction_id': request_data.get('transactionId'),
            'payment_method': request_data.get('paymentMethod'),
            'raw_data': request_data
        }




    def _generate_signature_new(self, payload: dict) -> str:
        """
        Generate signature for API authentication based on PalmPay documentation
        
        Steps:
        1. Sort parameters by ASCII order and concatenate into key1=value1&key2=value2...
        2. Perform MD5 hash and convert to uppercase
        3. Sign the MD5 hash with SHA1WithRSA using the private key
        
        Args:
            payload (dict): Request payload
            
        Returns:
            str: Generated signature
        """
        # Step 1: Create sorted parameter string
        def flatten_dict(d, parent_key=''):
            items = []
            for k, v in sorted(d.items()):  # Sort by key
                if isinstance(v, dict):
                    items.extend(flatten_dict(v, f"{parent_key}.{k}" if parent_key else k))
                elif isinstance(v, list):
                    items.append((k, json.dumps(v, separators=(',', ':'))))
                elif v is not None and str(v).strip():  # Skip empty values
                    items.append((k, str(v)))
            return items
        
        # Get all non-empty parameters and sort them
        params = flatten_dict(payload)
        string_to_sign = '&'.join([f"{k}={v}" for k, v in params])
        
        print(f"String to sign (Step 1): {string_to_sign}")
        
        # Step 2: MD5 hash and convert to uppercase
        md5_hash = hashlib.md5(string_to_sign.encode('utf-8')).hexdigest().upper()
        print(f"MD5 hash (Step 2): {md5_hash}")
        
        # Step 3: Sign with SHA1WithRSA using the private key
        try:
            # Decode the Base64-encoded private key
            private_key_bytes = base64.b64decode(self.config.secret_key)
            private_key = load_pem_private_key(private_key_bytes, password=None, backend=default_backend())
            
            # Sign the MD5 hash
            signature_bytes = private_key.sign(
                md5_hash.encode('utf-8'),
                padding.PKCS1v15(),
                hashes.SHA1()
            )
            
            # Encode the signature to Base64
            signature = base64.b64encode(signature_bytes).decode('utf-8')
            print(f"Generated signature (Step 3): {signature}")
            
            return signature
        except Exception as e:
            logger.error(f"Signature generation failed: {str(e)}")
            raise PalmPayException(f"Failed to generate signature: {str(e)}")




# Helper functions for easy usage
def create_palmpay_client(merchant_id: str, secret_key: str, app_id: str, sandbox: bool = True) -> PalmPayCheckout:
    """
    Create a PalmPay client with simplified configuration
    
    Args:
        merchant_id (str): PalmPay merchant ID
        secret_key (str): PalmPay secret key
        app_id (str): PalmPay app ID
        sandbox (bool): Use sandbox environment
        
    Returns:
        PalmPayCheckout: Configured PalmPay client
    """
    config = PalmPayConfig(
        merchant_id=merchant_id,
        secret_key=secret_key,
        app_id=app_id,
        is_sandbox=sandbox
    )
    return PalmPayCheckout(config)

def calculate_order_total(items: List[OrderItem]) -> float:
    """
    Calculate total amount for order items
    
    Args:
        items (List[OrderItem]): List of order items
        
    Returns:
        float: Total amount
    """
    return sum(item.price * item.quantity for item in items)

# Example usage with SSL workaround
if __name__ == "__main__":
    # Example configuration
    client = create_palmpay_client(
        app_id='L240924064462689773201',
        merchant_id="124092403536161",
        secret_key="1qSiAgoa30BPSfXSIZb9yxR0f/aAFEjiEFwSa7PbLXFjGUyI1mCSlIHQx7VHy217C3wiv9Em/TQwwnUgj8TBqNElf17YHY2SiFQwFysWxQKBgQDTGrXoituVvB/i6c/pL3FyfsLC4UTwaRpBbybL/sc6gKHYUk95FiwR2MjvlLue8zG070mZDp0/FZZtD6YieH53u4tZFOHr3Or0GmYFd0xQezetki+C7OMsC0ia3yQHkkeRKCHhzgFN3spEPmMowuVn4PsAKfDjgsPoN4MJ46Pk1QKBgQDPzJ6NA4cmm5kDGrz6EHpEFEA1InTInOxa5gLhj7naawh4W51+QIFuPJ8+rA/1yQRT06emBSxXN4gTwr3OZxXoTl+QaPcBdlmkuqVmXSWfHAkMa5u3A+3NauIsZ+DkMJVMgpZJPTsQvecdlAwbYnGdLqJIoc3Xx3U8n41+HVnvQwKBgQCHfBQVm9DUJ7nbOy5JvT41Om+q/ULufLXyGvEuaWTaAiZdHG6PCxDbn2NOiAlmOTTEp/J3Pe7jxuoVMr7wTp70HzSOxp08cDuG0M57YZZj7MDOMA04HOqroM5HP0DzbwlpevVL45forzznUZb4WSU8ZyMQdtp4Wbt79Oyv0x6jxQKBgHm+K/X55yibaJ4FAEqRdNCF/Mgkk78lEOSAdZepGP36T1AUfMUHDc2D/tg8/mzFhJ+IFWSTC1Nd2X+aTJGsm40qvZphpLVanVKBd33tfKknR7XbJbOnvZ7ny/KwOXX3cMEOkPX/xacdW1Zc8mro1h98vt9GzM5qsSj/YWpNz+75AoGAZfXQWQLTvR5fHWaVq2EOG8ob4hkrPzfIgiDdOdmuxor6/A/qDwnOrhEJeFX7fftHVZvQg5xaRGLhMlzcNtHO6/Uc+OrxY1G2pVhFVDTDhHgwtEgER06jq/X0OrtfOfpd1Ss/bCQ8Yuefcgg68oLGnQCmvidxh6fX619Dq2Z/6Cg=",
        sandbox=True
    )
    
    # Example customer
    customer = CustomerInfo(
        user_id="1231231",
        user_name="testxz",
        email="test@test.com",
        phone="07011698742"
    )
    
    # Example order items
    items = [
        OrderItem(
            goods_id="1", 
            name="Product 1", 
            price=100.0, 
            quantity=1,
            description="Test product"
        )
    ]
    
    # Simplified example without split payment first
    try:
        # Create order
        response = client.create_order(
            order_id="testc9ffae997fc2",  # Changed order ID
            amount=200,  # Total amount
            currency="NGN",
            customer=customer,
            title="pay",
            items=items,
            notify_url="https://xx.cn/callback/payment",
            callback_url="http://returnurl",
            description="pay some thing",
            remark="test"
            # Removed split_detail for initial testing
        )
        
        print("Order created:", response)
        
    except PalmPayException as e:
        print(f"PalmPay error: {e}")
        if e.response_data:
            print("Error details:", e.response_data)            