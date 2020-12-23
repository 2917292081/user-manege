const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(value => {
		console.log("value");
	}, reason => {
		console.log("reason");
	})