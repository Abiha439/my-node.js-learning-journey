const express = require("express");
const urlRoute = require('./routes/url');
const { connectToMongoDB } = require("./connect");
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly } = require('./middlewares/auth');

// routes
const URL = require('./models/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');


const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log('Mongo db connected'));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());




// app.get("/test", async(req, res) => {
//    const allUrls = await URL.find({});
//    return res.render("home", {
//       urls: allUrls,
//    });
// });

app.use("/user", restrictToLoggedinUserOnly, userRoute);
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get('/:shortId', async (req, res) => {

 const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
 }, {$push: {
    visitHistory: {
       timestamp:  Date.now(),
    }
 },
}
);

if (!entry) {
    return res.status(404).send("Short URL not found");
}

res.redirect(entry.redirectURL)
});


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));