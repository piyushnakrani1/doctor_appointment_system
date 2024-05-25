from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Doctor, Appointment, Patient
from .serializers import DoctorSerializer, AppointmentSerializer
from datetime import datetime, timedelta, date
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db.models import Q


@api_view(['GET', 'POST'])
def doctor_list(request):
    if request.method == 'GET':
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def doctor_detail(request, pk):
    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)


@api_view(['POST'])
def create_appointment(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def doctor_availability(request, pk):
    doctor = get_object_or_404(Doctor, pk=pk)
    consultation_type = request.query_params.get("consultation_type")

    if consultation_type not in ['InitialConsult', 'Followup']:
        return Response({'error': 'Invalid consultation type.'}, status=status.HTTP_400_BAD_REQUEST)

    today_date = datetime.now().date()
    start_time = datetime.combine(today_date, doctor.availabilty_start_time)
    end_time = datetime.combine(today_date, doctor.availabilty_end_time)

    available_slots = []
    slot_interval = 30 if consultation_type == "InitialConsult" else 15

    while start_time <= end_time - timedelta(minutes=slot_interval):
        next_slot_time = start_time + timedelta(minutes=15)
        if consultation_type == "InitialConsult":
            get_slot = Appointment.objects.filter(
                Q(doctor=doctor) & Q(slot_date=today_date) &
                ((Q(first_slot_time=start_time) | Q(second_slot_time=next_slot_time))
                 | (Q(first_slot_time=next_slot_time) | Q(second_slot_time=start_time)))
            )
        else:
            get_slot = Appointment.objects.filter(
                Q(doctor=doctor) & Q(slot_date=today_date) &
                ((Q(first_slot_time=start_time) | Q(second_slot_time=start_time))))
            
        slot_end = start_time + timedelta(minutes=slot_interval)
        available_slots.append({
            "slot_start": start_time.strftime('%I:%M %p'),
            "slot_end": slot_end.strftime('%I:%M %p'),
            "slot_time": start_time.strftime('%H:%M:%S'),
            "availability": False if get_slot else True
        })
        start_time = next_slot_time if consultation_type == "InitialConsult" else slot_end

    return Response(available_slots, status=status.HTTP_200_OK)