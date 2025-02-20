/*
	desc-00: In RxJs give code examples using zip() with creation operators
	desc-00a: rxjs-zip
	desc-01: Example 1: Nested Zipping
	desc-02: Example 2: Zipping with Different Lengths
	desc-03: Example 3: Multiple Zips in Parallel
	desc-04: My own example, using both interval() and zip() operators
	desc-05: Just a quick revision on combineAll()
	goal:
	line-code-added:
*/

// desc-01
const { of, interval, zip, forkJoin, concat } = require('rxjs');
const { map, take, combineAll } = require('rxjs/operators');

const source00$ = of('Alice', 'Bob', 'Carol');
const source01$ = of(25, 30, 45);
const source03$ = interval(1000).pipe(take(3));

const result00$ = zip(source00$, source01$).pipe(
	map(([source00, source01]) => ({source_1: source00, source_2: source01}))
);
const result01$ = zip(result00$, source03$);
//result01$.subscribe(console.log);

// desc-02
const source04$ = of('Alice', 'Bob', 'Carol');
const source05$ = of(24, 54);
const source06$ = of('New York', 'London');
//const result02$ = zip(source04$, source05$, source06$).subscribe(console.log);

// desc-03
const source07$ = of('Alice', 'Bob', 'Carol');
const source07a$ = of('Alice', 'Bob');
const source08$ = of(25, 30, 45);
const source09$ = of('New York', 'London', 'Tokyo');
const source10$ = interval(1000).pipe(take(6));

const nameAge$ = zip(source07$, source08$);
const nameCity$ = zip(source07$, source09$);

const result03$ = forkJoin(nameAge$, nameCity$);
const result04$ = concat(nameAge$, nameCity$);
const result05$ = zip(result04$, source10$);
//result05$.subscribe(console.log);

// desc-04
const source11$ = interval(1000);
const result06$ = zip(source11$, source07$);
//result06$.subscribe(console.log);

// desc-05
const source12$ = interval(1000).pipe(take(3));
const result07$ = source12$.pipe(
	map(i => interval(1000).pipe(
		map(val => `Results: ${i} - ${val}`),
		take(5)
	))
);
result07$.pipe(combineAll()).subscribe(console.log);
