const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
// const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const {logReqRes} = require("./middlewares");



const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1");

// mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
// .then(() => console.log('Mongodb connected'))
// .catch((err) => console.log("mongo error", err));


// Schema

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   jobTitle: {
//     type: String,
//   },
//   gender: {
//     type: String,
//   },
// });

// const User = mongoose.model("user", userSchema);

// Middleware - plugin
app.use(express.urlencoded({extended: false}));

// app.use((logReqRes("log.txt")) => {
//   console.log("Hello from middleware 1");
//   req.myUserName = "syedaabiha.dev";
//   next();
//   // return res.json({msg: "Hello from middleware 1"});
// });

app.use((req, res, next) => {
  console.log("Hello from middleware 2", req.myUserName);
  // return res.end("Hey");
  next();
});


// routes

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
   const html = `
   <ul>
   ${allDbUsers.map((user) => `<li>${user.first_Name} - ${user.email}</li>`).join("")}
   </ul>
   `;
   res.send(html);
});


app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});

  // my header - custom header
  // always add "X" to custom headers
  // res.setHeader("X-myName", "Ume Abiha");        
  // console.log(req.headers);
    return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

// post
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({msg: "All fields are required..."});
  }

  // users.push({...body, id: users.length + 1});
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({status: "success", id: users.length});
  // });
  // console.log("Body", body);
  // return res.json({status: "pending"});


  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  // console.log("result", result);
  return res.status(201).json({msg: "success"});
});

// patch
app.patch("/api/users/:id", (req, res) => {
    // edit the user with id
  return res.json({status: "pending"});
});

// delete
app.delete("/api/users/:id", (req, res) => {
    // delete the user with id
  return res.json({status: "pending"});
});


// can also be write as
app
.route("/api/users/:id")
.get(async(req, res) => {
  const user = await User.findById(req.params.id);
  // const id = Number(req.params.id);
  // const user = users.find((user) => user[0].id === id);
  if (!user) return res.status(404).json({error: "user not found"});
  return res.json(user);
})
.post((req, res) => {
    // create new user
  return res.json({status: "pending"});
})
.delete((req, res) => {
    // delete the user with id
  return res.json({status: "pending"});
});

// This will be useful because if I need to change the route name in the future,
// I won't have to change it everywhere. I can just change it once here.


app.use("/user", userRouter);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`)); 