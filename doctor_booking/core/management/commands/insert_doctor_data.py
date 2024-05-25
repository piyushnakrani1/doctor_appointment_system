from django.core.management.base import BaseCommand
from django.db import connections
import json

from core.models import Doctor

class Command(BaseCommand):
    help = 'Insert doctors data from JSON file into MongoDB'

    def handle(self, *args, **kwargs):
        # Get the MongoDB connection
        mongo_connection = connections['default']

        # Load data from JSON file
        with open("core/management/doctors_data.json", "r") as file:
            doctors_data = json.load(file)

        # Insert data into MongoDB collection
        for doctor_info in doctors_data["doctors"]:
            Doctor.objects.create(
                name=doctor_info["name"],
                specialization=doctor_info["specialization"],
                availabilty_start_time=doctor_info["availability_start_time"],
                availabilty_end_time=doctor_info["availability_end_time"]
            )

        self.stdout.write(self.style.SUCCESS("Data inserted successfully into MongoDB."))
