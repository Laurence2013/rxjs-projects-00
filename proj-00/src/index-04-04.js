/*
	desc-00: Give some rxjs code examples that includes concatall(), map(), take(), interval(), and of() using scenarios and examples. tag rxjs-concatall
	desc-01: Scenario 1: Sequential HTTP Requests
	desc-02: Typical example coding question. Option 1: Emphasizing Sequential Execution
	desc-03: Typical example coding question. Option 2: Focusing on Resource Management
	desc-04: Typical example coding question. Option 3: Highlighting Order Importance
	goal:
	line-code-added:
*/

const { from, of } = require('rxjs');
const { map, concatAll } = require('rxjs/operators');

const urls = ['https://api.site1.com', 'https://api.site2.com', 'https://api.site3.com'];

const makeRequest = url => {
	return of(`Response from URL: ${url}`).pipe(map(val => ({url, value: val})));
}

const source$ = of(urls).pipe(
	map(() => makeRequest(urls)),
	concatAll()
);

source$.subscribe(console.log);
