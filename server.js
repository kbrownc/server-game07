const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Applist = require('./models/apps');

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const port = process.env.PORT || 5000;

const uri = "mongodb+srv://kbrw:world13579@cluster0.jdaqg.mongodb.net/app-inv-test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then( (result) => app.listen(port, () => console.log(`Server started on Port ${port}`)))
.catch( (err) => console.log(err))

// const path = require('path');
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   }); 
// }

// Solution #2
// const path = require('path');
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('project-game08/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, "project-game08","build", "index.html"));
//   }); 
// }

// API: Delete record into database from UI (with response back to UI)
app.delete('/api/games/:id', (req, res) => {
	const id = req.params.id;
	database.remove({ _id: id });
	res.json({
		status: 'success',
	});
});

// API: Update record into database from UI (with response back to UI)
app.post('/api/update/:id/:url', (req, res) => {
	const id = req.params.id;
	const url = req.params.url;
	database.update({ _id: id }, { $set: { url: url } });
	res.json({
		status: 'success',
	});
});

// API: Insert record into database from UI (with response back to UI)
app.post('/api', (req, res) => {
	const game = req.body;
	database.insert(game);
	res.json({
		status: 'success',
	});
});

// API: query database to display on UI
app.get('/api/games', (req, res) => {
	database.find({}, (err, data) => {
		if (err) {
			response.end();
			return;
		}
		res.json(data);
	});
});
