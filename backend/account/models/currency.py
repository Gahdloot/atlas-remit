# models.py
from django.db import models
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal

class Currency(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    flag = models.CharField(max_length=10)  # Unicode flag emoji
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Currencies"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.code})"

class ExchangeRate(models.Model):
    from_currency = models.ForeignKey(Currency, on_delete=models.CASCADE, related_name='rates_from')
    to_currency = models.ForeignKey(Currency, on_delete=models.CASCADE, related_name='rates_to')
    rate = models.DecimalField(max_digits=15, decimal_places=6)
    last_updated = models.DateTimeField(auto_now=True)
    source = models.CharField(max_length=50, default='google')
    
    class Meta:
        unique_together = ('from_currency', 'to_currency')
        ordering = ['-last_updated']

    def __str__(self):
        return f"1 {self.from_currency.code} = {self.rate} {self.to_currency.code}"

    @property
    def is_stale(self):
        """Check if rate is older than 30 minutes"""
        return timezone.now() - self.last_updated > timedelta(minutes=30)
