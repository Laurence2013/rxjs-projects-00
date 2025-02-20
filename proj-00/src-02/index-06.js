/*
	desc-00: In RxJs how does defer() work?
	desc-00a: rxjs-defer
	desc-01: Network Requests with defer()
	goal:
	line-code-added:
*/

const { defer, of } = require('rxjs');

let userId = 1;

const source00$ = defer(() => of(userId));

userId = 2;
userId = 3;
userId = 4;

source00$.subscribe(console.log);
