/*
	desc-00: Give some RxJs code examples for combineAll(), interval() and inner intervals, using scenarios and examples. Tag(s) rxjs-combineall, rxjs-interval
	desc-01: Scenario 2: Polling with Inner Intervals
	desc-02: Option 1: Understanding Code Structure
	desc-03: Option 2: Sequence and Operator Choice
	desc-04: Option 3: Code Modification
	goal:
	line-code-added:
*/

const { interval, timer } = require('rxjs');
const { switchMap, concat, combineAll, take } = require('rxjs/operators');

const rapidPolling$ = interval(1000).pipe(take(3));
const regularPolling$ = interval(5000);

timer(0).pipe(
	switchMap(() => concat(rapidPolling$, regularPolling$)),
	combineAll()
).subscribe(console.log);
