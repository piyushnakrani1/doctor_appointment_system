# Doctor Management - Backend

This repository contains the backend component of the **Project Name** project, developed using Django and Djongo.

## Overview

The backend provides functionalities to manage doctors, appointments, and patients. It exposes RESTful APIs to perform CRUD operations on doctors, appointments, and patients. Users can view doctors' availability and book appointments using the provided APIs.

## Technologies Used

- Python 3.10
- Django
- Djongo (for MongoDB integration)
- Django REST Framework

## Setup Instructions
1. **Setup Mongo DB in your Local System**: Reference Link :- https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-ubuntu/
2. **Clone the Repository**: Clone this repository to your local machine using the following command:

    ```
    git clone https://github.com/piyushnakrani1/doctor_management.git
    ```

3. **Install Dependencies**: Navigate to the project directory and install the required Python dependencies using pip:

    ```
    cd doctor_booking
    pip install -r requirements.txt
    ```

4. **Database Configuration**: Configure your MongoDB connection settings in the `settings.py` file of the Django project.

5. **Run Migrations**: Apply database migrations to create the necessary tables in the MongoDB database:

    ```
    python manage.py migrate
    ```
6. **Load Doctors Data**: Load the Doctors Data using the following command:

    ```
    python manage.py insert_doctor_data
    ```
7. **Start the Development Server**: Run the Django development server using the following command:

    ```
    python manage.py runserver
    ```

8. **Access the API**: Once the server is running, you can access the API endpoints at `http://localhost:8000/api/`.

## API Endpoints

- **GET /api/doctors/**: Retrieve a list of all doctors.
- **POST /api/doctors/**: Create a new doctor.
- **GET /api/doctors/{id}/**: Retrieve details of a specific doctor.
- **PUT /api/doctors/{id}/**: Update details of a specific doctor.
- **DELETE /api/doctors/{id}/**: Delete a specific doctor.
- **GET /api/appointments/**: Retrieve a list of all appointments.
- **POST /api/appointments/**: Create a new appointment.
- **GET /api/appointments/{id}/**: Retrieve details of a specific appointment.
- **PUT /api/appointments/{id}/**: Update details of a specific appointment.
- **DELETE /api/appointments/{id}/**: Delete a specific appointment.
- **GET /api/patients/**: Retrieve a list of all patients.
- **POST /api/patients/**: Create a new patient.
- **GET /api/patients/{id}/**: Retrieve details of a specific patient.
- **PUT /api/patients/{id}/**: Update details of a specific patient.
- **DELETE /api/patients/{id}/**: Delete a specific patient.
- **GET /api/doctor-availability/{id}/**: Retrieve the availability of a specific doctor.
- **POST /api/create-appointment/**: Create a new appointment for a patient.
