/*
	desc-00: In RxJs explain in great detail groupBy() operator
	desc-00a: rxjs-groupBy
	desc-01: Example:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, groupBy, toArray, mergeMap, concatMap, switchMap } = require('rxjs/operators');

// desc-01, It feels like there are a lot of obvious stating, look at all the mergeMap() operators, 
const source00$ = of([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
const source00_00$ = from([
	{'odd':1, 'even':2}, 
	{'odd':3, 'even':4}, 
	{'odd':5, 'even':2}, 
	{'odd':7, 'even':2}, 
	{'odd':9, 'even':4}, 
	{'odd':11, 'even':4}
]);
const source01$ = of([1,2,3],[4,5,6],[7,8,9],[10,11,12],[13,14,15],[16,17,18]);
const result00$ = source00$.pipe(
	groupBy(num00 => num00 % 2 === 0 ? 'even' : 'odd'),
	mergeMap(group00 => group00.pipe(
		toArray(),
		mergeMap(data00 => of({key: group00.key, data00}))
	))
);
const result01$ = source00$.pipe(
	groupBy(num00 => {
		if(num00 % 2 === 0) return of({even: num00});
		if(num00 % 2 !== 0) return of({odd: num00});
	}),
);
const result01_00$ = source00_00$.pipe(
	groupBy(even99 => even99.even, odd99 => odd99.odd),
	mergeMap(grp99 => zip(of(grp99.key), grp99.pipe(toArray())))
);
const result01_02$ = source00_00$.pipe(
	groupBy(grp99 => grp99.even),
	mergeMap(grp98 => grp98.pipe(toArray()))
);
const result01_01$ = source00$.pipe(
	flatMap(num98 => num98),
	groupBy(num00 => {
		if(num00 % 2 === 0) return of({even: num00});
		if(num00 % 2 !== 0) return of({odd: num00});
	}),
	mergeMap(num99 => num99.pipe(toArray()))
);
const result01a$ = source00$.pipe(
	map(num00 => {
		if(num00 % 2 === 0) return num00;
		if(num00 % 2 !== 0) return num00;
	}),
);
const result01b$ = source00$.pipe(
	flatMap(num00 => num00),
	concatMap(num02 => of(num02).pipe(
		reduce((acc, num01) => {
			if(num01 % 2 === 0) acc['even'] =+ num01;
			if(num01 % 2 !== 0) acc['odd'] =+ num01;

			return acc;
		}, {})
	)),
	map(data01 => Object.keys(data01).reduce((acc, curr) => {
		if(curr === 'odd') acc['odds'] =+ data01.odd;
		if(curr === 'even') acc['evens'] =+ data01.even;

		return acc;
	}, {}))
);
const result01bb$ = source00$.pipe(
	flatMap(num00 => num00),
	concatMap(num02 => of(num02).pipe(
		reduce((acc, num01) => {
			if(num01 % 2 !== 0) acc['odd'] =+ num01;
			if(num01 % 2 === 0) acc['even'] =+ num01;

			return acc;
		}, {})
	)),
	reduce((acc, data02) => {
		acc['odds'] =+ data02.odd;
		acc['evens'] =+ data02.even;

		return acc;
	}, {})
);
const result01c$ = source01$.pipe(
	flatMap(num00 => num00),
	groupBy(data03 => data03 % 2 === 0 ? 'even' : 'odd'),
	mergeMap(group00 => group00.pipe(
		toArray(),
		mergeMap(data04 => of({key: group00.key, numbers: data04}))
	))
);
const result02$ = source00$.pipe( //This won't work
	groupBy(grp99 => grp99 % 2 === 0 ? 'even' : 'odd'),
	mergeMap(grp98 => grp98.pipe((toArray())))
);
const result02a$ = source00$.pipe(
	flatMap(nums99 => nums99),
	groupBy(grp99 => grp99 % 2 === 0 ? 'even' : 'odd'),
	mergeMap(grp98 => grp98.pipe((toArray())))
);
const result02b$ = source00$.pipe(
	flatMap(val99 => val99),
	reduce((acc, grp99) => {
		grp99 % 2 === 0 ? acc.push({even: grp99}) : acc.push({odd: grp99});
		return acc;
	}, [])
)
//result01b$.subscribe(key => console.log(`Evens: ${key.evens}, Odds: ${key.odds}`));
result01_02$.subscribe(console.log);
