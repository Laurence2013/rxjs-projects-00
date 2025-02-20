/*
	desc-00: Give some harder code examples using reduce() operator.
	desc-00a: rxjs-reduce
	desc-01: Example 1: Summing Numbers
	desc-02: 1. Calculate the Average of Emitted Numbers
	desc-03: 2. Group Objects by a Property
	desc-04: 3. Find the Maximum Value in a Stream
	desc-05: 4. Flatten an Array of Arrays
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, groupBy, toArray, mergeMap, concatMap, switchMap } = require('rxjs/operators');

// desc-01, output -> Average: 150
const source00$ = of(10, 20, 30, 40, 50);
const result00$ = source00$.pipe(
	reduce((acc, product) => acc + product, 0)
);
const result00a$ = source00$.pipe(
	reduce(([acc], product) => [acc + product], [0])
);
// result00a$.subscribe(console.log);

// desc-02, output -> Average: 30
const source01$ = of(10, 20, 30, 40, 50);
const result01$ = source01$.pipe(
	reduce((acc, product, index) => {
		acc.sum += product;
		acc.count = index + 1
		return acc;
	}, {sum: 0, count: 0})
);
// result01$.subscribe(ave99 => console.log(ave99.sum / ave99.count));

// desc-03
const products00$ = of(
	{ id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Shirt', category: 'Clothing' },
  { id: 3, name: 'Headphones', category: 'Electronics' },
  { id: 4, name: 'Shoes', category: 'Clothing' }
);
const result02$ = products00$.pipe(
	reduce((acc, product, index) => {
		!acc[product.category] ? acc[product.category] = [] : null;
		acc[product.category].push(product);
		return acc
	}, {})
);
// result02$.subscribe(console.log);

// desc-04, output -> 15
const source02$ = of(5, 10, 3, 80, 15, 7);
const result03$ = source02$.pipe(
	reduce((acc, curr, index) => {
		if(acc.num === 0){acc.num += curr};
		if(acc.num < curr){acc.num = curr};
		return acc;
	}, {num: 0})
);
const result03a$ = source02$.pipe(
	reduce((acc, curr, index) => (curr > acc ? curr : acc), -Infinity)
);
// result03a$.subscribe(console.log);

// desc-05
const source03$ = of([1, 2], [3, 4], [5, 6]);
const result04$ = source03$.pipe(
	reduce((acc, curr, idx) => {
		acc.push(...curr);
		return acc;
	} , [])
);
const result04a$ = source03$.pipe(
	reduce((acc, curr, idx) => acc.concat(curr), [])
);
result04$.subscribe(console.log);
