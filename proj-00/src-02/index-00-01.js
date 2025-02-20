/*
	desc-00: Give code examples and analogies to simulate fake API requests. Tag rxjs-every
	desc-01: How does a request and response work, give a few Javascript code to simulate this.
	desc-02: Simulating Request-Response with JavaScript
	desc-03: 1. Simple In-Memory Simulation
	goal:
	line-code-added:
*/

const { of, from, concat } = require('rxjs');
const { tap, map, concatMap, delay, every, combineAll } = require('rxjs/operators');

function sendRequest(method, url){
	const mockResponse = {
		'/api/users': { status: 200, body: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] },
		'/api/products/1': { status: 200, body: { id: 1, name: 'Widget', price: 19.99 } },
		'/api/nonexistent': { status: 404, body: { error: 'Not Found' } },
	};
	const response = mockResponse[url];
	return response ? Promise.resolve(response) : Promise.reject({status: 404, body:{error: 'Not Found'}});
};
const result00$ = concat(
	from(sendRequest('GET', '/api/users')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	),
	from(sendRequest('GET', '/api/nonexistent')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	),
	from(sendRequest('GET', '/api/users')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	)
).pipe(
	every(res => res.status === 200),
	tap(e => console.log(`All requests successful: ${e}`))
);
const result01$ = concat(
	from(sendRequest('GET', '/api/users')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	),
	from(sendRequest('GET', '/api/products/1')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	),
	from(sendRequest('GET', '/api/users')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	)
).pipe(
	every(res => res.status === 200),
	tap(e => console.log(`All requests successful: ${e}`))
);
result01$.subscribe();

