/*
	desc-00: In RxJs give some code examples using generate() and RxJs conditionals in Javascript not Typescript
	desc-00a: rxjs-generate,
	desc-01: generate() with iif
	desc-02: generate() with takeWhile
	desc-03: Fibonacci sequence with generate() and scan
	goal:
	line-code-added:
*/

const { generate, of, timer, throwError, iif } = require('rxjs');
const { map, filter, delay, mergeMap, catchError, takeWhile, scan } = require('rxjs/operators');

// desc-01
const source00$ = generate(
	0,
	i => i < 20,
	i => i + 1,
	i => iif(() => i % 2 === 0, of('even'), of('odd'))
).pipe(
	mergeMap(x => x)
);
//source00$.subscribe(console.log);

// desc-02
const source01$ = generate(
	0, 
	_ => true,
	i => i + 1
).pipe(
	takeWhile(x => x < 5)
);
const source01a$ = generate(
	0, 
	_ => true,
	i => i + 1,
	i => i < 5
);
const source01b$ = generate(
	0, 
	i => i < 10,
	i => i + 1,
	i => i
);
//source01b$.subscribe(console.log);

// desc-03
const source02$ = generate(
	[0, 1],
	([curr, next]) => next < 100,
	([curr, next]) => [next, curr + next]
).pipe(
	scan((acc, [curr]) => [...acc, curr], []),
	map(arr => arr)
);
const source02a$ = generate(
	[0, 1],
	([curr, next]) => next < 100,
	([curr, next]) => [next, curr + next]
).pipe(
	scan((acc, [curr]) => [...acc, curr], []),
	map(arr => arr.slice(-1)[0])
);
source02$.subscribe(console.log);
