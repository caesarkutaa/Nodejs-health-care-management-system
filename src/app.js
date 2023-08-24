require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const doctorRouters = require('./routes/doctors.routes')
const patientRouter = require('./routes/patients.routes')
const appointmentRouter = require('./routes/appointment.routes')
const assignmentRouter = require('./routes/assignment.routes')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())
app.use(morgan('common'))



// routes
app.use("/api/v1/doctor", doctorRouters);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/assignment", assignmentRouter);



app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

// connect database
require("./DB/db").connect();

// middleware
// app.use(rootMiddleware);




const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});