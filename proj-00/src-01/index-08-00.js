/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap
	desc-00a: Tag(s) rxjs-switchmap()
	desc-01: Example 3: Using a resultSelector function
	desc-02: The interval() here starts again depending on the timer()
	goal:
	line-code-added:
*/

const { timer, interval } = require('rxjs');
const { switchMap, concatMap } = require('rxjs/operators');

const result00$ = timer(0, 5000).pipe(
	switchMap(_ => interval(1000), (outerValue, innerValue, outerIndex, innerIndex) => ({
		outerValue, innerValue, outerIndex, innerIndex
	}))
)
const result01$ = timer(0, 5000).pipe(
	switchMap(_ => interval(2000), (outerValue, innerValue, outerIndex, innerIndex) => ({
		outerValue, innerValue, outerIndex, innerIndex
	}))
)
const result02$ = timer(0, 5000).pipe(
	concatMap(_ => interval(2000), (outerValue, innerValue, outerIndex, innerIndex) => ({
		outerValue, innerValue, outerIndex, innerIndex
	}))
)
result01$.subscribe(console.log);
