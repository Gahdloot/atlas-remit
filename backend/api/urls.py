
from django.urls import path
from account import views

urlpatterns = [
    path('payment-requests/', views.SchoolPaymentRequestCreateView.as_view(), name='payment-requests'),
]