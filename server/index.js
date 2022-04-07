const PORT = 8000;
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { v1: uuidv1 } = require("uuid");
const { connect } = require("getstream");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = "add your api key";
const API_SECRET = "add your api secret";
const APP_ID = "1169412";

//sign up a user
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userID = uuidv1();
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = connect(API_KEY, API_SECRET, APP_ID);
    const token = client.createUserToken(userID);
    res.status(200).json({ username, userID, hashedPassword, token });
    console.log(username, password);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

app.listen(PORT, () => console.log("Server running on PORT " + PORT));
