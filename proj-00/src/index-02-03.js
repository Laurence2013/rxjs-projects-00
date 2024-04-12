/*
desc-00: Calculating BMI, tag rxjs-combinelatest
goal:
line-code-added:
*/
const { of, combineLatest } = require('rxjs');
const { map } = require('rxjs/operators');

const weight$ = of(70);
const height$ = of(1.8);

const bmi$ = combineLatest(weight$, height$).pipe(
	map(([weight, height]) => (weight / (height * height)).toFixed(2))
);
bmi$.subscribe(console.log);

