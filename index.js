
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  _ = require("underscore");
  //randomString = require("randomstring");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

  var phrases = [
  			{id: 0, word: "hello", definition: "ffjkdnff"},
  			{id: 1, word: "bye", definition: "sjdndfj"},
  			{id: 2, word: "bye2", definition: "kjfnkdjwd"},
  			{id: 3, word: "hello2", definition: "sdndjnd"},
  			{id: 4, word: "hello3", definition: "sjkhn"},
  			{id: 5, word: "hello4", definition: "hdjds"}
  ];



app.get("/", function (req, res){
	//console.log("hello")
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
	
});

app.get("/phrases", function (req, res) {
	res.send(JSON.stringify(phrases));
});

app.post("/phrases", function (req, res) {
	//console.log("body",req.body);
	newPhrases = req.body;
	//add a unique id
	newPhrases.id = phrases[phrases.length -1].id + 1;
	//push the new phrase
	phrases.push(newPhrases);
	//console.log("phrases1", phrases);
	//send a response
	res.redirect("/");
});

app.delete("/phrases/:id", function (req, res) {
	//phrases # delete
	var targetId = parseInt(req.params.id, 10);
	var targetItem = _.findWhere(phrases, {id: targetId});
	var index = phrases.indexOf(targetItem);
	phrases.splice(index, 1);
	//console.log("index", index)
	//res.redirect("/");
	res.send(JSON.stringify(targetItem));
});

app.listen(3000, function (){
	console.log("listen on port 3000");
});

