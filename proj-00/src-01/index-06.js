/*
	desc-00: In RxJs explain race() operator
	desc-00a: rxjs-race
	desc-01: Give some more code examples using interval(), delay() and race() 
	desc-01a: 3. Combining interval(), delay(), and race() for a More Complex Scenario:
	goal:
	line-code-added:
*/
const { interval, of, delay, race, take } = require('rxjs');

const source00$ = interval(8000).pipe(take(3));
const source01$ = of('trigger').pipe(delay(5000));
const source02$ = interval(7000);

const result00$ = race(source00$, source01$, source02$);
result00$.subscribe({
	next: value => console.log(value),
  complete: () => console.log('Race completed')
})
