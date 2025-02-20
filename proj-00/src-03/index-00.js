/*
	desc-00: Give some code examples using share(). In Javascript not Typescript
	desc-00a: rxjs-share, multicasting
	desc-01: Basic Example: Sharing an Interval
	desc-02: Absolutely, let's demonstrate how share() can be used with simulated HTTP requests to illustrate its benefits
	desc-03: Sharing Cold Observables
	desc-04: 1. Combining with other operators
	desc-05: 2. share() with concatMap
	goal:
	line-code-added:
*/

const { generate, of, from, timer, interval, combineLatest } = require('rxjs');
const { map, filter, delay, mergeMap, concatMap, scan, share, tap, withLatestFrom, startWith } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000).pipe(
	tap(value => console.log('Processing:', value)),
	share()
);
//source00$.subscribe(value => console.log('Subscriber 1:', value));
//setTimeout(() => source00$.subscribe(value => console.log('Subscriber 2:', value)), 8000)

// desc-02
const source01$ = () => timer(2000).pipe(
	tap(_ => console.log('Simulating network requests...')),
	map(_ => ({data: 'Simulated response data'}))
);
const data$ = source01$().pipe(share());
//data$.subscribe(res => console.log('Subscriber 1:', res));
//setTimeout(() => data$.subscribe(res => console.log('Subscriber 2:', res)), 5000)

// desc-03
const source02$ = of([1,2,3,4,5]).pipe(share());
//source02$.subscribe(val => console.log('Subscriber 1:', val));
//setTimeout(() => source02$.subscribe(val => console.log('Subscriber 2:', val)), 5000)

// desc-04
const source03$ = interval(1000).pipe(share());
const source04$ = timer(2000).pipe(
	map(_ => 'Hello World'),
	share()
);
const result00$ = combineLatest(
	source03$.pipe(map(time => `Time 1: ${time}`)),
	source04$.pipe(map(time => `Time 2: ${time}`))
);
const result00a$ = combineLatest(
	source03$.pipe(map(time => `Time 1: ${time}`)),
	source04$.pipe(map(time => `Time 2: ${time}`))
).pipe(
	withLatestFrom(source03$.pipe(startWith(100))),
	map(([combined, time]) => `${combined} (at time ${time})`)
)
const result00b$ = combineLatest(
	source03$.pipe(map(time => `Time 1: ${time}`)),
	source04$.pipe(map(time => `Time 2: ${time}`))
).pipe(
	map(combined => combined)
)
const result00c$ = combineLatest(
	source03$.pipe(map(time => `Time 1: ${time}`)),
	source04$.pipe(map(time => `Time 2: ${time}`))
).pipe(
	map(([combined, index]) => `${combined} -> ${index}`)
)
const result00d$ = combineLatest(
	source03$.pipe(map(time => `Time 1: ${time}`)),
	source04$.pipe(map(time => `Time 2: ${time}`))
).pipe(
	withLatestFrom(source03$.pipe(startWith(100))),
	map(([combined, index]) => `${combined} -> ${index}`)
)
result00a$.subscribe(console.log);

// desc-05
const source05$ = from(['A','B','C','D','E']).pipe(share());
const result02$ = source05$.pipe(
	concatMap(value => of([value, 2]).pipe(delay(1000)))
)
//result02$.subscribe(console.log);
//setTimeout(() => result02$.subscribe(console.log), 3000);
