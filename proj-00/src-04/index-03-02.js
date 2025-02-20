/*
	desc-00: In RxJs what is distinctUntilChanged()?
	desc-00a: rxjs-distinctUntilChanged
	desc-01: Example 2: Custom Comparison Function (Objects)
	desc-02: Example 3: Key Selector Function
	desc-03: Example 1: Nested Objects with Custom Comparison
	desc-04: Example 2: Stream of Arrays with Custom Comparison
	desc-05: Example 3: Combining with Other Operators
	desc-06: Example 4: Complex Objects with Deep Comparison
	desc-07: Example 5: Distinct Until Changed with Key Selector
	desc-08: Example 6: Combining with scan for State Management
	goal:
	line-code-added:
*/
const { interval, of, from } = require('rxjs');
const { tap, map, scan, reduce, delay, flatMap, mergeMap, switchMap, distinctUntilChanged } = require('rxjs/operators');

// desc-01
const source00$ = of(
  { id: 1, name: 'Alice' },
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
);
const result00$ = source00$.pipe(
	distinctUntilChanged((prev, next) => prev.name === next.name)
);
// result00$.subscribe(console.log);

// desc-02
const source01$ = of(
  { id: 1, name: 'Alice' },
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
);
const result01$ = source01$.pipe(
	distinctUntilChanged((prev, next) => prev === next, obj => obj.id)
);
// result01$.subscribe(console.log);

// desc-03
const source02$ = of(
  { user: { id: 1, name: 'Alice' } },
  { user: { id: 1, name: 'Alice' } },
  { user: { id: 2, name: 'Bob' } },
  { user: { id: 2, name: 'Bob' } },
  { user: { id: 3, name: 'Charlie' } }
);
const result02$ = source02$.pipe(
	map(user => user.user),
	distinctUntilChanged((prev, next) => prev.id === next.id)
);
const result02a$ = source02$.pipe(
	distinctUntilChanged((prev, next) => prev.user.id === next.user.id )
);
// result02a$.subscribe(console.log);

// desc-04
const source03$ = of(
  [1, 2, 3],
  [1, 2, 3],
  [4, 5, 6],
  [4, 5, 6],
  [7, 8, 9]
);
const result03$ = source03$.pipe(distinctUntilChanged((prev, next) => prev[0] === next[0]));
const result03a$ = source03$.pipe(distinctUntilChanged((prev, next) => JSON.stringify(prev) === JSON.stringify(next)));

const result04$ = source03$.pipe(map(([one, two, three]) => three)); // trying to add array destructuring
// result03a$.subscribe(console.log);

// desc-05
const simAPI00$ = id => of({id, name: `User ${id}`});
const source04$ = interval(1000);
const result05$ = source04$.pipe(
	map(val99 => [val99, Math.random() * (100 * val99)]),
	switchMap(([val98, duration]) => simAPI00$(val98).pipe(delay(duration)))
)
// result05$.subscribe(console.log);

// desc-06
const source05$ = of(
  { user: { id: 1, profile: { name: 'Alice', age: 25 } } },
  { user: { id: 1, profile: { name: 'Alice', age: 25 } } },
  { user: { id: 2, profile: { name: 'Bob', age: 30 } } },
  { user: { id: 2, profile: { name: 'Bob', age: 30 } } },
  { user: { id: 3, profile: { name: 'Charlie', age: 35 } } }
);
const result06$ = source05$.pipe(
	distinctUntilChanged((prev, next) => prev.user.id === next.user.id)
);
// result06$.subscribe(console.log);

// desc-07
const source06$ = of(
  { id: 1, details: { name: 'Alice', role: 'Admin' } },
  { id: 1, details: { name: 'Alice', role: 'Admin' } },
  { id: 2, details: { name: 'Bob', role: 'User' } },
  { id: 2, details: { name: 'Bob', role: 'User' } },
  { id: 3, details: { name: 'Charlie', role: 'Manager' } }
);
const result07$ = source06$.pipe(
	distinctUntilChanged(
		(prev, next) => prev === next, 
		obj => obj.details.role)
);
// result07$.subscribe(console.log);

// desc-08
const source08$ = of(
  { type: 'INCREMENT', value: 1 },
  { type: 'INCREMENT', value: 1 },
  { type: 'DECREMENT', value: 1 },
  { type: 'INCREMENT', value: 2 },
  { type: 'DECREMENT', value: 1 }
);
const result08$ = source08$.pipe(
	scan((acc, curr) => {
		//...
		return acc;
	}, {})
);
result08$.subscribe(console.log);
