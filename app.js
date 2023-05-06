//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.get("/logout", function (req, res) {
    res.render("home");
})

app.post("/register", function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        try {
            const newUser = new User({
                email: req.body.username,
                password: hash
            });
            await newUser.save();
            res.render("secrets");
        }
        catch (err) {
            console.log(err);
        }
    });
})


app.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body; // Using object destructuring

        const foundUser = await User.findOne({ email: username });
        if (foundUser) {
            // Compare the plain text password with the hashed password using bcrypt.compare
            const match = await bcrypt.compare(password, foundUser.password);
            if (match) {
                res.render('secrets');
            }
        } else {
            res.send('Invalid username or password');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error'); // Return an error response
    }
});


// app.post("/login", async function (req, res) {
//     try {
//         const username = req.body.username;
//         const password = req.body.password;

//         const foundUser = await User.findOne({ email: username })
//         if (foundUser && foundUser.password === password) {
//             bcrypt.compare(password, foundUser.password, function (err, result) {
//                 if (result === true) {
//                     res.render("secrets");
//                 }
//             });
//         } else {
//             res.send("Invalid username or password");
//         }
//     } catch (err) {
//         console.log(err);
//     }
// })




app.listen(3000, function () {
    console.log("Server has started on port 3000.");
})