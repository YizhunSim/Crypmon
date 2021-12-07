const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

// const { auth } = require('express-openid-connect');

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//   };

//   console.log(`config: ${JSON.stringify(config)}`)

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

const corsOptions = {
    origin: 'http://localhost:8081',
};

//Middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

// Route Middlewares
require("./src/routes/routes.js")(app);

//req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// Get status of backend server app
app.get("/status", (req, res) => {
    res.json({message: "Welcome to crypmon backend service application."});
});

const PORT = process.env.PORT || 3000;
console.log(PORT);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});