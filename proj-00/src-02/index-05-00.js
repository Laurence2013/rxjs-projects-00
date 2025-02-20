/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/creation/create. Tag rxjs-create
	desc-01: Example 2: Observable that emits even numbers on timer
	desc-02: Combining create() with Other Operators
	goal:
	line-code-added:
*/

const { Observable, of, throwError, merge, interval } = require('rxjs');
const { take } = require('rxjs/operators');

// desc-01
const evenNumbers00$ = Observable.create(obs => {
	let value = 0;
	const interval = setInterval(() => {
		value % 2 === 0 ? obs.next(value) : null;
		value++;
	}, 1000);
	return () => clearInterval(interval);
});
/*const subscribe$ = evenNumbers00$.subscribe(console.log);
setTimeout(() => {
	subscribe$.unsubscribe();
}, 10000);*/

// desc-02
const source00$ = Observable.create(sub => setTimeout(() => sub.next('Value from source 1'), 2000));
const source01$ = Observable.create(sub => setTimeout(() => sub.next('Value from source 2'), 1000));
const source02$ = Observable.create(sub => {
	let value = 0;
	const interval = setInterval(() => {
		sub.next(value);
		value++;
	}, 1000);
	return () => clearInterval(interval);
});
const source02a$ = interval(1000).pipe(take(4));
const result00$ = merge(source00$, source01$, source02a$);
result00$.subscribe(console.log);

//setTimeout(() => result00$.unsubscribe(), 4000)
