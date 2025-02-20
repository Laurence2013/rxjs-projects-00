/*
	desc-00: https://www.learnrxjs.io/learn-rxjs/operators/conditional/every. Tag rxjs-iif, rxjs-mergemap
	desc-01: 3. iif() with concatMap()
	goal:
	line-code-added:
*/

const { of, from, concat, iif } = require('rxjs');
const { tap, map, concatMap, mergeMap, switchMap, delay, every, combineAll } = require('rxjs/operators');

const returnCode = request => (Number.isInteger(request) ? 200 : 400);
const fakeReq00$ = request => of({code: returnCode(request)}).pipe(
	tap(_ => console.log(request)),
	delay(1000)
);
const source00$ = of(1,2,3,4,5);
const source00a$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15);
const source01$ = concat(
	fakeReq00$(1),
	fakeReq00$('Invalid request!'),
	fakeReq00$(2),
	fakeReq00$(3),
	fakeReq00$(4),
)
const result00$ = source00$.pipe(
	concatMap(val => iif(() => val > 2, of('Big: ' + val).pipe(delay(1000)), of('Small: ' + val).pipe(delay(1000)))),
);
const result01$ = source01$.pipe(
	concatMap(val => iif(() => val.code === 200, of('Received for 200!: ' + val.code), of('Received for 400!: ' + val.code)))
)
const result02$ = source00a$.pipe(
	mergeMap(val => of(`Values: ${val}`).pipe(delay(Math.random() * 2000)))
)
const result02a$ = source00a$.pipe(
	concatMap(val => of(`Values: ${val}`).pipe(delay(Math.random() * 2000)))
)
const result02b$ = source00a$.pipe(
	mergeMap(val => [
		of(`Sync values: ${val}`).pipe(delay(1000)),
		of(`Async values: ${val}`).pipe(delay(2000))
	]),
	combineAll()
)
result02b$.subscribe(console.log);

