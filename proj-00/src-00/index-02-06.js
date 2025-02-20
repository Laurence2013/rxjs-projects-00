/*
	desc-00: https://rxjs.dev/api/index/function/combineLatest
	desc-00a: Tag rxjs-combinelatest
	desc-01: Combine two timer Observables
	desc-02: Combine a dictionary of Observables
	desc-03: Use map operator to dynamically calculate the Body-Mass Index
	goal:
	line-code-added:
*/

const { timer, combineLatest, of } = require('rxjs');
const { delay, startWith, map } = require('rxjs/operators');

// desc-01
const timer00$ = timer(0, 1000);
const timer01$ = timer(500, 1000);

const source00$ = combineLatest([timer00$, timer01$]);
// source00$.subscribe(console.log);

// desc-02
const obj00$ = {
	a: of(1).pipe(delay(1000), startWith(0)),
	b: of(5).pipe(delay(4000), startWith(0)),
	c: of(10).pipe(delay(6000), startWith(0))
};
const source01$ = combineLatest(obj00$);
//source01$.subscribe(console.log);

// desc-03
const weight$ = of(70, 72, 76, 79, 75);
const height$ = of(1.76, 1.77, 1.78);
const bmi$ = combineLatest([weight$, height$]).pipe(
  map(([w, h]) => (w / (h * h)).toFixed(2)),
);
bmi$.subscribe(x => console.log('BMI is ' + x));
