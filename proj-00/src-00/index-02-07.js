/*
	desc-00: Using the combineLatest() function, tag rxjs-combinelatest
	desc-01: What if one of the three observable have an inner observable? -> Example
	goal: 
	line-code-added:
*/
const { interval, from, timer, combineLatest, of } = require('rxjs');
const { map, switchMap } = require('rxjs/operators');

// desc-01
const source00$ = of('apple', 'banana', 'orange');
const source01$ = interval(1000);
const source02$ = of(1,2,3).pipe(switchMap(num => from(['red','yellow','blue','brown'].slice(0, num))));
const source02a$ = of(1,2,3).pipe(
	switchMap(num => from(['red','yellow','blue','brown']).pipe(
		map(colours => `Num: ${num} - Colour: ${colours}`)
	)),
);
const result00$ = combineLatest([source00$, source01$, source02a$]);
result00$.subscribe(([fruit, number, color]) => {
  console.log(`Latest combo: ${fruit}, ${number}, ${color}`);
});
