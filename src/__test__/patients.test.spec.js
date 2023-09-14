const request = require('supertest');
const app = require('../app'); // Replace with your Express app file
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');



describe('Patients API', () => {
// Before running your tests, connect to the in-memory database
let conn;
beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
  },20000); // Increase the hook's timeout to 60 seconds (adjust as needed)
  ; // Increase the hook's timeout to 30 seconds (adjust as needed)
  

// After running your tests, close the database connection
afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

// Your test cases go here



  it('should create a new patient', async () => {
    const newPatient = {
        firstname:"james",
        lastname:"will",
        birthDate:"07/20",
        gender:"male",
        address:"london"
      
    };

    const { statusCode, body } = await request(app)
      .post('/api/v1/patient')
      .send(newPatient);
    console.log(body.patient._id)

    expect(statusCode).toBe(201);
    expect(body.patient).toHaveProperty('_id');
    expect(body.patient.firstname).toBe(newPatient.firstname);
    expect(body.patient.lastname).toBe(newPatient.lastname);
    // expect(body.patient.birthDate).toBe(newPatient.birthDate); you cant have the same thing mongodb convert it to a date
    expect(body.patient.gender).toBe(newPatient.gender);
    expect(body.patient.address).toBe(newPatient.address);
    // Add more assertions based on your API response
  });
    

  it('should get a patient by ID', async () => {
    const newPatient = {
      firstname: "james",
      lastname: "will",
      birthDate: "07/20",
      gender: "male",
      address: "london"
    };
  
    // Create a new patient and retrieve their ID
    const createResponse = await request(app)
      .post('/api/v1/patient')
      .send(newPatient);
  
    const patientId = createResponse.body.patient._id;
  
    // Now, use the retrieved patient ID to get the patient by ID
    const { statusCode, body } = await request(app).get(`/api/v1/patient/${patientId}`);
  
    expect(statusCode).toBe(200);
    expect(body.patient).toHaveProperty('_id');
    expect(body.patient.firstname).toBe(newPatient.firstname);
    expect(body.patient.lastname).toBe(newPatient.lastname);
   
  });
  

  it('should get all patients', async () => {
    const  { statusCode, body } =  await request(app).get('/api/v1/patient/patients');

    expect(statusCode).toBe(200);
  });

// Test case for deleting a patient by ID
it('should delete a patient by ID', async () => {
  const newPatient = {
    firstname: "james",
    lastname: "will",
    birthDate: "07/20",
    gender: "male",
    address: "london"
  };

  // Create a new patient
  const createResponse = await request(app)
    .post('/api/v1/patient')
    .send(newPatient);

  const patientId = createResponse.body.patient._id;

  // Delete the patient by ID
  const deleteResponse = await request(app).delete(`/api/v1/patient/${patientId}`);

  expect(deleteResponse.statusCode).toBe(200);

  // Check if the patient was deleted by trying to get it again
  const { statusCode: getStatus } = await request(app).get(`/api/v1/patient/${patientId}`);
  expect(getStatus).toBe(404); // Expecting a 404 status code for a not found patient
});

// Test case for updating a patient by ID
it('should update a patient by ID', async () => {
  const newPatient = {
    firstname: "brenda",
    lastname: "will",
    birthDate: "07/20",
    gender: "male",
    address: "london"
  };

  // Create a new patient
  const createResponse = await request(app)
    .post('/api/v1/patient')
    .send(newPatient);

  const patientId = createResponse.body.patient._id;

  // Update the patient by ID
  const updatedPatientData = {
    firstname: "updatedFirstName",
    lastname: "updatedLastName",
    birthDate: "08/21",
    gender: "female",
    address: "paris"
  };

  const updateResponse = await request(app)
    .put(`/api/v1/patient/${patientId}`)
    .send(updatedPatientData);

  expect(updateResponse.statusCode).toBe(200);

  // Check if the patient data has been updated
  const { statusCode: getStatus, body } = await request(app).get(`/api/v1/patient/${patientId}`);

  expect(getStatus).toBe(200);
  expect(body.patient.firstname).toBe(updatedPatientData.firstname);
  expect(body.patient.lastname).toBe(updatedPatientData.lastname);
  expect(body.patient.birthDate).toBe(updatedPatientData.birthDate);
  expect(body.patient.gender).toBe(updatedPatientData.gender);
  expect(body.patient.address).toBe(updatedPatientData.address);
});


 });
