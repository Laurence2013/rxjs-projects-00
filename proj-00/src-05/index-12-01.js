/*
	desc-00: In RxJs what operators are suitable for doing state management?
	desc-00a: rxjs-mergescan, state-management
	desc-01: Give another code example with only simulating API requests.
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip, concat } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, mergeScan } = require('rxjs/operators');

const initState = {items: [], loading: false};
const simApiReq00$ = id => of({id, name: `Item id: ${id}`}).pipe(delay(500));
const source00$ = of([1,2,3,4,5,6,7,8,9]);

const result00e$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [data00],
				loading: false
			}))
		);
	}, initState),
);
const result00$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [...state.items, data00],
				loading: false
			}))
		);
	}, initState),
);
const test00$ = concat(result00e$, result00$);

const result00a$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [state.items, data00],
				loading: false
			}))
		);
	}, initState),
);
const result00b$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [...state.items, data00],
				loading: false,
				loadin2: 'Testing'
			}))
		);
	}, initState),
);
const result00c$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [...state.items, data00],
				loading: false
			}))
		);
	}, initState),
);
const result00d$ = source00$.pipe(
	flatMap(data00 => data00),
	reduce((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [...state.items, data00],
				loading: false
			}))
		);
	}, initState),
);
const result00f$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: data00,
				loading: false
			}))
		);
	}, initState),
);
const result00g$ = source00$.pipe(
	flatMap(data00 => data00),
	mergeScan((state, id) => {
		const loadingState = {...state, loading: true};
		return simApiReq00$(id).pipe(
			map(data00 => ({
				loadingState,
				items: [...state.items],
				//items: ...state.items,
				//items: state.items,
				loading: false
			}))
		);
	}, initState),
);
result00e$.subscribe(console.log);
