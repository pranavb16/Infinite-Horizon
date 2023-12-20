const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/flatDB");

const flatSchema = new mongoose.Schema({
    name: String,
    area: String,
    address: String,
    rent: Number,
    floorArea: Number,
    ownerDetails: {
        ownerName: String,
        contact: Number
    }
});

const Flat = mongoose.model("Flat", flatSchema);

const flat = new Flat({
    name: "1 RK Flat In Vidya Palace For Rent In Dhankawadi",
    area: "dhankawadi",
    address: "Pune - Satara Rd, Near Bharati Hospital",
    rent: 2500,
    floorArea: 400,
    ownerDetails: {
        ownerName: "Karan Bora",
        contact: 7030975000
    }  
});

// flat.save();

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.get("/owner", function(req, res) {
    res.render("owner.ejs");
});

app.get("/user", function(req, res) {
    res.render("user.ejs");
});

app.get("/signup", function(req, res) {
    res.render("signup.ejs");
})

app.post("/owner", function(req, res) {
    console.log(req.body.ownerName);
    const newFlat = new Flat({
        name: req.body.flatName,
        area: req.body.area,
        address: req.body.address,
        rent: req.body.rent,
        floorArea: req.body.floorArea,
        ownerDetails: {
            ownerName: req.body.ownerName,
            contact: req.body.contact
        }
    });
    newFlat.save();
    res.redirect("/owner");
});

app.post("/search", function(req, res) {
    const area = req.body.searchArea;
    Flat.find({area: area}).then(function(foundFlat) {
        res.render("user.ejs", {flatList: foundFlat});
    });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});