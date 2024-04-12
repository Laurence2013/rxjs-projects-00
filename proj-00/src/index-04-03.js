/*
desc-00: Give some RxJs code examples that includes concatAll(), map(), take(), interval(), and of() using scenarios and examples. Tag rxjs-concatall
desc-01: Scenario 1: Delayed Sequence of API Requests
goal:
line-code-added:
*/

const { of, interval } = require('rxjs');
const { concat, concatAll, take, map, delay } = require('rxjs/operators');

const apiCall1 = of('Data 12').pipe(delay(1000));
const apiCall2 = of('Data 23').pipe(delay(500));
const apiCall3 = of('Data 34').pipe(delay(2000));

const source$ = interval(3500).pipe(
	map(val => [apiCall1, apiCall2, apiCall3][val]),
	take(3),
	concatAll()
);

source$.subscribe(data => console.log('API response: ' + data));
