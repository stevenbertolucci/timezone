import 'dotenv/config';
import express from "express";
import asyncHandler from "express-async-handler";
import fetch from "node-fetch";
import cors from "cors";

const PORT = process.env.PORT;
if (PORT == null || PORT == ""){
  PORT=8000;
};

const app = express();
app.use(express.static("public"));

app.use(cors());

app.use("/timezone", (req, res, next) => {
  next();
});

// call the Random Person API
app.get("/timezone", asyncHandler(async (req, res) => {
    console.log(req.query.latitude)
    console.log(req.query.longitude)
    const latitude = req.query.latitude
    const longitude = req.query.longitude
    const resp = await fetch('https://timeapi.io/api/Time/current/coordinate?latitude=' + `${latitude}` + '&longitude=' + `${longitude}`)
    const data = await resp.json();
    res.send(data);
    console.log(data)
  })
);

// Respond using an error handler middleware function when it doesn't work.
app.use((error, req, res, next) => {
  console.log(`Unhandled error ${error}. URL: ${req.originalUrl}`);
  res.status(500).send({ error: `500 - Server Error.` });
});

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});