const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
app.use(express.static("public"));

app.set("views", "views");
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	console.log("root page requested");

});

app.get("/getRate", function(req, res){
	console.log("in the render function");
	var type = req.query.type;
	var weight = req.query.weight;

	calculateRate(type, weight);

	var price = calculateRate(type, weight);

	res.render("results", {weight:weight, type:type, price:price});
});


app.listen(port, function() {
	console.log('Node app is running on port', port);
  });

function calculateRate(type, weight){
	var price = 0;
	var x = 0.15;

	switch(type){
		case "Letters(stamped)":
			var base = 0.55;
			price = base + (x * (weight - 1));
			break;
		case "Letters(Metered)":
			var base = 0.50;
			price = base + (x * (weight - 1));
			break;
		case "Large Envelopes (flats)":
			var base = 1.00;
			price = base + (x * (weight - 1));
			break;
		case "First-Class Package Service-Retail":
			if(weight < 5){
				price = 3.66;
			}
			else if(weight > 4 && weight < 9){
				price = 4.39;
			}
			else if(weight > 8 && weight < 13){
				price = 5.19;
			}
			else {
				price = 5.71;
			}
			break;
			default: price = "no valid price";
	}
	return price.toFixed(2);
}