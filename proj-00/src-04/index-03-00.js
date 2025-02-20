/*
	desc-00: In RxJs what is distinct()? In RxJs what is distinctUntilChanged()? In RxJs what is distinctUntilKeyChanged()?
	desc-00a: rxjs-distinct, rxjs-distinctUntilChanged, rxjs-distinctUntilKeyChanged
	desc-01: Example 5: Distinct with Asynchronous API Calls
	desc-02: Example 6: Distinct with Nested Observables
	desc-03: Example 1: Distinct with Array Destructuring in a Stream of Arrays
	desc-04: Example 2: Distinct with Array Destructuring and Nested Arrays
	desc-05: Example 3: Distinct with Array Destructuring and Asynchronous Streams
	desc-06: Example 4: Distinct with Array Destructuring and Custom Objects
	desc-07: Example 5: Distinct with Array Destructuring and Flush Observable
	goal:
	line-code-added:
*/
const { interval, of, from } = require('rxjs');
const { tap, map, take, delay, flatMap, mergeMap, switchMap, distinct, distinctUntilChanged, distinctUntilKeyChanged } = require('rxjs/operators');

// desc-01
const simApiCall00$ = userId => of({id : userId, name: `User ${userId}`}).pipe(delay(500));
const userIds00$ = interval(1000).pipe(
	take(10),
	map(val99 => val99 % 3 + 1)
);
const result00$ = userIds00$.pipe(
	switchMap(val99 => simApiCall00$(val99)),
	distinct(val98 => val98.id)
);
// result00$.subscribe(console.log);

// desc-02
const orders = [
  { id: 1, items: ['Apple', 'Banana'] },
  { id: 2, items: ['Orange', 'Banana'] },
  { id: 3, items: ['Apple', 'Grapes'] },
  { id: 4, items: ['Banana', 'Orange'] } 
];
const results01$ = of(...orders).pipe(
	flatMap(items99 => items99.items),
	distinct(items98 => items98)
);
const results01a$ = of(...orders).pipe(
	mergeMap(items99 => items99.items),
	distinct()
);
// results01a$.subscribe(console.log);

// desc-03
const source02$ = of(
  [1, 'Apple'],
  [2, 'Banana'],
  [1, 'Apple'], 
  [3, 'Orange'],
  [2, 'Banana']
);
const results02$ = source02$.pipe(
	distinct(([id, fruits]) => fruits)
);
// results02$.subscribe(console.log);

// desc-04
const source03$ = of(
  [[1, 'Alice'], 'New York'],
  [[2, 'Bob'], 'Los Angeles'],
  [[1, 'Alice'], 'Chicago'], 
  [[3, 'Charlie'], 'San Francisco']
);
const results03$ = source03$.pipe(
	map(([arr99, city]) => arr99),
	distinct(([id, name]) => id)
);
const results03a$ = source03$.pipe(
	distinct(([[id, name], city]) => id)
);
// results03a$.subscribe(console.log);

// desc-05
const source04$ = interval(500).pipe(
  take(6), 
  map(value => [value % 3, `Item ${value}`])
);
const results04$ = source04$.pipe(
	distinct(([val99, itm99]) => val99)
);
// results04$.subscribe(console.log);

// desc-06
const source05$ = of(
  [{ id: 1, name: 'Alice' }, 'Admin'],
  [{ id: 2, name: 'Bob' }, 'User'],
  [{ id: 1, name: 'Alice' }, 'Editor'],
  [{ id: 3, name: 'Charlie' }, 'User']
);
const results05$ = source05$.pipe(
	distinct(([obj, type]) => obj.id)
);
// results05$.subscribe(console.log);

// desc-07
const source06$ = of(
  [1, 'Apple'],
  [2, 'Banana'],
  [1, 'Apple'],
  [3, 'Orange'],
  [2, 'Banana'] 
);
const flushes$ = interval(2000);
const results06$ = source06$.pipe(
	distinct(([id, fruits]) => id, flushes$)
);
results06$.subscribe(console.log);
