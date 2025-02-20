/*
	desc-00: In RxJs give some code examples for generate().
	desc-00a: rxjs-generate
	desc-01: Generating Random Numbers within a Range
	desc-02: Example 3: Generating an Observable that Emits an Increasing Value Every Second
	desc-03: 3. Generating an Observable that Repeats a Value a Specified Number of Times
	desc-04: 4. Generating an Observable that Emits Values from an Array in Reverse Order
	goal:
	line-code-added:
*/

const { generate, of, timer, throwError, asyncScheduler } = require('rxjs');
const { map, filter, delay, mergeMap, catchError } = require('rxjs/operators');

// desc-01
const source00$ = generate(
	0,
	_ => true,
	_ => _,
	_ => Math.floor(Math.random() * 10) + 1
);
//source00$.subscribe(console.log);

// desc-02
const source01$ = generate(
	0,
	i => i < 10,
	i => i + 1,
	i => i,
	asyncScheduler
);
//source01$.subscribe(console.log);

// desc-02a
const source01a$ = generate(
	0,
	i => i < 10,
	i => i + 1,
	i => i % 2 ? i : null
).pipe(
	filter(i => i)
);
//source01a$.subscribe(console.log);

// desc-03
const source02$ = generate(
	0,
	i => i < 5,
	i => i + 1,
	_ => 'Hello'
);
//source02$.subscribe(console.log);

// desc-04
const source03$ = generate(
	10,
	i => i > 0,
	i => i - 1,
	i => i,
);
source03$.subscribe(console.log);
