# Online Hospital Appointment Booking System

This project is a hospital appointment booking system built with React for the frontend and .NET for the backend. The backend uses SQL Server for database management.

## Folder Structure

online-hospital-appointment-booking-system/<br />  ├── frontend/ # React-based frontend<br />  └── backend/ # .NET-based backend

  ## Requirements

- .NET 6.0 or higher
- Node.js (for frontend)
- SQL Server (for database)

## Installation

### Backend Setup

1. **Clone the repository**:
 ```bash
 git clone https://github.com/username/online-hospital-appointment-booking-system.git
 cd online-hospital-appointment-booking-system/backend
```

2. Install the required packages: Ensure you have .NET 6.0 (or higher) installed. Run the following to restore dependencies:
```bash
 dotnet restore
```

3. Configure the database connection: In the appsettings.json file, update the connection string for your SQL Server instance:
```json
  "ConnectionStrings": {
    "DefaultConnection": "data source=localhost\\SQLEXPRESS;initial catalog=HospitalAppointmentDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
  },
```
If you are using a local SQL Server instance, you can replace localhost with the name of your SQL Server.
Ensure that your SQL Server instance is running and that the HospitalAppointmentDB database exists. You can run migrations or use a database management tool to create the database.


4. Apply database migrations: Run the following commands to set up the database schema:
```bash
dotnet ef database update
```

5. Run the backend: Start the backend API server:
```bash
dotnet run
```
The backend should now be running at http://localhost:5071

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Make sure Node.js is installed. Run the following to install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```
The frontend should now be running at http://localhost:5173

## Usage

The frontend communicates with the backend API to handle appointment bookings, login, and user management.
Ensure that the backend is running before starting the frontend.
You can register, login, view appointments, and book new appointments through the frontend interface.

## Troubleshooting

CORS issues: Ensure that CORS is configured correctly in the backend to allow requests from the frontend.
Database issues: If you face issues with SQL Server, ensure that the connection string is correct and the database is accessible.





