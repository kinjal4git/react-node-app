// server/index.js

const path = require('path');
const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");

const db = "mongodb+srv://demouser:ge4R05Lw6h17l3B9@db-mongodb-nyc3-43466-e2d29d23.mongo.ondigitalocean.com/admin?authSource=admin&replicaSet=db-mongodb-nyc3-43466&tls=true";

const User = require('./models/User');

const PORT = process.env.PORT || 3001;

const app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post("/addUser" , async (req, res) => {
  try {

    const { firstName, email, lastName } = req.body;
    let password = 'Password123'
   
    let user = new User({
      firstName: firstName,
      lastName: lastName ? lastName : null,
      email: email ? email : null,
      password : password,
      profileColor: "#FFFFF",
      deviceType: 'android',
    })

    //Encrypt password
    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save().then(() => {
      res.json({ user: user, message: 'Register successfully'});
    })
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