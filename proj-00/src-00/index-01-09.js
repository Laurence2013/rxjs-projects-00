/*
	desc-00: Give some RxJs code examples using combineAll(), interval() and some other operators.
	desc-00a: Tag rxjs-combineall
	goal: 
	line-code-added:
*/
const { of, interval, combineLatestAll, combineAll, combineLatest } = require('rxjs');
const { map, take } = require('rxjs/operators');

const outer00$ = of(
  interval(1000).pipe(map(x => `A${x}`), take(3)), 
  interval(500).pipe(map(x => `B${x}`), take(5)) 
);
const outer01$ = of(
  interval(1000).pipe(map(x => `A${x}`), take(3)), 
  interval(500).pipe(map(x => `B${x}`), take(5)),
	combineAll()
);
const result00$ = outer00$.pipe(
  combineAll((latestA, latestB) => `${latestA} and ${latestB}`)
)
const outer02$ = of(
  interval(1000).pipe(map(x => `A${x}`), take(3)), 
  interval(500).pipe(map(x => `B${x}`), take(5)) 
);
const result001$ = outer02$.pipe(combineAll());

//1: result00$.subscribe(console.log);
//2: result01$.subscribe(console.log);
//3: outer01$.subscribe(console.log);

