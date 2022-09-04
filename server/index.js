// server/index.js

const path = require('path');
const express = require("express");
const mongoose = require('mongoose');
const db = "mongodb+srv://family:family@cluster0.49xaj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const User = require('./models/User');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    console.log("db connected")
  } catch (exception) {
    console.error(exception.message);
    console.log("db not connected")
    process.exit(1);
  }
}

connectDB();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/getUsers" , async (req, res) => {
  try {
    const user = await User.find();
    res.json({ users: user });
  }
  catch(err) {
    console.log("error",err);
    res.json({messsage:'Internal server error!'});
  }
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
}); 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});