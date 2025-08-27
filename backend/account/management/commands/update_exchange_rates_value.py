# management/commands/update_exchange_rates.py
from django.core.management.base import BaseCommand
from datetime import datetime, timezone
from account.models.currency import Currency, ExchangeRate

REAL_RATES = {
    "USD": 765.50,
    "EUR": 830.25,
    "CAD": 510.25,
    "GBP": 950.75,
}

class Command(BaseCommand):
    help = "Update exchange rates to NGN"

    def handle(self, *args, **kwargs):
        try:
            ngn_currency = Currency.objects.get(code="NGN")
        except Currency.DoesNotExist:
            self.stdout.write(self.style.ERROR("NGN currency does not exist"))
            return

        for code, rate in REAL_RATES.items():
            try:
                from_currency = Currency.objects.get(code=code)
            except Currency.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"Currency {code} not found"))
                continue

            obj, created = ExchangeRate.objects.update_or_create(
                from_currency=from_currency,
                to_currency=ngn_currency,
                defaults={
                    "rate": rate,
                    "last_updated": datetime.now(tz=timezone.utc),
                    "source": "manual_update",
                },
            )
            action = "Created" if created else "Updated"
            self.stdout.write(f"{action} exchange rate {code} → NGN: {rate}")
