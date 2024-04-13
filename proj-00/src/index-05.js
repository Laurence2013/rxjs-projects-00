/*
	desc-00: Give some RxJs code examples for endWith(), using scenarios and examples. Tag rxjs-endwith()
	desc-01: Scenario 1: Progress Indicator. You're building a file upload component. You want to show "Upload Complete!" when the upload finishes.
	desc-02: Option 1: Explanatory
	desc-03: Option 2: Modification
	desc-04: Option 3: Problem-Solving
	goal:
	line-code-added:
*/

const { of, timer } = require('rxjs');
const { endWith, map, switchMap, concatAll } = require('rxjs/operators');

const fileChunk00$ = of('File 1 - part 1', 'File 2 - part 2', 'File 3 - part 3');
const fileChunk01$ = of('File 1 - part 1', 'File 2 - part 2', 'File 3 - part 3');

const simulatedUpload00$ = (chunk) => {
	return timer(Math.random() * 2000).pipe(map(() => `Uploaded: ${chunk}`));
};
const simulatedUpload01$ = (chunk) => {
	return timer(Math.random() * 2000);
};

fileChunk01$.pipe(
	switchMap(chunk => simulatedUpload00$(chunk)),
	map(chunk => `Uploaded files: ${chunk}`),
	endWith('Uploaded Files!'),
).subscribe(console.log);

fileChunk00$.pipe(
	map(chunk => simulatedUpload00$(chunk)),
	concatAll(),
	endWith('Uploaded Files!'),
);
