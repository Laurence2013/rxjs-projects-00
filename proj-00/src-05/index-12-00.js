/*
	desc-00: In RxJs, how does mergeScan() operator, works with State Management?
	desc-00a: rxjs-mergescan
	desc-01: Example:
	desc-02: 3.  Combining multiple data sources:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip, concat } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, mergeScan } = require('rxjs/operators');

// desc-01
const initState00 = {count: 0, data: null};
const source00$ = of([1,2,3,4,5,6,7,8,9]).pipe(delay(1000));
const result00$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, curr) => {
		return of({
			count: state.count + curr,
			data: {id: curr}
		})
	}, initState00)
);
const result00c$ = source00$.pipe( //This is just a copy of result00$ to test result01$ concat() to see if they are independent.
	flatMap(data00 => data00),
	mergeScan((state, curr) => {
		return of({
			count: state.count + curr,
			data: {id: curr}
		})
	}, initState00)
);
const result01$ = concat(result00$, result00c$);

const result00a$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, curr) => {
		return of({
			count: state =+ curr,
			data: {id: curr}
		})
	}, {})
);
const result00b$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, curr) => {
		state['count'] =+ curr;
		return of({
			count: state.count + curr,
			data: {id: curr}
		})
	}, {})
);
result01$.subscribe(console.log);

// desc-02
const initState01 = { userData: null, productData: null };
const source01$ = of([1,2,3,4,5,6,7,8,9]).pipe(delay(1000));

const userData00$ = id => of({id, data: `This is User: ${id}`});
const userData01$ = id => {
	return id === 2 || id === 4 || id === 5 ? of({id, data: `This is User: ${id}`}) : of('User NOT found');
};
const test00$ = source01$.pipe(
	mergeScan((_, id) => {
		return userData00$(id)
	}, userData00$)
);
const test00a$ = source01$.pipe(
	mergeScan((_, id) => {
		return userData00$(id).pipe(
			map(data => [data.id, data.data])
		)
	}, userData00$)
);
const test00b$ = source01$.pipe(
	mergeScan((acc, id) => {
		acc['id'] = userData00$(id).pipe(map(
			data00 => data00.id
		))
		return acc.id;
	}, {})
);
const test01$ = source01$.pipe(
	map(id00 => userData00$(id00)),
	combineAll()
);
const test01a$ = source01$.pipe(
	flatMap(data01 => data01),
	concatMap(id00 => userData00$(id00).pipe(
		map(data00 => ([data00.id, data00.data]))
	))
);
const test01aa$ = source01$.pipe(
	flatMap(data01 => data01),
	map(id00 => userData00$(id00).pipe(
		map(data00 => ([data00.id, data00.data]))
	)),
	combineAll()
);
const test02$ = source01$.pipe(
	map(data00 => userData00$(data00).pipe(
		map(data01 => data01.id),
	)),
	combineAll()
);
const test02a$ = source01$.pipe(
	map(data00 => userData00$(data00)),
	combineAll()
);
//test00$.subscribe(console.log);
