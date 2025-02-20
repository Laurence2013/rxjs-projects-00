/*
	desc-00: In RxJs explain in detail mergeMap() operator. Tag(s) rxjs-mergemap
	goal:
	desc-01: Give code examples of processing multiple request concurrently using mergeMap() operator.
	desc-02: DeepSeek -> Example 5: Combining Results with resultSelector
	desc-03: DeepSeek -> Example 5.2: Combining Outer and Inner Values with Index
	desc-04: DeepSeek -> Example 5.6: Combining Outer and Inner Values with Asynchronous Logic
	desc-05: DeepSeek -> Example 2: Parallel API Requests with Limited Concurrency
	desc-06: DeepSeek -> Example 3: Combining Results from Multiple Observables
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap } = require('rxjs/operators');

// desc-01
const source00$ = from([1,2,3,4,5,6,7,8,9]);
const result00$ = source00$.pipe(
	mergeMap(userId => {
		const randomDelay = Math.floor(Math.random() * 2000) + 500;
		return of(`User details for ${userId}`).pipe(delay(randomDelay));
	})
);
const result01$ = source00$.pipe(
	concatMap(userId => {
		const randomDelay = Math.floor(Math.random() * 2000) + 500; // Simulate an API call with a random delay
		return of(`User details for ${userId}`).pipe(delay(randomDelay));
	})
);
// result00$.subscribe(console.log);

// desc-02
const fetchUserDetails00$ = userId => of({id: 'not showing up for userId', name: `User ${userId}`});
const source01$ = of(1,2,3,4,5);
const result02$ = source01$.pipe(
	mergeMap(dt99 => 
		fetchUserDetails$00(dt99),
		((outerValue, innerValue) => `Outer: ${outerValue}, Inner: ${innerValue.name}`)
	)
);
// result02$.subscribe(console.log);

// desc-03
const fetchUserDetails01$ = userId => of({id: userId, name: `User ${userId}`});
const source02$ = of(1,2,3,4,5);
const result03$ = source02$.pipe(
	mergeMap(dt99 => 
		fetchUserDetails01$(dt99),
		((outerVal, innerVal, outerIdx) => `Index: ${outerIdx}, User ID: ${outerVal}, Name: ${innerVal.name}`) 
	)
);
// result03$.subscribe(console.log);

// desc-04
const fetchUserDetails02$ = userId => of({id: userId, name: `User ${userId}`});
const source03$ = of(1,2,3,4,5);
const result04$ = source03$.pipe(
	mergeMap(dt99 => 
		fetchUserDetails02$(dt99),
		((outrVal, innrVal, outrIdx) => 
			new Promise(res => setTimeout(_ => res(`Index: ${outrIdx}, User ID: ${outrVal}, Name: ${innrVal.name}`), Math.random(innrVal / 1000))))),
	mergeMap(dt99 => from(dt99).pipe(delay(2000)))
);
// result04$.subscribe(console.log);

// desc-05
const fetchData00$ = id => of(`Data for ID ${id}`).pipe(delay(2000));
const source04$ = of(1,2,3,4,5,6,7,8,9);
const result05$ = source04$.pipe(
	mergeMap(dt99 => fetchData00$(dt99), 3),
	map((dt98, idx99) => dt98)
);
// result05$.subscribe(console.log);

// desc-06
const source05$ = of(1,2,3,4,5);
const source06$ = of(10,11,12,13,14);
const result06$ = source05$.pipe(
	concatMap(val99 => source06$.pipe(
		map(val98 => `Outer Val: ${val99} - Inner Val: ${val98}`)
	))
);
result06$.subscribe(console.log);
