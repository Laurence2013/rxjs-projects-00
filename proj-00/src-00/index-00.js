/*
desc-00: 
goal:
line-code-added:
*/
const rx = require('rxjs');

let source = rx.Observable.create(observer => {
	observer.next(1);
	observer.next(2);
	observer.next(3);
	observer.next(4);
});

source.subscribe(console.log);
