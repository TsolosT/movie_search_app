var express = require("express");
var app = express();
var request = require("request");
const port = 3000;


app.use(express.static("public"));
app.set("view engine", "ejs");



app.get("/", function (req, res) {
    res.render("home");
});


app.get("/results", function (req, res) {
    var sTitle = req.query.searchTitle;
    var url = "http://www.omdbapi.com/?s=" + sTitle + "&apikey=thewdb";

    request(url, function (error, respond, body) {
        if (!error && respond.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {
                data: data,
                sTitle: sTitle
            });
        }
    });
})


app.get("*", function (req, res) {
    res.send("Sorry page not found...What are you doing with your life?");
});


app.listen(port, function () {
    console.log("The server is running on port 3000...Ctr+C to stop the server");
});
