/*
	desc-00: In RxJs explain in detail the catchError() operator.
	desc-00a: rxjs-catchError
	desc-01: catchError() -> Example 2: Catching rejected promise
	desc-02: Example
	desc-03: // Example 2: Fallback to a different API
	goal:
	line-code-added:
*/
const { of, from, interval, timer, throwError, lastValueFrom, firstValueFrom } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, switchMap, retryWhen, retry, delay, take, catchError } = require('rxjs/operators');

// desc-01
const badPromise = _ => new Promise((resolve, reject) => reject('Rejected'));
const result00$ = timer(1000).pipe(
	mergeMap(_ => from(badPromise()).pipe(
		catchError(err => of(`Bad Promise: ${err}`))
	))
);
//result00$.subscribe(console.log)

// desc-02
const result01$ = of(1,2,3,4,5).pipe(
	mergeMap(val00 => val00 === 3 ? throwError(_ => new Error('Error on value 3')) : of(val00)),
	catchError(error => {
    console.error('Error caught:', error);
    return of(4, 5, 6);
  })
);

// desc-03
const api00$ = of({data: 'Data from API 1'}).pipe(switchMap(_ => throwError(_ => new Error('API 1 failed'))));
const api01$ = of({data: 'Data from API 2'});
const result02$ = api00$.pipe(
	catchError(err => {
    console.error('Error caught:', err);
		return api01$.pipe(delay(2000));
	})
);
result02$.subscribe(
  value => console.log('Value:', value),
  error => console.error('Error:', error) // This won't be called due to catchError
);
