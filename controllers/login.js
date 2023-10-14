const jwt = require("jsonwebtoken");
const axios = require("axios");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 3000;

const users = {
    user1: "password1",
    user2: "password2",
};

const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password || users[username] !== password) {
        return res.status(401).end();
    }

    const token = jwt.sign({ username }, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
    });

    res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
    res.json({ token });
};
module.exports = login;
