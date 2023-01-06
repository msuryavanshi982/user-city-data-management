const express = require("express");
const mongoose = require("mongoose");
const route = require("./router/route");
const app = express();

app.use(express.json());
mongoose.set('strictQuery', false);

let url = "mongodb+srv://group67:n1plamTjStICrIRT@cluster0.e8wifql.mongodb.net/practice";
let port = process.env.PORT || 3000;

mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err));

app.use("/", route);

app.listen(port, () => {
    console.log("app is running on port", port);
})

