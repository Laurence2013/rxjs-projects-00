/*
desc-00: Using the combineLatest() function, tag rxjs-combinelatest
desc-01: ReferenceError: document is not defined
goal: 
line-code-added:
*/
const express = require('express');
const path = require('path');

const { mapTo, startWith, scan, tap, map } = require('rxjs/operators');

const app = express();
const port = 3000; // Port to listen on

// Set the public directory to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Handle the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index-00.html', 'index-00.html'));

	const redTotal = document.getElementById('red-total');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

