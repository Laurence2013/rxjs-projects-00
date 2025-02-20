/*
	desc-00: How does the completion differ from combineAll() vs forkJoin()?
	desc-00a: rxjs-combineall, rxjs-forkjoin, immediate-action-analogy, basket-analogy
	desc-01: Let's illustrate this with a simple example:
	goal:
	line-code-added:
*/
const { of, interval, forkJoin } = require('rxjs');
const { map, switchMap, combineAll, take } = require('rxjs/operators');

const source00$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
const source00a$ = of([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const source00b$ = of('1', '2', '3', '4', '5', '6', '7', '8', '9');
const source01$ = of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i');
const source01a$ = of(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);
const source02$ = of({a:'1',b:'2',c:'3',d:'4'});
const source03$ = of(
  source00a$,
  source01a$.pipe(take(5))
);
const source03a$ = of(
  source00b$.pipe(take(3)),
  source01$.pipe(take(3)),
);
const source03b$ = of(
  source00$.pipe(take(3)),
  source01$.pipe(take(3)),
  source00b$.pipe(take(3))
);
const source03c$ = of(
  source00b$.pipe(take(3)),
  source02$.pipe(map(obj => [obj.a, obj.b, obj.c])), //When dealing with objects, its only for direct access
);
const result00$ = forkJoin([source00a$, source01$]);
const result01$ = source03b$.pipe(combineAll());
const result01a$ = source03c$.pipe(combineAll());
const result02$ = forkJoin([source00$, source03$]);
const result03$ = forkJoin({source00: source00a$, source01: source01a$});

result00$.subscribe(val => console.log(`From result00: ${val}`));
result01$.subscribe(val => console.log(`From result01: ${val}`));
result01a$.subscribe(val => console.log(`From result01a: ${val}`));
//result02$.subscribe(val => console.log(`From result02: ${val}`));
result03$.subscribe(val => console.log(`From result03: ${val.source00} - ${val.source01}`));
