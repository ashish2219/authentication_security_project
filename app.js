//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home");
})

app.get("/login", function (req, res) {
    res.render("login");
})

app.get("/register", function (req, res) {
    res.render("register");
})

app.get("/secrets", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
})

app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
})

app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    });

})


app.post('/login', function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    });

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


// bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
//     try {
//         const newUser = new User({
//             email: req.body.username,
//             password: hash
//         });
//         await newUser.save();
//         res.render("secrets");
//     }
//     catch (err) {
//         console.log(err);
//     }
// });


// try {
//     const { username, password } = req.body; // Using object destructuring

//     const foundUser = await User.findOne({ email: username });
//     if (foundUser) {
//         // Compare the plain text password with the hashed password using bcrypt.compare
//         const match = await bcrypt.compare(password, foundUser.password);
//         if (match) {
//             res.render('secrets');
//         }
//     } else {
//         res.send('Invalid username or password');
//     }
// } catch (err) {
//     console.log(err);
//     res.status(500).send('Internal server error'); // Return an error response
// }