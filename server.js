const express = require('express');
const Datastore = require('nedb');
const app = express();
const database = new Datastore('database.db');
database.loadDatabase();

// const published = new Date();
// database.insert({
// 	gameName: '1',
// 	type: '2',
// 	url: 'https://expo',
// 	published: published.toDateString(),
//  note: 'A card game for all ages'
// });
// console.log('delete row in db '); 
// database.remove({_id:'0j4xm4nXG5YpM17j'});
// database.update({_id: 'AOevL5vYceREZxr1'}, { $set: {url: 'test hard coded'}});

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

// API: Update record into database from UI (with response back to UI)
app.post('/api/update/:id/:url', (req, res) => {
		const id = req.params.id;
		const url = req.params.url;
		database.update({_id: id}, { $set: {url: url}});
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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on Port ${port}`));
