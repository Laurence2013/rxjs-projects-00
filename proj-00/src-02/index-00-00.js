/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/conditional/every. Tag rxjs-every
	desc-01: Example 3: Values arriving over time and completing stream prematurely due to every returning false
	desc-02: It seems 'Example 3' shows typical usage of every(), an emitting 'value' not an array but a 'value'
	goal:
	line-code-added:
*/

const { of, from, concat } = require('rxjs');
const { tap, map, concatMap, delay, every, combineAll } = require('rxjs/operators');

const returnCode = request => (Number.isInteger(request) ? 200 : 400);
const fakeReq00$ = request => of({code: returnCode(request)}).pipe(
	tap(_ => console.log(request)),
	delay(1000)
);
const apiCall00$ = concat(
	fakeReq00$(2),
	fakeReq00$('invalid payload'),
	fakeReq00$(2),
	fakeReq00$(3)
).pipe(
	every(n => n.code === 200),
	tap(e => console.log(`all request successful: ${e}`))
);
const apiCall01$ = concat(
	fakeReq00$(2),
	fakeReq00$(2),
	fakeReq00$(3)
).pipe(
	every(n => n.code === 200),
	tap(e => console.log(`all request successful: ${e}`))
);

apiCall01$.subscribe();
