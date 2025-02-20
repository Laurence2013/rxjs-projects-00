/*
	desc-00: In RxJs explain in great detail expand() operator
	desc-00a: rxjs-expand
	desc-01: Example:
	desc-02: 1.  Traversing a Linked List:
	desc-03: 2.  Simulating a Fibonacci Sequence:
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, delay, take, takeWhile, flatMap, expand, combineAll, concatMap } = require('rxjs/operators');

// desc-01
const source00$ = of(2).pipe(delay(1000));
const result00$ = source00$.pipe(
	expand(val => {
		console.log(`Passed value: ${val}`);
		return of(val + 1)
	}),
	take(10)
);
const result00a$ = source00$.pipe(
	map(val => {
		console.log(`Passed value: ${val}`);
		return of(val + 1)
	}),
	take(10),
	combineAll()
);
const result00b$ = source00$.pipe(
	concatMap(val => {
		console.log(`Passed value: ${val}`);
		return of(val + 1)
	}),
	take(10),
);
//result00b$.subscribe(console.log);

// desc-02
const linkedList00 = {
	value: 1, next: {
		value: 2, next: {
			value: 3, next: {
				value: 4, next: {
					value: null
				}
			}
		}
	}
};
const linkedList01 = {
	value: 1, next: {
		value: 2, next: {
			value: null, next: {
				value: 4, next: {
					value: null
				}
			}
		}
	}
};
const result01$ = of(linkedList00).pipe(
	expand(obj00 => {
		console.log(`Passed value: ${obj00.value}`);
		if(obj00.value !== null) return of(obj00.next);
	}),
	takeWhile(obj01 => obj01.value !== null),
	map(obj02 => obj02.value)
);
const result01a$ = of(linkedList00).pipe(
	expand(obj00 => obj00.next ? of(obj00.next) : of(null)),
	takeWhile(obj01 => obj01.value !== null),
	map(obj02 => obj02.value)
);
const result01c$ = of(linkedList00).pipe(
	expand(obj00 => obj00.value !== null ? of(obj00.next) : of(null)),
	takeWhile(obj01 => obj01.value !== null),
	map(obj02 => obj02.value)
);
result01$.subscribe(console.log);

// desc-03
const fib00 = of([0, 1]);
const calcFib00$ = fib00.pipe(
	expand((vals00, index) => {
		const total00 = vals00[0] + vals00[1];
		if(total00 === 1) return of([vals00[1], total00]);
		if(total00 !== 1){
			const total01 = total00 + vals00[1];
			return of([vals00[1], total01]);
		}
	}),
	take(10)
);
const calcFib00a$ = fib00.pipe(
	expand((vals00, index) => {
		const total00 = vals00[0] + vals00[1];
		return total00 === 1 ? of([vals00[1], total00]) : of([vals00[1], (total00 + vals00[1])])
	}),
	take(10)
);
const calcFib00b$ = fib00.pipe(
	expand(([a, b]) => of([b, a + b])),
	map(([a, b]) => a),
	take(10)
);
//calcFib00a$.subscribe(console.log);
