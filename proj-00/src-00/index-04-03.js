/*
desc-00: Give some RxJs code examples that includes concatAll(), map(), take(), interval(), and of() using scenarios and examples. Tag rxjs-concatall
desc-01: Scenario 1: Delayed Sequence of API Requests
goal:
line-code-added:
*/

const { of, interval } = require('rxjs');
const { concat, concatAll, combineAll, take, map, delay, switchMap } = require('rxjs/operators');

const apiCall1 = of('Data 12').pipe(delay(1000));
const apiCall2 = of('Data 23').pipe(delay(500));
const apiCall3 = of('Data 34').pipe(delay(2000));

const source00$ = interval(1000).pipe(
	map(val => [apiCall1, apiCall2, apiCall3][val]),
	take(3),
	concatAll()
);
const source00a$ = interval(1000).pipe(
	map(_ => [apiCall1, apiCall2, apiCall3][1]),
	take(3),
	combineAll()
);
const source01$ = interval(3500).pipe(
	switchMap(_ => of(apiCall1, apiCall2, apiCall3).pipe(
		map(val01 => val01)
	)),
	take(3),
	concatAll()
);
const source02$ = interval(3500).pipe(
	switchMap(val00 => of([apiCall1, apiCall2, apiCall3]).pipe(
		map(val01 => val01)
	)),
	take(3),
	concatAll()
);
source00a$.subscribe(data => console.log('API response: ' + data));

/* console both together
source00$.subscribe(data => console.log('API response: ' + data));
source01$.subscribe(data => console.log('API response: ' + data));
*/
