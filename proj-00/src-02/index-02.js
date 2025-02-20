/*
	desc-00: In RxJs what is sequenceEqual(). Tag rxjs-sequenceEqual
	desc-01: 1. Password Verification (Simplified)
	desc-02: From result04$, this is how it setup, either from of() or from(), must be an array with integers, strings!
	desc-03: At result06$ and result07$ these are the proper setups for object
	goal:
	line-code-added:
*/

const { of, from, concat, iif, forkJoin, interval, zip } = require('rxjs');
const { tap, map, concatMap, mergeMap, switchMap, delay, sequenceEqual, combineAll } = require('rxjs/operators');

const source00$ = from([1,2,3]);
const source01$ = of(1,2,3);
const source02$ = from([4,5,6]);
const source03$ = from([{ id: 1 }, { id: 2 }]);
const source04$ = of({ id: 1 }, { id: 2 });
const source05$ = from([
  { id: 1, name: 'Product A', price: 25.99 },
  { id: 2, name: 'Product A', price: 25.99 },
  { id: 3, name: 'Product A', price: 25.99 }
]);
const source06$ = of(
  { id: 1, name: 'Product A', price: 25.99 }
);

const result00$ = source00$.pipe(sequenceEqual(source01$));
const result02$ = of([4,5,6]).pipe(
	switchMap(arr => from(arr).pipe(
		sequenceEqual(source02$))
	)
);
const result03$ = source03$.pipe(sequenceEqual(source04$));
const result04$ = of([1,2,3],[4,5,6],[7,8,9]).pipe(
	switchMap(arr => from(arr).pipe(
		sequenceEqual(source02$)
	))
);
const result05$ = of([1,2,3],[4,5,6],[7,8,9]).pipe(sequenceEqual(source02$))
const result06$ = source05$.pipe(
	concatMap(arr => of(arr).pipe(
		sequenceEqual(source06$, (a,b) => a.id === b.id),
		delay(1000)
	))
);
const result07$ = source03$.pipe(sequenceEqual(source04$, (a,b) => a.id === b.id));
const result07a$ = source05$.pipe(sequenceEqual(source06$, (sourceA, sourceB) => sourceA.id === sourceB.id));

result06$.subscribe(console.log); 
