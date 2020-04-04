var express = require("express"),
	app     = express(),
	bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require('method-override');
    firebase       = require('firebase')


const firebaseConfig = {
            apiKey: "AIzaSyDGAs06ATXPiJBwFCzB7HTLM7KpkazffwI",
            authDomain: "blog-bee-cc07a.firebaseapp.com",
            databaseURL: "https://blog-bee-cc07a.firebaseio.com",
            projectId: "blog-bee-cc07a",
            storageBucket: "blog-bee-cc07a.appspot.com",
            messagingSenderId: "877497282899",
            appId: "1:877497282899:web:01f7cfacf253ec7210f1a6",
            measurementId: "G-T547CL47Q2"
          };

firebase.initializeApp(firebaseConfig);  
firebase.auth.Auth.Persistence.LOCAL;
const docRef = firebase.firestore().collection('samples').doc();

app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(express.static("public"));//telling it to look inside public direc where custom stylesheet
app.use(methodOverride('_method'));



app.get("/firestore", function(req, res){
    res.render("firestore");
});

app.post("/firestore", function(req, res){
    var n = req.body.mc;
    docRef.set({
    	'name':n
    }).then(function(){
    	console.log('status saved!!');
    }).catch(function(error){
    	console.log('got an error'+error.message);
    });

    var mydata;
    docRef.onSnapshot(function(doc){

    	if (doc && doc.exists){
    		mydata = doc.data().name;
    		console.log('retrieved :'+mydata);
    	}
    	

    })
res.rend("firestoredisp",{mydata:mydata});

});

app.get("/", function(req, res){
    res.render("register");
});

app.post("/register",function(req,res){
 
  var email = req.body.username;
  var pass = req.body.password;

  if(email!="" && pass!=""){

  		 firebase.auth().createUserWithEmailAndPassword(email, pass).catch( (error) => console.log(error.message));

     
  }else{
  	 console.log('Fields empty!!!');
  }


   firebase.auth().onAuthStateChanged(firebaseUser => {
  
        if (firebaseUser) {
         res.render('after',{firebaseUser:firebaseUser})
         console.log(firebaseUser.email);
		}else{
			console.log('Pls log in');
		}


});



});


app.post("/logout",function(req,res){
	firebase.auth().signOut();
	console.log('logged out '+req.email);
	res.render('login');
})


app.get("/login", function(req, res){
    res.render("login");
});


app.post("/login",function(req,res){
 
  var email = req.body.username;
  var pass = req.body.password;

  if(email!="" && pass!=""){

  		 firebase.auth().signInWithEmailAndPassword(email, pass).catch( (error) => console.log(error.message));

     
  }else{
  	 console.log('Fields empty!!!');
  }


   firebase.auth().onAuthStateChanged(firebaseUser => {
  
        if (firebaseUser) {
         res.render('after',{firebaseUser:firebaseUser})
         console.log(firebaseUser.email);
		}else{
			console.log('Pls log in');
		}


});

});



app.listen(3000,function(){
   console.log('Blog server started')  
  
});

