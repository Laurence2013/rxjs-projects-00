/*
	desc-00: Give some rxjs code examples that includes concatall(), map(), take(), interval(), and of() using scenarios and examples. tag rxjs-concatall
	desc-01: Scenario 1: Sequential HTTP Requests
	desc-02: Typical example coding question. Option 1: Implementation Focus
	desc-03: Typical example coding question. Option 2: Operator Identification
	desc-04: Typical example coding question. Option 3: Code Comprehension
	goal:
	line-code-added:
*/

const { of, from } = require('rxjs');
const { delay, concatAll } = require('rxjs/operators');

const simulatedRequests = (data, delayMs) => {
	return of(data).pipe(delay(delayMs));
}

const https = [
	simulatedRequests('Request 1', 1000),
	simulatedRequests('Request 2', 2000),
	simulatedRequests('Request 3', 500),
	simulatedRequests('Request 4', 3000),
	simulatedRequests('Request 5', 4000)
]

from(https).pipe(concatAll()).subscribe(console.log);
