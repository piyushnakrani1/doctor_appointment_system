# Doctor Management - Project Setup

## Technologies Used

- Python 3.10
- Django
- Djongo (for MongoDB integration)
- Django REST Framework
- React
- MongoDB(Database)

**Clone the Repository**: Clone this repository to your local machine using the following command:

```
git clone https://github.com/piyushnakrani1/doctor_management.git
```

## Setup Backend
1. **Setup Mongo DB in your Local System**: Reference Link :- https://www.mongodb.com/docs/v3.0/tutorial/install-mongodb-on-ubuntu/

2. **Install Dependencies**: Navigate to the project directory and install the required Python dependencies using pip:

    ```
    cd doctor_booking
    pip install -r requirements.txt
    ```
    
3. **Run Migrations**: Apply database migrations to create the necessary tables in the MongoDB database:

    ```
    python manage.py migrate
    ```
4. **Load Doctors Data**: Load the Doctors Data using the following command:

    ```
    python manage.py insert_doctor_data
    ```
5. **Start the Development Server**: Run the Django development server using the following command:

    ```
    python manage.py runserver
    ```

8. **Access the API**: Once the server is running, you can access the API endpoints at `http://localhost:8000/api/`.

## API Endpoints

- **GET /api/doctors/**: Retrieve a list of all doctors.
- **POST /api/doctors/**: Create a new doctor.
- **GET /api/doctors/{id}/**: Retrieve details of a specific doctor.
- **GET /api/appointments/{id}/**: Retrieve details of a specific appointment.
- **POST /api/book_appointment/**: Create a new appointment for a patient.

## Setup Frontend

1. **Install Dependencies**: Run the following command to install all the necessary dependencies:

    ```
    npm install
    ```
2. **Run Project**: Run the following command to run the frontend:

    ```
    npm start
    ```
