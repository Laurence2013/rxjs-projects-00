/*
	desc-00: In RxJs explain in great detail groupBy() operator
	desc-00a: rxjs-groupBy
	desc-01: 1. Grouping objects by property:
	desc-02: Example 1: Dynamic grouping based on time intervals
	desc-03: Example 2: Grouping with a custom comparer function
	desc-04: Example 3: Grouping with a duration selector
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, takeUntil, flatMap, groupBy, toArray, mergeMap, concatMap } = require('rxjs/operators');

// desc-01
const people$ = from([
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'Los Angeles' },
  { name: 'Charlie', age: 30, city: 'Chicago' },
  { name: 'David', age: 25, city: 'New York' },
]);
const result98$ = people$.pipe(
	groupBy(grp99 => grp99.city),
);
const result99$ = people$.pipe(
	groupBy(grp99 => grp99.city),
	mergeMap(grp98 => grp98.pipe(
		concatMap(grp97 => of({age: grp98.key, ...grp97}))) //concatMap() or mergeMap()
	)
);
// result98$.subscribe(console.log);

// desc-02
const logEntries$ = of(
  { timestamp: 1000, message: 'Event A' },
  { timestamp: 1500, message: 'Event B' },
  { timestamp: 2100, message: 'Event C' },
  { timestamp: 3200, message: 'Event D' },
  { timestamp: 3800, message: 'Event E' }
);
const customRound = number => 1000 * Math.round(number / 1000);

const result97$ = logEntries$.pipe(
	//groupBy(grp99 => Math.floor(grp99.timestamp / 2000)),
	map(grp99 => Math.floor(grp99.timestamp / 2000)),
);
const result96$ = logEntries$.pipe(
	groupBy(grp99 => Math.floor(grp99.timestamp / 2000)),
	mergeMap(grp98 => grp98.pipe(
		toArray(),
		map(grp97 => ({intervalStart: grp98.key, grp97}))
	))
);
const result95$ = logEntries$.pipe(
	groupBy(grp99 => customRound(grp99.timestamp)),
	mergeMap(grp98 => grp98.pipe(
		toArray(),
		map(grp97 => ({intervalStart: grp98.key, grp97}))
	))
);
// result95$.subscribe(console.log);

// desc-03
const values$ = of(
  { id: 1, value: 'apple' },
  { id: 2, value: 'Apple' },
  { id: 3, value: 'banana' },
  { id: 4, value: 'Banana' }
);
const result94$ = values$.pipe(
	groupBy(grp99 => grp99.value.toLowerCase()),
	mergeMap(grp98 => grp98.pipe(
		toArray()
	))
)
const result94a$ = values$.pipe( // Not working
	groupBy(grp99 => 
		grp99.value.toLowerCase(),
		(a, b) => a.id === b.id
	),
	mergeMap(grp98 => grp98.pipe(
		toArray()
	))
)
// result94$.subscribe(console.log);

// desc-04
const userActivities$ = of( // The example given by Gemini doesn't work because the code is wrong!
  { userId: 1, action: 'login' },
  { userId: 2, action: 'login' },
  { userId: 1, action: 'view product' },
  { userId: 2, action: 'add to cart' },
  { userId: 1, action: 'logout' }
);
const result93$ = userActivities$.pipe(
	groupBy(grp99 => grp99.userId),
	mergeMap(grp97 => grp97.pipe(
		reduce((acc, curr) => {
			acc.push(grp97.key);
			return acc
		}, [])
	))
);
result93$.subscribe(console.log);
