var express = require("express"),
	app     = express(),
	bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require('method-override');


app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));//telling it to look inside public direc where custom stylesheet
app.use(methodOverride('_method'));



app.get("/", function(req, res){
    res.render("landing");
});




app.listen(3000,function(){
    console.log("BLog-bee server has started")
  
});

