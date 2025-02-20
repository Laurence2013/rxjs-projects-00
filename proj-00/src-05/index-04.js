/*
	desc-00: In RxJs explain the bufferWhen() operator.
	desc-00a: rxjs-bufferWhen
	desc-01: Example:
	desc-02: 4. Buffering with a Timeout:
	desc-03: 3. Buffering Until an Error Condition:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, throwError } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, switchMap, bufferWhen, delay, take, mergeAll } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const source01$ = _ => interval(5000);
const result00$ = source00$.pipe(
	bufferWhen(source01$)
);
//result00$.subscribe(val00 => console.log(`Buffered values: ${val00}`));

// desc-02
const source02$ = interval(1000);
const result01$ = source02$.pipe(
	bufferWhen(_ => timer(5000))
);
//result01$.subscribe(console.log);

// desc-03
const source03$ = interval(1000);
const source04$ = _ => timer(5000);
const source05$ = _ => timer(8000).pipe(mergeMap(_ => throwError(_ => new Error('Error condition!'))));
const source06$ = _ => timer(5000).pipe(mergeMap(_ => of(1,2,3).pipe(map(val => val * 2))));

const result02$ = source03$.pipe(
	bufferWhen(source05$),
);
result02$.subscribe({
	next: val => console.log('Buffered values:', val),   
	error: err => console.error(err)
});
