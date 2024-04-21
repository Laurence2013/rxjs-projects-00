/*
	desc-00: In RxJs what is the difference between concatAll() and combineAll()? Tag(s) rxjs-combineall, rxjs-concatall
	goal:
	line-code-added:
*/

const { interval, of } = require('rxjs');
const { take, map, combineAll, concatAll } = require('rxjs/operators');

const source00$ = interval(1000).pipe(
	take(2)
);
const source01$ = of(
	interval(1000).pipe(
		map((x => `Source 1: ${x}`)), 
		take(3)
	),
	interval(500).pipe(
		map((y => `Source 2: ${y}`)), 
		take(5)
	),
	interval(500).pipe(
		map((z => `Source 3: ${z}`)), 
		take(5)
	)
);
const example00$ = source00$.pipe(
  map(val => interval(500).pipe(
      map(i => `Result (${val}): ${i}`),
      take(5)
    )
  )
);
const example01$ = source00$.pipe(
  map(val => interval(500).pipe(
		map(i => interval(500).pipe(
			map(() => `Result: ${val} - ${i}`),
			take(3)
		)),
		concatAll(), // To subscribe to the inner observable
		take(5)
	))
);

//source01$.pipe(concatAll()).subscribe(console.log);
//source01$.pipe(combineAll()).subscribe(console.log);

//example00$.pipe(concatAll()).subscribe(console.log);
//example00$.pipe(combineAll()).subscribe(console.log);

//example01$.pipe(concatAll()).subscribe(console.log);
example01$.pipe(combineAll()).subscribe(console.log);
