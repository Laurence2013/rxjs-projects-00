/*
	desc-00: In RxJs how does generate() work?
	desc-00a: rxjs-generate
	desc-01: Example 1: Fibonacci Sequence
	desc-02: Simulating Asynchronous Tasks with Timeouts
	desc-03: Error Handling with generate()
	desc-04: Example 1: Basic Name Extraction
	goal:
	line-code-added:
*/

const { generate, of, timer, throwError } = require('rxjs');
const { map, filter, delay, mergeMap, catchError } = require('rxjs/operators');

// desc-01
const source00$ = generate(
	[0, 1],
	([a, b]) => b < 100,
	([a, b]) => [b, a + b],
	([a, b]) => a
);
const source01$ = generate(
	[0, 1],
	(state) => state[1] < 100,
	(state) => [state[1], state[0] + state[1]],
	(state) => state[0]
);
//source01$.pipe(delay(1000)).subscribe(console.log);

// desc-02
const taskDuration = [1000, 2000, 3000];

const source03$ = generate(
	0, 
	i => i < taskDuration.length,
	i => i + 1,
	i => taskDuration[i]
).pipe(
	mergeMap(duration => timer(duration).pipe(
		map(() => `Task completed after ${duration}ms`)
	))
);
//source03$.subscribe(console.log);

// desc-03
const source04$ = generate(
	0,
	x => x < 10,
	x => x + 1,
	x => {
		if(x === 7){ throw new Error('Something went wrong!') };
		return x;
	}
).pipe(
	catchError(err => {
		console.log('Error: ', err);
		return throwError(() => new Error('Recovered from error'))
	})
);
/*source04$.subscribe({
	next: console.log,
	error: err => console.error('Final Error: ', err)
})*/

// desc-04
const array1 = [{ name: 'Alice' }, { name: 'Bob' }];
const array2 = [{ name: 'Charlie' }, { name: 'David' }];

const source05$ = generate(
	0,
	x => x < array1.length + array2.length,
	x => x + 1,
	x => array1[x] && array2[x] ? array1[x].name + ' - ' + array2[x].name : null
).pipe(
	filter(data => data != null)
);
const source05a$ = generate(
	0,
	x => x < array1.length + array2.length,
	x => x + 1,
  x => x < array1.length ? array1[x].name : array2[x - array2.length].name
)
source05a$.subscribe(console.log)
