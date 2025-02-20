/*
	desc-00: In RxJs explain in detail pluck() operator
	desc-00a: rxjs-pluck
	desc01: The pluck() operator is now deprecated, use map() with '?' instead
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, pluck } = require('rxjs/operators');

// desc-01
const source00$ = from([
  { name: 'John', age: 30, job: { title: 'Developer' } },
  { name: 'Jane', age: 25, job: { title: 'Designer' } }
]);
const result00$ = source00$.pipe(
	map(data00 => ({name: data00?.name, title: data00?.job?.title}))
);
result00$.subscribe(console.log);
