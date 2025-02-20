/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/creation/ajax, rxjs-ajax()
	goal:
	line-code-added:
*/

const { ajax } = require('rxjs/ajax');

const gitHubUsers = `https://api.github.com/users?per_page=2`;
const users00$ = ajax(gitHubUsers);
users00$.subscribe(
	res => console.log(res),
	err => console.log(err)
);
