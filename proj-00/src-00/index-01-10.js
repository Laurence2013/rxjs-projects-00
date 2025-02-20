/*
	desc-00: Give some RxJs code examples using combineAll(), interval() and some other operators.
	desc-00a: Tag rxjs-combineall, rxjs-interval
	desc-01: Example 2: Simulating Parallel API Requests
	goal: 
	line-code-added:
*/

// desc-01
const { of, interval, from } = require('rxjs');
const { map, combineAll, concatAll, mergeAll, delay } = require('rxjs/operators');
const { ajax } = require('rxjs/ajax');
const { fromFetch } = require('rxjs/fetch');

const apiEndpoints = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
const endpoints00$ = from(apiEndpoints).pipe(
	map(endpoint => of(endpoint).pipe(delay(1000))),
	combineAll()
);
const endpoints01$ = from(apiEndpoints).pipe(
	map(endpoint => of(endpoint).pipe(delay(1000))),
	concatAll()
);
endpoints01$.subscribe(console.log);

