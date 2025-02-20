/*
	desc-00: In RxJs explain the delayWhen() operator.
	desc-00a: In RxJs explain in detail dematerialize() operator.
	desc-00b: rxjs-delayWhen, rxjs-dematerialize, rxjs-notification, rxjs-materialize
	desc-01: Give more code examples using delayWhen() operator, without calling from html.
	desc-02: // Example 4: Using accept
	desc-03: 4. Testing Completion: -> Example:
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Notification } = require('rxjs');
const { tap, map, filter, flatMap, delayWhen, dematerialize, materialize } = require('rxjs/operators');

// desc-01
const source00$ = from([1000, 2000, 3000, 4000, 5000, 20000, 7000]);
const result00$ = source00$.pipe(
	delayWhen(dat01 => timer(dat01 * 1))
);
const result01$ = source00$.pipe(
	delayWhen(dat01 => interval(dat01))
);
//result01$.subscribe(val => console.log(val));

// desc-02-00
const notify00 = Notification.createNext(10);
/*notify00.accept(
	val => console.log('Next', val),
	err => console.log('Error', err),
	_ => console.log('Completed!')
);*/

// desc-02-01
const complete00$ = Notification.createComplete().toObservable();
/*complete00$.subscribe(
	_ => console.log('Complete emitted!'),
	null,
	_ => console.log('Observable completed!')
);*/

// desc-02-02
const nextNotify$ = Notification.createNext('Hello');
const errNotify$ = Notification.createError(new Error('Fail'));
const completeNotify$ = Notification.createComplete();

/*console.log(nextNotify$.kind);
console.log(errNotify$.error.message);
console.log(completeNotify$.kind);*/

// desc-02-03
const result02$ = of(12,3,4,5,6,7).pipe(
	map(dat00 => dat00 * 3),
	materialize(),
	filter(dat01 => dat01.value % 2 === 0),
	dematerialize()
);
//result02$.subscribe(console.log);

// desc-03
const source01$ = of(1,2,3,4,5,6,7,8,9).pipe(
	tap(_ => console.log('Side effect!')),
	materialize()
);
source01$.subscribe(notify00 => {
	if(notify00.kind === 'N') expect(notify00.value).toBe(5);
	if(notify00.kind === 'E') expect(notify00.createError(new Error('Error'))).toBe('Error');
	if(notify00.kind === 'C') expect(notify00.createComplete).toBe('Completed');
});
