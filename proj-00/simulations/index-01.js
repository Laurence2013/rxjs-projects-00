/*
	desc-00: 1. Simulating two independent Observables at different times
	desc-00a: js-simulation
	goal:
	line-code-added:
*/
const { Observable, combineLatest } = require('rxjs');
const { tap, map, withLatestFrom } = require('rxjs/operators');

const observable00$ = new Observable(obs => {
	let count = 0;
	setInterval(() => {
		obs.next(count + 1);

		count++;
	}, 100);
});
const observable01$ = new Observable(obs => {
	let count = 0;
	setInterval(() => {
		obs.next(count + 1);

		count++;
	}, 300);
});
const result00$ = combineLatest(observable00$, observable01$).pipe(
	map(([obs00, obs01]) => ({obs00, obs01}))
);
const result01$ = observable00$.pipe(
	withLatestFrom(observable01$),
	map(([obs00, obs01]) => ({obs00, obs01}))
);
result00$.subscribe(console.log);
