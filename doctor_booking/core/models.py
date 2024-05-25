from django.db import models
from datetime import date
class Doctor(models.Model):
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    availabilty_start_time = models.TimeField()
    availabilty_end_time = models.TimeField()
    def __str__(self):
        return self.name

class Appointment(models.Model):
    DOCTOR_AVAILABILITY_CHOICES = (
        ('InitialConsult', 'InitialConsult'),
        ('Followup', 'Followup')
    )

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    slot_date = models.DateField()
    first_slot_time = models.TimeField()
    second_slot_time = models.TimeField()
    appointment_type = models.CharField(max_length=20, choices=DOCTOR_AVAILABILITY_CHOICES)
    patient = models.ForeignKey('Patient', on_delete=models.SET_NULL, null=True)
    
class Patient(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    
    def __str__(self):
        return self.name