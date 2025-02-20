/*
	desc-00: Give some RxJs code examples for combineAll(), interval() and inner intervals, using scenarios and examples. Tag(s) rxjs-combineall, rxjs-interval
	desc-01: Example 5: Combining with SwitchMap
	desc-02: Example 2: Simulating API Calls with switchMap()
	goal:
	line-code-added:
*/

// desc-01
const { interval, of, from } = require('rxjs');
const { switchMap, take, map, combineAll, delay } = require('rxjs/operators');

const source00$ = of('A','B');
const result00$ = source00$.pipe(
	map(val => interval(1000).pipe(
		map(i => `Result ${val} - ${i}`),
		take(3)
	)),
	combineAll()
);
//result00$.subscribe(console.log);

// desc-02
function fetchUserDetails(userId){
	const mockUserDetails = {
		1: { name: 'Alice', email: 'alice@example.com' },
    2: { name: 'Bob', email: 'bob@example.com' },
    3: { name: 'Charlie', email: 'charlie@example.com' }
	};
	return of(mockUserDetails[userId]).pipe(delay(1000));
}

const userIds00$ = of(1,2,3);
const userIds01$ = from([1,2,3]);
const result01$ = userIds00$.pipe(
	switchMap(val => fetchUserDetails(val)),
	combineAll()
);
const result02$ = userIds00$.pipe(
	map(val => fetchUserDetails(val)),
	combineAll()
);
result02$.subscribe(console.log);

