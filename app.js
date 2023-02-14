

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8080;
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var items = ["Item 01", "Item 02", "Item 03"];
var workItems = [];




app.get("/", (req, res) => {
	var today = new Date();
	var options = {
		weekday: "long",
		month: "long",
		day: "numeric"
	};

	var day = today.toLocaleDateString("en-US", options);

	res.render("list", { listTitle: day, newListItems: items,title:"home page" });
});

app.post("/", (req, res) => {
	var item = req.body.newItem;
	if (req.body.list === "Work") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.get("/work", (req, res) => {
	res.render("list", { listTitle: "Work List", newListItems: workItems, title:"work"});
});

app.get("/about", (req, res) => {
	res.render("list",{listTitle: "Work List", newListItems: workItems , title:"about"});
});
app.get("*",function(req,res){
	res.render("list",{listTitle: "Work List", newListItems: workItems , title:"error"})
})

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
