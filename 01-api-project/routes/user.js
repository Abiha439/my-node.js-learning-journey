const express = require("express");
const {handleGetAllUsers} = require("../controllers/user");
const router = express.Router();

// router.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//    const html = `
//    <ul>
//    ${allDbUsers.map((user) => `<li>${user.first_Name} - ${user.email}</li>`).join("")}
//    </ul>
//    `;
//    res.send(html);
// });


router.get("/", handleGetAllUsers) 

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

// post
router.post("/", async (req, res) => {
  const body = req.body;
  if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
    return res.status(400).json({msg: "All fields are required..."});
  }



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
// router.patch("/api/users/:id", (req, res) => {
//     // edit the user with id
//   return res.json({status: "pending"});
// });

// // delete
// router.delete("/api/users/:id", (req, res) => {
//     // delete the user with id
//   return res.json({status: "pending"});
// });


// can also be write as
// router
// .route("/api/users/:id")
// .get(async(req, res) => {
//   const user = await User.findById(req.params.id);
//   // const id = Number(req.params.id);
//   // const user = users.find((user) => user[0].id === id);
//   if (!user) return res.status(404).json({error: "user not found"});
//   return res.json(user);
// })
// .post((req, res) => {
//     // create new user
//   return res.json({status: "pending"});
// })
// .delete((req, res) => {
//     // delete the user with id
//   return res.json({status: "pending"});
// });



module.exports = router;
