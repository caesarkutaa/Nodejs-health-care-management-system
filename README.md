# Nodejs-health-care-management-system

This is a simple healthcare management system built using Node.js, Express.js, and MongoDB.

## Features

- Create, retrieve, update, and delete patient records.
- Schedule and manage appointments for patients.
- Register doctors with their respective specializations.
- Assign available doctors to patients based on their specialization.
- Upload and manage patient-related documents.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/caesarkutaa/healthcare-management-system.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Nodejs-health-care-management-system
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up your MongoDB connection in `app.js`:**

   ```javascript
   mongoose.connect('mongodb://localhost/healthcareDB', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```
   Replace placeholders with your Cloudinary credentials in app.js:

 ```javascript

   cloudinary.config({
     cloud_name: 'your-cloud-name',
     api_key: 'your-api-key',
     api_secret: 'your-api-secret',
   });
   ```
## Usage

1. **Start the server:**

   ```bash
   npm run start
   ```

2. **Use API endpoints to create, retrieve, and manage patients, appointments, doctors, and assignments.**

## API Endpoints

- `POST /api/patients`: Create a new patient.
- `GET /api/patients`: Retrieve all patients.
- `GET /api/patients/:patientId`: Retrieve a specific patient.

- `POST /api/appointments`: Create a new appointment.
- `GET /api/appointments`: Retrieve all appointments.

- `POST /api/doctors`: Create a new doctor.
- `GET /api/doctors`: Retrieve all doctors.

- `PUT /api/assign-doctor/:patientId/:specialization`: Assign a doctor to a patient based on specialization.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary (for document uploads)
- express-fileupload
- jsonwebtoken
- bcrypt
- nodemailer

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
