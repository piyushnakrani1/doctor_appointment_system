from django.urls import path, include
from .views import *

urlpatterns = [
    path('doctors/', doctor_list),
    path('doctors/<int:pk>/', doctor_detail, name='doctor_detail'),
    path('availability/<int:pk>/', doctor_availability, name='doctor_availability'),
    path('book_appointment/', create_appointment, name='create_appointment'),
]