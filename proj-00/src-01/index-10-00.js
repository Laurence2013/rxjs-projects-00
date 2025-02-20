/*
	desc-00: What is RxJs withLatestFrom()? 
	desc-00a: Tag(s) rxjs-withlatestfrom()
	desc-01: 3. Custom Project Function:
	goal:
	line-code-added:
*/

const { interval, of, concat } = require('rxjs');
const { withLatestFrom, map, delay, concatAll, combineAll } = require('rxjs/operators');

const source00$ = interval(1000);
const inner00$ = of(10,20,30,40,50);

const result00$ = source00$.pipe(
	withLatestFrom(inner00$),
	map(([first, sec]) => `first: ${first} - second: ${sec}`)
);
const result01$ = concat(inner00$.pipe(
	map(num => of(num).pipe(delay(1000))),
	combineAll()
), result00$); 
const result02$ = concat(inner00$.pipe(
	map(num => of(num).pipe(delay(1000))),
	concatAll()
), result00$); 
result00$.subscribe(console.log);
