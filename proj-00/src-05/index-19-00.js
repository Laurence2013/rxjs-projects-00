/*
	desc-00: Give some harder code examples using reduce() operator.
	desc-00a: rxjs-reduce
	desc-01: 1. Accumulating a Complex Object with Conditional Logic
	desc-02: Example 2: Accumulating Objects
	desc-03: Example 3: Accumulating with a Dynamic Accumulator
	desc-04: Example 4: Accumulating with Side Effects
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, groupBy, toArray, mergeMap, concatMap, switchMap } = require('rxjs/operators');

// desc-01
const events00$ = from([
  { type: 'click' },
  { type: 'purchase', value: 25 },
  { type: 'pageView', page: '/home' },
  { type: 'click' },
  { type: 'purchase', value: 10 },
  { type: 'pageView', page: '/about' },
  { type: 'click' },
]);
const initialProfile = {
  totalClicks: 0,
  totalPurchases: 0,
  totalPurchaseValue: 0,
  visitedPages: new Set(),
};
const result00$ = events00$.pipe(
	reduce((acc, ev99, idx) => {
		ev99.type === 'click' ? acc.totalClicks += 1 : 0;
		ev99.type === 'purchase' ? acc.totalPurchases += 1: 0;
		ev99.type === 'purchase' ? acc.totalPurchaseValue += ev99.value : 0;
		ev99.type === 'pageView' ? acc.visitedPages.add(ev99.page) : {};

		return acc;
	}, initialProfile)
);
const result01$ = events00$.pipe(
	reduce((acc, ev99, index) => {
		switch(ev99.type){
			case 'click':
				acc.totalClicks += 1;
			case 'purchase':
				acc.totalPurchases += 1;
				acc.totalPurchaseValue += ev99.type === 'purchase' ? ev99.value : 0;
			case 'pageView':
				ev99.page !== 'undefined' ? acc.visitedPages.add(ev99.page) : {};
			default:
				return acc;
		}
	}, initialProfile)
);
// result01$.subscribe(console.log);

// desc-02
const events99$ = of(
  { type: 'click', timestamp: 1000 },
  { type: 'scroll', timestamp: 2000 },
  { type: 'click', timestamp: 3000 },
  { type: 'keypress', timestamp: 4000 },
  { type: 'click', timestamp: 5000 }
);
const result02$ = events99$.pipe(
	reduce((acc, curr) => {
		acc[curr.type] = (acc[curr.type] || 0) + 1;
		return acc;
	}, {})
);
// result02$.subscribe(console.log);

// desc-03
const source04$ = of(1,2,3,4,5,6,7,8,9);
const result03$ = source04$.pipe(
	reduce((acc, curr) => {
		curr % 2 === 0 ? acc.even += curr : acc.odd += curr;
		return acc;
	}, {even: 0, odd: 0})
);
const result03a$ = source04$.pipe(
	reduce((acc, curr) => {
		curr % 2 === 0 ? { ...acc, even: acc.even + curr } : { ...acc, even: acc.odd + curr }
		return acc;
	}, {even: 0, odd: 0})
);
// result03$.subscribe(console.log);

// desc-04
const source05$ = of(1,2,3,4,5,6,7,8,9);
const result04$ = source05$.pipe(
	reduce((acc, curr) => acc += curr, 0)
);
result04$.subscribe(console.log);
