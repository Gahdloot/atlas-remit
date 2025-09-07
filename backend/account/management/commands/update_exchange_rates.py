from django.core.management.base import BaseCommand
from decimal import Decimal
import requests
from django.utils import timezone

from account.models.currency import Currency, ExchangeRate

CURRENCY_DATA = [
    { "code": "USD", "name": "United States Dollar - USD", "flag": "🇺🇸", "symbol": "$" },
    { "code": "EUR", "name": "European Euro - EUR", "flag": "🇪🇺", "symbol": "€" },
    { "code": "CAD", "name": "Canadian Dollar - CAD", "flag": "🇨🇦", "symbol": "C$" },
    { "code": "GBP", "name": "British Pound - GBP", "flag": "🇬🇧", "symbol": "£" },
    { "code": "NGN", "name": "Nigerian Naira - NGN", "flag": "🇳🇬", "symbol": "₦" },
]

API_URL = "https://api.exchangerate.host/latest"

class Command(BaseCommand):
    help = "Create base currencies and update exchange rates to NGN"

    def handle(self, *args, **kwargs):
        # Step 1: Create currencies
        currencies = {}
        for data in CURRENCY_DATA:
            currency, created = Currency.objects.get_or_create(
                code=data["code"],
                defaults={
                    "name": data["name"],
                    "symbol": data["symbol"],
                    "flag": data["flag"]
                }
            )
            currencies[data["code"]] = currency
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created currency: {currency}"))

        # Ensure NGN exists
        naira = currencies.get("NGN")
        if not naira:
            self.stderr.write(self.style.ERROR("NGN currency not found."))
            return

        # Step 2: Fetch and update exchange rates
        for code in ["USD", "EUR", "CAD", "GBP"]:
            params = {
                "base": code,
                "symbols": "NGN"
            }
            try:
                response = requests.get(API_URL, params=params)
                response.raise_for_status()
                data = response.json()

                rate_value = Decimal(data['rates']['NGN'])

                from_currency = currencies[code]
                ExchangeRate.objects.update_or_create(
                    from_currency=from_currency,
                    to_currency=naira,
                    defaults={
                        "rate": rate_value,
                        "last_updated": timezone.now(),
                        "source": "exchangerate.host"
                    }
                )
                self.stdout.write(self.style.SUCCESS(f"Updated rate: 1 {code} = {rate_value} NGN"))

            except Exception as e:
                self.stderr.write(self.style.ERROR(f"Failed to fetch rate for {code} → NGN: {e}"))
