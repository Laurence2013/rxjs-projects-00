/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/combination/zip
	desc-00a: rxjs-zip
	desc-01: Example 1: zip multiple observables emitting at alternate intervals
	goal:
	line-code-added:
*/

const {interval, of, zip} = require('rxjs');
const {delay, take} = require('rxjs/operators');

// desc-01
const source00$ = of('Hello');
const source00a$ = of('Hello', 'World');
const source00b$ = of('Hello', 'World0', 'World1', 'World2');
const source01$ = of('World!');
const source02$ = of('Goodbye!');
const source03$ = of('World!');
const source04$ = of('Another one!').pipe(delay(2000));
const results00$ = zip(
	source00$,
	source01$.pipe(delay(1000)),
	source02$.pipe(delay(2000)),
	source03$.pipe(delay(3000)),
);
const results00a$ = zip(
	source00$,
	source01$.pipe(delay(3000)),
	source02$.pipe(delay(2000)),
	source03$.pipe(delay(1000)),
);
const results00b$ = zip(
	source00$,
	source04$,
	source01$.pipe(delay(1000)),
	source02$.pipe(delay(2000)),
	source03$.pipe(delay(3000)),
);
//results00$.subscribe(console.log);

// desc-02
const source05$ = interval(1000);
const results01$ = zip(source05$, source05$.pipe(take(2)));
const results01a$ = zip(source00$, source05$.pipe(take(2)));
const results01b$ = zip(source00$, source05$.pipe(take(3)));
const results01c$ = zip(source00a$, source05$.pipe(take(3)));
const results01d$ = zip(source00b$, source05$.pipe(take(3)));
results01d$.subscribe(console.log);
