import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import projectsRouter from "./routes/bankAccs.js";

import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";

import crypto from "crypto";
import myDB from "./db/myMongoDB.js";

// ES6 modules don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

// login
const myStrategy = new LocalStrategy(async function verify(
  username,
  password,
  cb
) {
  try {
    const user = await myDB.getUserByUsername(username);

    if (!user) {
      // User not found
      cb(null, false, { message: "Incorrect username or password" });
      return false;
    }

    console.log("found user", user);

    // Computes the hash password from the user input
    crypto.pbkdf2(
      password,
      Buffer.from(user.salt, "hex"),
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return cb(err);
        }
        if (
          !crypto.timingSafeEqual(
            Buffer.from(user.hashedPassword, "hex"),
            hashedPassword
          )
        ) {
          console.log("passwords don't match");
          // User found but password incorrect
          cb(null, false, { message: "Incorrect username or password" });
          return false;
        }

        console.log("passwords match");
        // User found and authenticated
        cb(
          null, // error
          { id: 1, username: username }, // user object
          { message: "HI there!" } // extra info
        );
      }
    );
  } catch (err) {
    cb(err);
  }
});

passport.use(myStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));

app.use(
  session({
    secret: "moneyMaster project data",
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(passport.authenticate("session"));

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/", projectsRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/front/dist/index.html"));
});

export default app;
