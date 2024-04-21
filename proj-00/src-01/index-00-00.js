/*
	desc-00: Give some RxJs code examples for forkJoin(), using scenarios and examples. Tag(s) rxjs-forkjoin()
	desc-01: Scenario 1: Parallel HTTP Requests
	desc-02: Option 3: Modification
	goal:
	line-code-added:
*/

global.XMLHttpRequest = require('xhr2');
const { ajax } = require('rxjs/ajax');
const { forkJoin, from } = require('rxjs');
const { delay, map, concatAll } = require('rxjs/operators');

const apis = [
	'https://api.github.com/users/google',
	'https://api.github.com/users/microsoft',
	'https://api.github.com/users'
];

const fetchApis$ = (api) => {
	return ajax.getJSON(api).pipe(delay(2000));
}

const source00$ = forkJoin([
	fetchApis$(apis[0]),
	fetchApis$(apis[1]),
	fetchApis$(apis[2])
]);

source00$.subscribe(([api1, api2, api3]) => {
	console.log('API 1: ', api1)
})

/*from(apis).pipe(
	map(api => fetchApis$(api)),
	concatAll()
).subscribe(console.log);*/
