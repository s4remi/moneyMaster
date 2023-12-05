import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/api/login/password", async function (req, res, next) {
  passport.authenticate("local", async function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login"); // Adjust the redirect path as needed
    }

    req.logIn(user, async function (err) {
      if (err) {
        return next(err);
      }

      // Log the login activity
      const activityLog = {
        username: user.username,
        action: "login",
        timestamp: new Date().toISOString(),
      };

      await myDB.logUserActivity(activityLog);

      return res.redirect("/"); // Adjust the redirect path as needed
    });
  })(req, res, next);
});

router.post("/api/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ username: null, msg: "Logged out", ok: true });
  });
});

router.get("/api/getUser", function (req, res) {
  console.log("getUser", req.user);
  res.status(200).json({ username: req.user?.username });
});

router.post("/api/signup", async function (req, res, next) {
  console.log("**** signup", req.body);

  const user = await myDB.getUserByUsername(req.body.username);
  if (user) {
    return res.status(400).json({ ok: false, msg: "Username already exists" });
  }

  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      const insertResponse = await myDB.insertUser({
        username: req.body.username,
        hashedPassword: hashedPassword.toString("hex"),
        salt: salt.toString("hex"),
      });

      console.log("inserted", insertResponse);

      res.status(200).json({ ok: true, msg: "Signed up " });
    }
  );
});

export default router;

/*

{
  /* <div>
//before adding activity log
  router.post(
    "/api/login/password",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
</div> 
}
*/
