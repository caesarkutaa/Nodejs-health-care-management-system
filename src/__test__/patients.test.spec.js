const request = require('supertest');
const app = require('../app'); // Replace with your Express app file
const { connect } = require('./test-db');
const db = require('../DB/db')


describe('Patients API', () => {
// Before running your tests, connect to the in-memory database
let conn;
beforeAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait for 30 seconds
    conn = await connect();
  }, 60000); // Increase the hook's timeout to 60 seconds (adjust as needed)
  ; // Increase the hook's timeout to 30 seconds (adjust as needed)
  

// After running your tests, close the database connection
afterAll(async () => {
  await conn.disconnect()
}, 10000);

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
    console.log(statusCode)

    expect(statusCode).toBe(201);
    // expect(response.body).toHaveProperty('id');
    // expect(response.body.firstname).toBe(newPatient.firstname);
    // expect(response.body.lastname).toBe(newPatient.lastname);
    // expect(response.body.birthDate).toBe(newPatient.birthDate);
    // expect(response.body.gender).toBe(newPatient.gender);
    // expect(response.body.address).toBe(newPatient.address);
    // Add more assertions based on your API response
  });

//   it('should handle validation errors when creating a patient', async () => {
//     // Create a patient with missing required fields (causing validation error)
//     const invalidPatient = {
//       age: 25,
//       contact: 'invalid-email',
//       // Missing name and gender, which are required fields
//     };

//     const response = await request(app)
//       .post('/api/patients')
//       .send(invalidPatient);

//     expect(response.status).toBe(400); // Expect a Bad Request status
//     expect(response.body).toHaveProperty('error');
//     expect(response.body.error).toContain('Validation error');
//     // Add more assertions based on your expected error response
//   });

//   it('should handle server errors gracefully', async () => {
//     // Simulate a server error by sending invalid data or causing an exception
//     const invalidData = {
//       name: 'Invalid Patient',
//       age: 'invalid-age', // Age should be a number, not a string
//       gender: 'Male',
//       contact: 'valid-email@example.com',
//     };

//     const response = await request(app)
//       .post('/api/patients')
//       .send(invalidData);

//     expect(response.status).toBe(500); // Expect a Server Error status
//     expect(response.body).toHaveProperty('error');
//     // Add more assertions based on your expected error response
//   });
 });
