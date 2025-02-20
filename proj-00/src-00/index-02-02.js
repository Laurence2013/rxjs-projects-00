/*
	desc-00: Using the combineLatest() function, tag rxjs-combinelatest
	desc-01: Problem is that it keeps printing the last name in the array 'Craig' every second
	goal: 
	line-code-added:
*/
const { combineLatest, of, interval } = require('rxjs');
const { map, tap, take } = require('rxjs/operators');

const name$ = ['Tony', 'Mary', 'Craig'];
const age00$ = interval(1000);
const age01$ = interval(1000).pipe(take(5));

const combined$ = combineLatest([name$, age01$]).pipe(	
	map(([name, age]) => `${name} is ${age} years old.`)
);
combined$.subscribe(console.log);

