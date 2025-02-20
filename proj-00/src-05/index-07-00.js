/*
	desc-00: In RxJs explain in great detail exhaustMap() operator
	desc-00a: rxjs-exhaustMap
	goal:
	line-code-added:
*/
const { of, from, interval, merge } = require('rxjs');
const { tap, map, filter, delay, take, flatMap, concatMap, exhaustMap, switchMap } = require('rxjs/operators');

const source00$ = interval(1000).pipe(take(5));
const result00$ = source00$.pipe(
	exhaustMap(_ => of(true).pipe(
		switchMap(_ => source00$),
		delay(3000)
	))
);
const result01$ = source00$.pipe(
	exhaustMap(_ => of({name: 'Lozza', age: 39}).pipe(
		delay(3000), // this is the part where it goes out like requesting an API call somewhere to a cloud server
		map(user => user.name)
	))
);
result00$.subscribe(console.log);
