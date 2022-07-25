const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Applist = require('./models/apps');
//const mongodb = require('mongodb');
//const ObjectID = require('mongodb').ObjectID;

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

const uri =
	'mongodb+srv://kbrw:world13579@cluster0.jdaqg.mongodb.net/app_inv_test?retryWrites=true&w=majority';
mongoose
	.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		app.listen(port, () => console.log(`Server started on Port ${port}`));
	})
	.catch(err => console.log(err));

// Solution #1
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
	//const id = mongodb.ObjectID(req.params.id)
	//Applist.deleteOne({_id: id})
	// res.json({
	// 	status: 'success',
	// });
	console.log('deleteOne id', id);
	Applist.findByIdAndDelete(id)
		.then(result => {
			res.json({ status: 'success' })
		})
		.catch(err => {
			res.json({ status: 'failure' })
		})
});

// API: Update record into database from UI (with response back to UI)
app.post('/api/update/:id/:url', (req, res) => {
	const id = req.params.id;
	const url = req.params.url;
	Applist.update({ _id: id }, { $set: { url: url } })
		.then(result => {
			res.json({ status: 'success' })
		})
		.catch(err => {
			res.json({ status: 'failure' })
		})
});

// API: Insert record into database from UI (with response back to UI)
app.post('/api', (req, res) => {
	const game = new Applist(req.body);
	game.save()
		.then(result => {
			res.json({
				status: 'success',
			});
		})
		.catch(err => {
			res.json({
				status: 'failure',
			});
		});
});

// API: query database to display on UI
app.get('/api/games', (req, res) => {
	Applist.find()
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json({
				status: 'failure',
			});
		});
});
