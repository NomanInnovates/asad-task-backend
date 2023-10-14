const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Import route handlers
const { login, getCountryInfo, logout } = require("./handlers");

// Define routes
app.post("/login", login);
app.get("/logout", logout);
app.get("/getCountryInfo", getCountryInfo);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
