/*
	desc-00: In RxJs explain the bufferCount() operator.
	desc-00a: rxjs-bufferCount
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { map, filter, flatMap, concatMap, switchMap, bufferCount, throttleTime, delay, take } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const source01$ = interval(5000);
const source01a$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15).pipe(delay(1000));
const source01b$ = of([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]).pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const source01c$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15).pipe(
	concatMap(data => of(data).pipe(delay(1000)))
);
const source02$ = of([
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
  { id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
  { id: 6, name: 'Product F' },
  { id: 7, name: 'Product G' },
  { id: 8, name: 'Product H' },
  { id: 9, name: 'Product I' }
]).pipe(delay(1000));
const source02a$ = of(
  { id: [1,2,3], name: 'Product A' },
  { id: [2,3,4], name: 'Product B' },
  { id: [4,5,6], name: 'Product C' },
  { id: [4,5,6,7,8,9,10], name: 'Product CC' },
  /*{ id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
  { id: 6, name: 'Product F' },
  { id: 7, name: 'Product G' },
  { id: 8, name: 'Product H' },
  { id: 9, name: 'Product I' }*/
).pipe(delay(1000));
const source02b$ = of(
  { id: [1,2,3], name: 'Product A' },
  { id: [2,3,4], name: 'Product B' },
  { id: [4,5,6], name: 'Product C' },
  { id: [4,5,6,7,8,9,10], name: 'Product CC' },
  { id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
  { id: 6, name: 'Product F' },
  { id: 7, name: 'Product G' },
  { id: 8, name: 'Product H' },
  { id: 9, name: 'Product I' }
).pipe(delay(1000));

const result00$ = source00$.pipe(bufferCount(3));
const result01$ = source01a$.pipe(bufferCount(3))
const result01a$ = source01b$.pipe(
	switchMap(data00 => of(data00).pipe(
		concatMap(data01 => data01),
		bufferCount(3)
	))
);
const result01b$ = source01c$.pipe(
	map(data => data),
	bufferCount(3)
);
const result01bb$ = source01c$.pipe(
	bufferCount(3)
);
const result01c$ = source02$.pipe(
	switchMap(data00 => of(data00).pipe(
		concatMap(data01 => data01),
		bufferCount(3)
	))
);
const result01cc$ = source02$.pipe(
	//map(data00 => data00),
	flatMap(data00 => data00),
	bufferCount(3)
);
const result01d$ = source02a$.pipe(
	switchMap(data00 => of(data00).pipe(
		concatMap(data01 => data01.id),
		bufferCount(3)
	))
);
const result01dd$ = source02a$.pipe(
	concatMap(data00 => data00.id),
	delay(2000),
	bufferCount(3)
);
const result01e$ = source02b$.pipe(bufferCount(3));
const result01f$ = source02b$.pipe(
	//concatMap(data00 => data00.name),
	map(data00 => data00.name),
	delay(1000)
);
const result01g$ = source02$.pipe(
	flatMap(data00 => data00),
	bufferCount(3),
);
const result01gg$ = source02$.pipe(
	flatMap(data00 => data00),
	concatMap(data01 => of(data01).pipe(delay(1000))),
	bufferCount(3),
);
result01gg$.subscribe(console.log);
