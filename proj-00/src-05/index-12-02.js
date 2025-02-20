/*
	desc-00: In RxJs what operators are suitable for doing state management?
	desc-00a: rxjs-mergescan, state-management
	desc-01: Give code examples when there are two 'initialState'
	desc-01a: Example: Separate "Shopping Cart" and "User Profile" State
	desc-02: Example 2: Fetching Data Sequentially and Accumulating Results
	desc-03: Example 1: Accumulating Results from Asynchronous API Calls
	desc-04: Example 2: Accumulating Results with Dynamic Merging
	desc-05: Example 3: Accumulating Results with Object Merging
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, concat, merge } = require('rxjs');
const { tap, map, take, reduce, filter, delay, takeLast, flatMap, mergeMap, switchMap, concatMap, mergeScan } = require('rxjs/operators');

// desc-01a
const shopCart00 = id => {return {id, items: [], status00: ''}};
const shopCart01 = id => ({id, items: [], status00: ''});
const userProfile$ = id => of({id, isLoggedIn: true});
const shopStatus00$ = id => of({id, status01: 'ADDED'});

const result00$ = merge(userProfile$(1), shopStatus00$(1)).pipe(
	mergeScan((acc, curr) => {
		if(curr.isLoggedIn === true){ acc.items = [1,2,3,4,5] };
		if(curr.status01 === 'ADDED'){ acc.status00 = 'Checkpoint' };
		return of(acc);
	}, shopCart01(1))
);
// result00$.pipe(takeLast(1)).subscribe(console.log);

// desc-02
const source00$ = of(1,2,3);
const result01$ = source00$.pipe(
	mergeScan((acc, curr) => {
		//return of([...acc, curr])
		//return of([...acc, 99, 98])
		//return of([curr, ...acc])
		return of([curr, ...acc, 99])
	}, [])
);
// result01$.subscribe(console.log);

// desc-03
const fakeApiCall00$ = offset => of({
	items: [offset, offset + 1, offset + 2],
	nextOffset: offset + 3
}).pipe(delay(1000));
const fakeApiCall01$ = offset => of({
	items: [offset, offset + 1, offset + 2],
	nextOffset: [offset + 3]
}).pipe(delay(1000));

const result99$ = interval(1000).pipe(
	mergeScan((acc, curr) => fakeApiCall00$(curr).pipe(map(dt99 => dt99.items)), 0),
	map(dt98 => dt98),
	take(3)
);
const result99a$ = interval(1000).pipe(
	mergeScan((acc, curr) => fakeApiCall00$(curr).pipe(map(dt99 => dt99.items)), []),
	map(dt98 => dt98),
	take(3)
);
const result98$ = interval(1000).pipe(
	mergeScan((acc, curr) => fakeApiCall00$(curr).pipe(
		switchMap(dt99 => of({
			items: [acc.items, dt99.items],
			nextOffset: dt99.nextOffset
		}))
	), {items: [], nextOffset: 0}),
	map(dt98 => dt98.items),
	take(3)
);
const result98a$ = interval(1000).pipe(
	mergeScan((acc, curr) => fakeApiCall00$(curr).pipe(
		switchMap(dt99 => of({
			items: [...acc.items, ...dt99.items],
			nextOffset: dt99.nextOffset
		}))
	), {items: [], nextOffset: 0}),
	map(dt98 => dt98.items),
	take(3)
);
const result98b$ = interval(1000).pipe(
	mergeScan((acc, curr) => fakeApiCall01$(curr).pipe(
		switchMap(dt99 => of({
			items: [...acc.items, ...dt99.items],
			nextOffset: [...dt99.nextOffset]
		}))
	), {items: [], nextOffset: []}),
	map(dt98 => dt98),
	take(3)
);
// result98a$.subscribe(console.log);

// desc-04
const source99$ = interval(1000).pipe(
	map(i => [i, i + 1, i + 2]),
	take(3)
);
const source98$ = interval(1500).pipe(
	map(i => [i * 10, i * 10 + 1]),
	take(2)
);
const result97$ = source99$.pipe(
	mergeScan((acc, curr) => source98$.pipe(
		map(val99 => [...acc, ...curr, ...val99])
	), []),
);
// result97$.subscribe(console.log);

// desc-05
const source97$ = interval(1000).pipe(
	map(i => ({ a: i, b: i + 1 })),   
	take(3) 
); 
const source96$ = interval(1500).pipe(   
	map(i => ({ c: i * 10, d: i * 10 + 1 })),   
	take(2) 
);
const result96$ = source97$.pipe(
	mergeScan((acc, curr) => source96$.pipe(
		map(val99 => [...acc, curr.a, curr.b, val99.c, val99.d])
	), [])
);
const result96a$ = source97$.pipe(
	mergeScan((acc, curr) => source96$.pipe(
		map(val99 => [...acc, curr, val99])
	), [])
);
result96$.subscribe(console.log);
