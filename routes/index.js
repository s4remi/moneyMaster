import express from "express";
import myDB from "../db/myMongoDB.js";

export const router = express.Router();

/* GET home page. */
router.get("/api", async (req, res) {
  try{

  }catch{

  }
  return 
  
});

router.post("/users/login", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  myDB.getUser({ email: email }).then((existingUser) => {
    bcrypt.compare(password, existingUser.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result) {
        return (
          res
            .status(200)
            // add email : email
            .json({ message: "Login successful", email: email })
        );
      } else {
        return res.status(401).json({ message: "Wrong email or password" });
      }
    });
  });
});

router.post("/users/register", bodyParser.json(), async (req, res) => {
  const { email, password } = req.body;
  myDB.getUser({ email: email }).then((existingUser) => {
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }

        myDB
          .createUser({
            email: email,
            password: hashedPassword,
          })
          .then((result) => {
            if (result) {
              return res
                .status(201)
                .json({ message: "User registered successfully" });
            } else {
              return res
                .status(400)
                .json({ message: "User registration failed" });
            }
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
          });
      });
    }
  });
});

export default router;
