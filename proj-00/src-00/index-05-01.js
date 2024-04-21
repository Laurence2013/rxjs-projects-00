/*
	desc-00: Give some RxJs code examples for endWith(), using scenarios and examples. Tag rxjs-endwith
	desc-01: Scenario 1: Progress Indicators
	desc-02: Option 1: Implementation focus
	desc-03: Option 2: Scenario based
	desc-04: Option 3: Conceptual understanding
	goal:
	line-code-added:
*/

const { from, of } = require('rxjs');
const { startWith, endWith, delay, concatAll } = require('rxjs/operators');

const fileChunk00$ = of({}).pipe(delay(2000));

fileChunk00$.pipe(
	startWith('Fetching data...'),
	endWith('Downloads Completed!')
).subscribe(console.log);

