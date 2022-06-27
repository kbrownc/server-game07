const express = require('express');
const Datastore = require('nedb');
const app = express();

const database = new Datastore('database.db');
const published = new Date();
database.loadDatabase();
// database.insert({
// 	gameName: '1',
// 	type: '2',
// 	url: 'https://expo',
// 	published: published.toDateString(),
//  note: 'A card game for all ages'
// });
// console.log('delete row in db '); 
// database.remove({_id:'0j4xm4nXG5YpM17j'});
app.use(express.static( 'public' ));
app.use(express.json({ limit: '1mb'}));

// API: Delete record into database from UI (with response back to UI)
app.delete('/api/games/:id', (req, res) => {
		const id = req.params.id;
		database.remove({_id: id});
		res.json({
			status: 'success'
		});
});

// API: Insert record into database from UI (with response back to UI)
app.post('/api', (req, res) => {
		const game = req.body;
		database.insert(game);
		res.json({
			status: 'success'
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

const port = 5000;
app.listen(port, () => console.log(`Server started on Port ${port}`));
