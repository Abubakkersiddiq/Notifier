const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require("connect-ensure-login");
const User = require("./user")

const app = express();

app.use(session({
    secret: 'cat',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}))

app.use(bodyParser.json({
    limit: "15mb"
}))

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/login', passport.authenticate('local', { failureRedirect: '/home' }), function (req, res) {
    console.log(req.user)
    res.send({ status: true, message: "logged in succesfully" })
});

app.get("/profile", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    console.log("logged in sucessfully")
    res.send({ status: true, message: req.user.username })
})

app.get("/logout", (req, res) => {
    req.logOut();
})

app.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const user = await User.register({ username, active: false }, password);
        if (user) {
            res.send({ status: true, message: `User with username ${user.username} was successfully created` })
        } else {
            res.send({ status: false, message: "Error in creating in user" });
        }
    } else {
        res.send({ status: true, message: "Invalid format of credentials, check your username or password" });
    }
})


app.listen(8000, () => console.log("Listening on port 8000"))