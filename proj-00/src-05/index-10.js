/*
	desc-00: In RxJs explain in detail mergeMap() operator
	desc-00a: rxjs-mergemap
	desc-01: Example:
	desc-02: 1. Handling Multiple HTTP Requests
	desc-03: 3. Combining Data from Multiple Observables
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap } = require('rxjs/operators');

// desc-01
const source00$ = of([1,2,3,4,5,6,7,8,9]);
const result00$ = source00$.pipe(
	mergeMap(value00 => of(`Values from inner observable: ${value00}`).pipe(
		delay(1000)
	))
);
const result00a$ = source00$.pipe(
	flatMap(data01 => data01),
	mergeMap(value00 => of(`Values from inner observable: ${value00}`).pipe(
		delay(1000)
	)),
);
const result00b$ = source00$.pipe(
	flatMap(data01 => of(data01).pipe(
		mergeMap(value00 => of(`Values from inner observable: ${value00}`).pipe(
			delay(1000)
		)),
	))
);
result00$.subscribe(console.log);

// desc-02
const source01$ = of([1,2,3,4,5,6,7,8,9]);
const userDetails00$ = id => of({id, name: `User ${id}`});
const result01$ = source01$.pipe(
	mergeMap(data00 => of(data00).pipe(
		//mergeMap(data01 => data01.map(data02 => userDetails00$(data02))),
		switchMap(data01 => data01.map(data02 => userDetails00$(data02))),
		combineAll(),
	)),
	delay(1000)
);
const result02$ = source01$.pipe(
	mergeMap(data00 => userDetails00$(data00)),
	delay(1000)
);
const result02a$ = source01$.pipe(
	mergeMap(data00 => data00),
	mergeMap(data01 => userDetails00$(data01)),
	delay(1000)
);
//result02a$.subscribe(console.log);

// desc-03
const user$ = of({id: 1, name: 'Alice'},{id: 2, name: 'Carl'});
const address$ = of({city: 'New York', zipCode: '10001'},{city: 'Birmingham', zipCode: '1002'});

const result03$ = user$.pipe(
	mergeMap((data00, index) => zip(of(data00), of(address$).pipe(
		//concatMap(data01 => data01)
		mergeMap(data01 => data01)
	))),
	delay(1000)
);
const result03a$ = user$.pipe(
	mergeMap(data00 => of(data00)),
	mergeMap(_ => address$.pipe(
		map(data01 => data01),
		take(2) // Doesn't work
	)),
	delay(1000)
);
const result03b$ = user$.pipe(
	mergeMap(data00 => [of(data00), address$.pipe(map(data01 => data01))]),
	combineAll(),
	take(1)
);
const result03c$ = user$.pipe(
	mergeMap((data00, indx00) => zip(of(data00), address$.pipe(
		map(data01 => Object.entries(data01).map(data02 => data02[indx00])),
	))),
	delay(1000)
);
const result03d$ = user$.pipe(
	mergeMap((data00, indx00) => address$.pipe(
		mergeMap((data01, indx01) => of(data01).pipe(
			map(data02 => Object.values(data02)[indx00])
		)),
		delay(1000)
	))
);
const result03e$ = user$.pipe(
	mergeMap((data00, indx00) => address$.pipe(
		map((data01, indx01) => data01)
	))
);
const result04$ = user$.pipe(
	mergeMap(data00 => combineLatest(of(data00), of(address$)).pipe(
		map(([user, address]) => ({...user, ...address})),
	))
);
const result04a$ = user$.pipe(
	mergeMap((data00, indx00) => zip(of(data00), address$.pipe(
		map(data01 => Object.values(data01)[indx00])
	)))
);
const result05$ = zip(user$, address$);
const result05a$ = combineLatest(user$, address$);
//result05a$.subscribe(console.log);
