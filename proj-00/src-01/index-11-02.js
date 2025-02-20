/*
	desc-00: In RxJs show code examples using zip() and Subject
	desc-00a: rxjs-zip, rxjs-subject, destructuring, role-of-brackets
	desc-01: Example 2: Zipping Multiple Subjects
	desc-02: Continue from index-11-00.js
	goal:
	line-code-added:
*/

// desc-01
const {Subject, zip} = require('rxjs');
const {tap, map} = require('rxjs/operators');

const name = () => {
	return new Promise(res => {
		setTimeout(() => {
			res('Laurence');
		},2000);
	});
};
const age = () => {
	return new Promise(res => {
		setTimeout(() => {
			res(38);
		},3000);
	});
};
const city = () => {
	return new Promise(res => {
		setTimeout(() => {
			res('Wolverhampton');
		},2000);
	});
};

const subject00$ = new Subject();
const subject01$ = new Subject();
const subject02$ = new Subject();
const result00$ = zip(subject00$, subject01$, subject02$).pipe(
	map(([name, age, city]) => ({name: name, age: age, city: city}))
);
result00$.subscribe(console.log);

name().then(val => subject00$.next(val));
age().then(val => subject01$.next(val));
city().then(val => subject02$.next(val));

//subject00$.next('Laurence');
//subject01$.next(38);
//subject02$.next('Wolverhampton');
