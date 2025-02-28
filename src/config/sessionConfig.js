const session = require("express-session");

const sessionConfig = session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
});

module.exports = sessionConfig;
