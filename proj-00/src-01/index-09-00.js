/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/transformation/concatmap
	desc-00a: Tag(s) rxjs-concatmap()
	desc-01: Customers are in a line in shop. Each are being served at the till one by one in an orderly fashion.
	desc-02: 1. Getting each user courses from a different api.
	goal:
	line-code-added:
*/

const { interval, of, from } = require('rxjs');
const { map, tap, delay, concatAll, concatMap, filter } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const result00$ = source00$.pipe(
	concatMap(customer => of(customer).pipe(
		delay(1000),
		map(_ => 'Is being served ' + customer)
	))
);
const result01$ = source00$.pipe(
	map(customer => of(customer).pipe(
		delay(1000),
		map(_ => 'Is being served ' + customer)
	)),
	concatAll()
);
//1: result01$.subscribe(console.log);

// desc-02
const users00 = [
	{id: 1, firstName: 'Craig', lastName: 'Murphy'},
	{id: 2, firstName: 'David', lastName: 'Jason'},
];
const courses00 = [
	{id: 10, first: 'Computer Science', second: 'Physics', third: 'Chemistry', userId: 1},
	{id: 11, first: 'Philosophy', second: 'Physics', third: 'Maths', userId: 2},
];

const result00 = from(users00).pipe(
	concatMap(user => from(courses00).pipe(
		filter(course => course.userId === user.id),
	))
);
const result01 = from(users00).pipe(
	concatMap(user => from(courses00).pipe(
		filter(course => course.userId === user.id),
		map(course => `Name: ${user.firstName}, third course: ${course.third}`)
	))
);
result01.subscribe(console.log);
