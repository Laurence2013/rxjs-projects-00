/*
	desc-00: In RxJs show code examples using zip() and Subject
	desc-00a: rxjs-zip, rxjs-subject, destructuring, role-of-brackets
	desc-01: Example 1: Basic Zip with Subjects
	desc-02: Carry on to index-11-02.js
	goal:
	line-code-added:
*/

// desc-01
const {Subject, zip} = require('rxjs');
const {tap, map} = require('rxjs/operators');

const subject00$ = new Subject();
const subject01$ = new Subject();
/*const result00$ = zip(subject00$, subject01$).pipe(
	tap(([name, age]) => console.log(`Name: ${name}, Age: ${age}`))
);
1: result00$.subscribe();*/
const result01$ = zip(subject00$, subject01$).pipe(map(([name, age]) => (name, age)));
const result01a$ = zip(subject00$, subject01$).pipe(map((name, age) => (name, age)));
const result01b$ = zip(subject00$, subject01$).pipe(map((name, age) => {name, age})); //undefined
const result01c$ = zip(subject00$, subject01$).pipe(map(([name, age]) => ({name, age})));
const result01d$ = zip(subject00$, subject01$).pipe(map(([name, age]) => {name, age})); //undefined
const result01e$ = zip(subject00$, subject01$).pipe(map(({name, age}) => (name, age))); //undefined
const result01f$ = zip(subject00$, subject01$).pipe(map(({name, age}) => {name, age})); //undefined
//const result01g$ = zip(subject00$, subject01$).pipe(map({name, age} => {name, age})); //SyntaxError: Malformed arrow function parameter list
const result01h$ = zip(subject00$, subject01$).pipe(map(([name, age]) => {
	return {firstName: name, personAge: age}
}));
result01h$.subscribe(console.log);

subject00$.next('Laurence');
subject01$.next(21);

subject00$.next('Craig');
subject01$.next(24);

