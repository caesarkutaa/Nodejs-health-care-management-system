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
  }); // Increase the hook's timeout to 60 seconds (adjust as needed)
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
 });
