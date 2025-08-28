import requests
import json
import hashlib
import hmac
import time
from datetime import datetime
from typing import Dict, Optional, Any, List
from dataclasses import dataclass
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class PalmPayConfig:
    """Configuration class for PalmPay API settings"""
    merchant_id: str
    secret_key: str
    base_url: str = "https://openapi.palmmerchant.com"
    sandbox_url: str = "https://sandbox-openapi.palmmerchant.com"
    is_sandbox: bool = True
    timeout: int = 30

@dataclass
class OrderItem:
    """Represents an item in the order"""
    name: str
    price: float
    quantity: int = 1
    description: Optional[str] = None
    category: Optional[str] = None

@dataclass
class CustomerInfo:
    """Customer information for the order"""
    name: str
    email: str
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None

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
        
        # Set default headers
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'PalmPay-Python-SDK/1.0'
        })
    
    def _generate_signature(self, data: str, timestamp: str) -> str:
        """
        Generate HMAC signature for API authentication
        
        Args:
            data (str): Request body as JSON string
            timestamp (str): Unix timestamp
            
        Returns:
            str: HMAC signature
        """
        message = f"{data}{timestamp}"
        signature = hmac.new(
            self.config.secret_key.encode('utf-8'),
            message.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        return signature
    
    def _get_headers(self, payload: dict) -> dict:
        """
        Generate headers with authentication signature
        
        Args:
            payload (dict): Request payload
            
        Returns:
            dict: Headers with signature
        """
        timestamp = str(int(time.time()))
        data_string = json.dumps(payload, separators=(',', ':'), sort_keys=True)
        signature = self._generate_signature(data_string, timestamp)
        
        return {
            'X-Merchant-Id': self.config.merchant_id,
            'X-Timestamp': timestamp,
            'X-Signature': signature
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
        
        try:
            if payload:
                headers = self._get_headers(payload)
                self.session.headers.update(headers)
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
        items: List[OrderItem] = None,
        callback_url: str = None,
        return_url: str = None,
        description: str = None,
        metadata: dict = None
    ) -> dict:
        """
        Create a new payment order
        
        Args:
            order_id (str): Unique order identifier
            amount (float): Order amount
            currency (str): Currency code (e.g., 'NGN', 'USD')
            customer (CustomerInfo): Customer information
            items (List[OrderItem]): List of order items
            callback_url (str): Webhook URL for payment notifications
            return_url (str): URL to redirect after payment
            description (str): Order description
            metadata (dict): Additional metadata
            
        Returns:
            dict: Order creation response with payment URL
        """
        payload = {
            'orderId': order_id,
            'amount': amount,
            'currency': currency.upper(),
            'customer': {
                'name': customer.name,
                'email': customer.email,
                'phone': customer.phone
            },
            'timestamp': int(time.time())
        }
        
        # Add optional customer details
        if customer.address:
            payload['customer']['address'] = customer.address
        if customer.city:
            payload['customer']['city'] = customer.city
        if customer.country:
            payload['customer']['country'] = customer.country
        
        # Add items if provided
        if items:
            payload['items'] = [
                {
                    'name': item.name,
                    'price': item.price,
                    'quantity': item.quantity,
                    'description': item.description,
                    'category': item.category
                }
                for item in items
            ]
        
        # Add optional parameters
        if callback_url:
            payload['callbackUrl'] = callback_url
        if return_url:
            payload['returnUrl'] = return_url
        if description:
            payload['description'] = description
        if metadata:
            payload['metadata'] = metadata
        
        response = self._make_request('POST', '/v2/checkout/create-order', payload)
        
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
        payload = {
            'orderId': order_id,
            'timestamp': int(time.time())
        }
        
        response = self._make_request('POST', '/v2/checkout/query-order', payload)
        
        logger.info(f"Retrieved status for order: {order_id}")
        return response
    
    def verify_webhook(self, payload: str, signature: str, timestamp: str) -> bool:
        """
        Verify webhook signature for security
        
        Args:
            payload (str): Webhook payload as string
            signature (str): Signature from webhook headers
            timestamp (str): Timestamp from webhook headers
            
        Returns:
            bool: True if signature is valid
        """
        expected_signature = self._generate_signature(payload, timestamp)
        return hmac.compare_digest(signature, expected_signature)
    
    def handle_webhook(self, request_data: dict, signature: str, timestamp: str) -> dict:
        """
        Handle incoming webhook notification
        
        Args:
            request_data (dict): Webhook payload
            signature (str): Webhook signature
            timestamp (str): Webhook timestamp
            
        Returns:
            dict: Processed webhook data
            
        Raises:
            PalmPayException: If webhook verification fails
        """
        payload_string = json.dumps(request_data, separators=(',', ':'), sort_keys=True)
        
        if not self.verify_webhook(payload_string, signature, timestamp):
            raise PalmPayException("Invalid webhook signature")
        
        event_type = request_data.get('eventType')
        order_data = request_data.get('data', {})
        
        logger.info(f"Webhook received: {event_type} for order {order_data.get('orderId')}")
        
        return {
            'event_type': event_type,
            'order_id': order_data.get('orderId'),
            'status': order_data.get('status'),
            'amount': order_data.get('amount'),
            'currency': order_data.get('currency'),
            'transaction_id': order_data.get('transactionId'),
            'payment_method': order_data.get('paymentMethod'),
            'timestamp': timestamp,
            'raw_data': request_data
        }
    
    def refund_order(self, order_id: str, amount: float = None, reason: str = None) -> dict:
        """
        Initiate refund for an order
        
        Args:
            order_id (str): Order identifier
            amount (float): Refund amount (full refund if not specified)
            reason (str): Refund reason
            
        Returns:
            dict: Refund response
        """
        payload = {
            'orderId': order_id,
            'timestamp': int(time.time())
        }
        
        if amount is not None:
            payload['amount'] = amount
        if reason:
            payload['reason'] = reason
        
        response = self._make_request('POST', '/v2/checkout/refund', payload)
        
        logger.info(f"Refund initiated for order: {order_id}")
        return response

# Helper functions for easy usage
def create_palmpay_client(merchant_id: str, secret_key: str, sandbox: bool = True) -> PalmPayCheckout:
    """
    Create a PalmPay client with simplified configuration
    
    Args:
        merchant_id (str): PalmPay merchant ID
        secret_key (str): PalmPay secret key
        sandbox (bool): Use sandbox environment
        
    Returns:
        PalmPayCheckout: Configured PalmPay client
    """
    config = PalmPayConfig(
        merchant_id=merchant_id,
        secret_key=secret_key,
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

# Example usage
if __name__ == "__main__":
    # Example configuration
    client = create_palmpay_client(
        merchant_id="124092403536161",
        secret_key="1qSiAgoa30BPSfXSIZb9yxR0f/aAFEjiEFwSa7PbLXFjGUyI1mCSlIHQx7VHy217C3wiv9Em/TQwwnUgj8TBqNElf17YHY2SiFQwFysWxQKBgQDTGrXoituVvB/i6c/pL3FyfsLC4UTwaRpBbybL/sc6gKHYUk95FiwR2MjvlLue8zG070mZDp0/FZZtD6YieH53u4tZFOHr3Or0GmYFd0xQezetki+C7OMsC0ia3yQHkkeRKCHhzgFN3spEPmMowuVn4PsAKfDjgsPoN4MJ46Pk1QKBgQDPzJ6NA4cmm5kDGrz6EHpEFEA1InTInOxa5gLhj7naawh4W51+QIFuPJ8+rA/1yQRT06emBSxXN4gTwr3OZxXoTl+QaPcBdlmkuqVmXSWfHAkMa5u3A+3NauIsZ+DkMJVMgpZJPTsQvecdlAwbYnGdLqJIoc3Xx3U8n41+HVnvQwKBgQCHfBQVm9DUJ7nbOy5JvT41Om+q/ULufLXyGvEuaWTaAiZdHG6PCxDbn2NOiAlmOTTEp/J3Pe7jxuoVMr7wTp70HzSOxp08cDuG0M57YZZj7MDOMA04HOqroM5HP0DzbwlpevVL45forzznUZb4WSU8ZyMQdtp4Wbt79Oyv0x6jxQKBgHm+K/X55yibaJ4FAEqRdNCF/Mgkk78lEOSAdZepGP36T1AUfMUHDc2D/tg8/mzFhJ+IFWSTC1Nd2X+aTJGsm40qvZphpLVanVKBd33tfKknR7XbJbOnvZ7ny/KwOXX3cMEOkPX/xacdW1Zc8mro1h98vt9GzM5qsSj/YWpNz+75AoGAZfXQWQLTvR5fHWaVq2EOG8ob4hkrPzfIgiDdOdmuxor6/A/qDwnOrhEJeFX7fftHVZvQg5xaRGLhMlzcNtHO6/Uc+OrxY1G2pVhFVDTDhHgwtEgER06jq/X0OrtfOfpd1Ss/bCQ8Yuefcgg68oLGnQCmvidxh6fX619Dq2Z/6Cg=",
        sandbox=True
    )
    
    # Example customer
    customer = CustomerInfo(
        name="John Doe",
        email="john@example.com",
        phone="+234812345678",
        address="123 Main St",
        city="Lagos",
        country="Nigeria"
    )
    
    # Example order items
    items = [
        OrderItem(name="Product 1", price=1000.0, quantity=2),
        OrderItem(name="Product 2", price=500.0, quantity=1)
    ]
    
    try:
        # Create order
        response = client.create_order(
            order_id="ORDER_123456",
            amount=calculate_order_total(items),
            currency="NGN",
            customer=customer,
            items=items,
            callback_url="https://webhook-test.com/payload/430ad2bb-70d5-41b9-9b3f-87970528117d",
            return_url="https://webhook-test.com/payload/430ad2bb-70d5-41b9-9b3f-87970528117d",
            description="Test order"
        )
        
        print("Order created:", response)
        
        # Get order status
        status = client.get_order_status("ORDER_123456")
        print("Order status:", status)
        
    except PalmPayException as e:
        print(f"PalmPay error: {e}")
        if e.response_data:
            print("Error details:", e.response_data)