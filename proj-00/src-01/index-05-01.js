/*
	desc-00: In RxJs explain pairwise() operator
	desc-00a: rxjs-pairwise
	desc-01: Give some code examples using a simulated API response
	goal:
	line-code-added:
*/
const { timer, interval } = require('rxjs');
const { delay, pairwise, map, filter } = require('rxjs/operators');

const apiResponse$ = timer(0, 3000).pipe(
	map(_ => {
		const temperature = Math.floor(Math.random() * 30) + 15;
		return {timestamp: new Date(), temperature}
	})
);
const result00$ = apiResponse$.pipe(
	pairwise(),
	map(([prev, curr]) => {
		const change = curr.temperature - prev.temperature;
		return {timestamp: curr.timestamp, change}
	})
);
result00$.subscribe(change => console.log(`Temperature change at ${change.timestamp}: ${change.change} degrees`));
