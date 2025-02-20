/*
	desc-00: In RxJs explain in detail scan() operator
	desc-00a: rxjs-scan
	desc-01: Example:, 1. Calculating running totals:
	desc-02: 2. Tracking the average of a stream of numbers:
	desc-03: 3. Accumulating strings:
	desc-04: 4. Creating a Fibonacci sequence:
	desc-05: 1. Calculating differences between consecutive numbers:
	desc-06: 2. Tracking the maximum value in a stream:
	desc-07: 3. Accumulating objects:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, mapTo, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap, scan, startWith, pairwise } = require('rxjs/operators');

// desc-01
const source00$ = from([1,2,3,4,5,6,7,8,9]);
const result00$ = source00$.pipe(scan((acc, curr) => acc + curr, 0));
//result00$.subscribe(console.log);

// desc-02
const source01$ = from([1,2,3,4,5,6,7,8,9,10,11]);
const result01$ = source01$.pipe(
	scan((acc, curr) => {
		acc.sum += curr;
		acc.count++;
		return acc;
	}, {sum: 0, count: 0}),
	map(data00 => data00.sum / data00.count)
);
//result01$.subscribe(val00 => console.log(`Average: ${val00}`));

// desc-03
const source02$ = from(['Hello', ' ', 'world', ' ', ' ','!']);
const result02$ = source02$.pipe(scan((acc, curr) => acc + curr, ''));
const result02a$ = source02$.pipe(reduce((acc, curr) => acc + curr, ''));
//result02a$.subscribe(console.log);

// desc-04
const source03$ = interval(1000).pipe(take(20)); // Visualise the way of pairing, 
const result03$ = source03$.pipe(
	scan((acc, curr, index) => {
		if(curr === 1) acc[0] = 1;
		if(curr === 2) acc[0] = 1;
		if(curr > 2) acc[0] 
		acc[1]++;
		return acc;
	}, [0, 0]),
	map(data00 => data00)
);
const result03a$ = source03$.pipe(scan(([acc, curr]) => [curr, acc], [0, 12]));
const result03aa$ = source03$.pipe(scan(([acc, curr]) => [acc, curr], [0, 12]));
const result03ab$ = source03$.pipe(scan(([acc, curr]) => [acc, curr * 2], [0, 12]));
const result03b$ = source03$.pipe(scan(([acc, curr]) => [curr, acc + curr], [0, 1]));
//result03ab$.subscribe(console.log);

// desc-05
const source04$ = from([1,112,30,194,5,16,7,18,9,10,11,2,13,4,15]).pipe(delay(1000));
const result04$ = source04$.pipe(
	pairwise(),
	filter((_, idx00) => idx00 % 2 === 0),
	map((data01, idx01) => [data01, data01[1] - data01[0]].flat())
);
const result04a$ = source04$.pipe(
	pairwise(),
	filter((_, idx00) => idx00 % 2 === 0),
	map(([prev, curr]) => curr - prev),
	scan((acc, curr) => [...acc, curr], [])
);
const result04aa$ = source04$.pipe(
	pairwise(),
	filter((_, idx00) => idx00 % 2 === 0),
	map(([prev, curr]) => [prev, curr, curr - prev]),
);
const result04b$ = source04$.pipe(
	pairwise(),
	filter((_, idx00) => idx00 % 2 === 0),
	map((data01, idx01) => [data01, data01[1] - data01[0]].flat()),
	scan((acc, curr) => [...acc, curr], [])
);
//result04aa$.subscribe(console.log);

// desc-06
const source05$ = from([1,112,30,194,5,16,7,18,9,10,11,2,13,4,15]).pipe(delay(1000));
const result05$ = source05$.pipe(
	scan((acc, curr) => {
		if(curr > acc){
			acc = 0;
			acc += curr;
		}
		return acc;
	}, 0)
);
const result05a$ = source05$.pipe(scan((acc, curr) => Math.max(acc, curr), 0));
//result05a$.subscribe(console.log);

// desc-07
const source06$ = from([{ x: 1, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 4 }]);
const result06$ = source06$.pipe(scan((acc, curr) => ({x: acc.x += curr.x, y: acc.y += curr.y}), {x: 0, y: 0}));
result06$.subscribe(console.log);
