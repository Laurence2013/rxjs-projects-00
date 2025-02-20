/*
	desc-00: In RxJs explain the buffer() operator.
	desc-00a: rxjs-buffer
	desc-01: Example:
	desc-02: Without using fromEvent() how can you simulate a API request using buffer()?
	goal:
	line-code-added:
*/
const { of, interval, timer } = require('rxjs');
const { map, filter, concatMap, switchMap, buffer, throttleTime, delay, take } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const source01$ = interval(5000);
const source01aa$ = interval(5000).pipe(take(3));
const source01a$ = of(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15).pipe(delay(1000));
const source01b$ = of([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]).pipe(delay(1000));
const source01c$ = of(1,2,3).pipe(delay(1000));
const result00$ = source00$.pipe(buffer(source01$), take(3));
result00$.subscribe(vals => console.log(`Buffered values: ${vals}`));

//desc 02
const source02$ = of(
  [{ id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' }],
  [{ id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
  { id: 6, name: 'Product F' }],
  [{ id: 7, name: 'Product G' },
  { id: 8, name: 'Product H' },
  { id: 9, name: 'Product I' }]
).pipe(delay(1000));
const source02a$ = of(
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
  { id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
  { id: 6, name: 'Product F' },
  { id: 7, name: 'Product G' },
  { id: 8, name: 'Product H' },
  { id: 9, name: 'Product I' }
).pipe(delay(1000));
const source02b$ = of([
		{ id: 1, name: 'Product A' },
		{ id: 2, name: 'Product B' },
		{ id: 3, name: 'Product C' },
		{ id: 4, name: 'Product D' },
	],[
		{ id: 5, name: 'Product E' },
		{ id: 6, name: 'Product F' },
		{ id: 7, name: 'Product G' },
		{ id: 8, name: 'Product H' },
		{ id: 9, name: 'Product I' }
]).pipe(delay(500));
const result01$ = source02$.pipe(
	map((data00, indx) => data00[indx].name),
	buffer(interval(4000)),
	take(3)
);
const result01a$ = source02a$.pipe(
	map(data00 => data00.name),
	buffer(interval(4000)),
	take(3)
);
const result01b$ = source00$.pipe(
	switchMap(index => source02b$.pipe(
		map(data00 => data00[index].name)
	)),
	buffer(interval(3000)),
)
const result01c$ = source00$.pipe(
	switchMap(index => source01c$.pipe(
		map(data00 => data00[index])
	)),
	map((data01, index) => data01),
	buffer(interval(1000)),
)
const result01d$ = source02a$.pipe(
	map(data00 => data00.name),
	buffer(interval(1000))
);
const result01e$ = source02b$.pipe(
	map(data00 => data00.map(data01 => data01.name)),
	buffer(interval(1000))
);
//result01e$.subscribe(res => console.log(`API response: ${res}`));
