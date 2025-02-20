/*
	desc-00: In RxJs explain in detail the retryWhen() operator.
	desc-00a: rxjs-retryWhen, rxjs-retry
	desc-01: retryWhen() -> Example
	desc-02: retryWhen() -> 3. Combining retryWhen() with catchError()
	desc-03: retry() -> Example:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, throwError, lastValueFrom, firstValueFrom } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, retryWhen, retry, delay, take, catchError } = require('rxjs/operators');

// desc-01
const result00$ = interval(1000).pipe(
	map(val00 => val00 > 3 ? new Error('Value exceeds maximum!') : val00),
	retryWhen(err => err.pipe(
		delay(2000),
		take(3)
	))
);
const result00a$ = interval(1000).pipe(
	mergeMap(val00 => val00 > 3 ? throwError(_ => new Error('Value exceeds maximum!')) : of(val00)),
	retryWhen(err => err.pipe(
		delay(2000),
		take(3)
	))
);
const result00b$ = interval(1000).pipe(
	concatMap(val00 => val00 > 3 ? throwError(_ => new Error('Value exceeds maximum!')) : of(val00)),
	retryWhen(err => err.pipe(
		delay(2000),
		take(3)
	))
);
/*result00a$.subscribe({
  next: val => console.log(val),
  error: val => console.log(`Final Error: ${val}`)
});*/

// desc-02
const result01$ = of(1,2,3,4,5,6,7,8,9).pipe(
	mergeMap(val00 => val00 === 3 ? throwError(_ => new Error('Error on value 3')) : of(val00)),
	retryWhen(err00 => err00.pipe(
		mergeMap((err01, i) => timer(1000 * 2 ** i)),
		take(3)
	)),
	catchError(error => of('Error handled, providing fallback!'))
);
/*result01$.subscribe({
  next: val => console.log(val),
  error: val => console.log(`Final Error: ${val}`)
});*/

// desc-03
const result02$ = of(1,2,3,4,5,6,7,8,9).pipe(
	mergeMap(val00 => val00 === 3 ? throwError(_ => new Error('Error on value 3')) : of(val00)),
	retry(3)
);
const result02a$ = of(1,2,3,4,5,6,7,8,9).pipe(
	map(val00 => val00 === 3 ? new Error('Error on value 3') : val00),
	delay(1000)
);
result02a$.pipe(retry(2));

const result03$ = interval(1000).pipe(
	take(5),
	mergeMap(val00 => val00 === 3 ? throwError(_ => new Error('Error on value 3')) : of(val00)),
	retry(2)
);
const result04$ = interval(1000).pipe(
	mergeMap(val00 => val00 === 3 ? throwError(_ => new Error('Error on value 3')) : of(val00)),
	retryWhen(err00 => err00.pipe(
		mergeMap(_ => timer(2000)),
		take(2)
	))
);
result04$.subscribe({
  next: val => console.log(val),
  error: val => console.log(`Final Error: ${val}`)
});
