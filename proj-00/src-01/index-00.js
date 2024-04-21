/*
	desc-00: Give some RxJs code examples for forkJoin(), using scenarios and examples. Tag(s) rxjs-forkjoin()
	desc-01: Scenario 1: Parallel HTTP Requests
	desc-02: Option 1: Implementation Focus
	desc-03: Option 2: Analysis and Error Handling
	desc-04: Option 3: Modification
	goal:
	line-code-added:
*/

global.XMLHttpRequest = require('xhr2');
const { ajax } = require('rxjs/ajax');
const { forkJoin } = require('rxjs');

const apiCall1 = ajax.getJSON('https://api.github.com/users/google');
const apiCall2 = ajax.getJSON('https://api.github.com/users/microsoft');
const apiCall3 = ajax.getJSON('https://api.github.com/users');

const source00$ = forkJoin([apiCall1, apiCall2, apiCall3]);

source00$.subscribe(([api1, api2, api3]) => {
	console.log('API 1: ', api1)
	//console.log('API 2: ', api2)
	//console.log('API 3: ', api3)
});
