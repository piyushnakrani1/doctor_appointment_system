from datetime import datetime, timedelta
from rest_framework import serializers
from .models import Doctor, Appointment, Patient

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['name', 'email', 'phone_number']

class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    slot_time = serializers.TimeField(write_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
        extra_kwargs = {
            'first_slot_time': {'read_only': True},
            'second_slot_time': {'read_only': True},
        }

    def create(self, validated_data):
        patient_data = validated_data.pop('patient')
        slot_time = validated_data.pop('slot_time')
        appointment_type = validated_data['appointment_type']

        first_slot_time = slot_time
        second_slot_time = None
        if appointment_type == 'InitialConsult':
            second_slot_time = (datetime.combine(datetime.today(), slot_time) + timedelta(minutes=15)).time()
        
        patient, created = Patient.objects.get_or_create(**patient_data)
        appointment = Appointment.objects.create(
            patient=patient,
            first_slot_time=first_slot_time,
            second_slot_time=second_slot_time,
            **validated_data
        )
        return appointment
