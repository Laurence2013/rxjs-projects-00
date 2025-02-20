/*
	desc-00: In RxJs multicasting, what is publish()?
	desc-00a: rxjs-publish, rxjs-refcount, rxjs-defer
	desc-01: The source Observable is only executed once, demonstrating the efficiency of multicasting
	desc-02: Delayed connection
	desc-03: 1. Delayed Connection with timer
	desc-04: Prevent re-execution, 1. publish() + refCount()
	desc-05: What does takeUntil() do?
	desc-06: 2. Connection on First Subscriber with defer and refCount
	desc-07: refCount() is an operator used with multicast Observables
	desc-08: 3. Caching expensive calculations
	goal:
	line-code-added:
*/

const { generate, of, from, timer, interval, throwError, Subject, defer } = require('rxjs');
const { tap, map, filter, delay, refCount, scan, share, publish, takeUntil, take, multicast } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000).pipe(
	tap(val => console.log(`Source emitted: ${val}`)),
	publish()
);
const source01$ = interval(1000).pipe(
	tap(val => console.log(`Source emitted: ${val}`)),
	share()
);
//source00$.subscribe(val => console.log(`Subscriber 1 received: ${val}`));
//setTimeout(() => source00$.subscribe(val => console.log(`Subscriber 2 received: ${val}`)), 4000);
//source00$.connect();
//timer(2500).subscribe(_ => source00$.connect());

// desc-02
const source02$ = interval(1000);
const trigger00$ = new Subject();
const multicast00$ = source02$.pipe(
	delay(5000),
	takeUntil(trigger00$),
	publish()
);
//multicast00$.subscribe(val => console.log(`Subscriber 1: ${val}`));
//setTimeout(() => multicast00$.subscribe(val => console.log(`Subscriber 2: ${val}`)), 3000);
//setTimeout(() => trigger00$.next(), 10000)
//multicast00$.connect();

// desc-03
const source03$ = interval(1000);
const delayedMulticast00$ = source03$.pipe(
	take(5),
	publish()
);
//timer(3000).subscribe(() => delayedMulticast00$.connect());
//delayedMulticast00$.subscribe(val => console.log(`Subscriber 1: ${val}`));
//delayedMulticast00$.subscribe(val => console.log(`Subscriber 2: ${val}`));

// desc-04
const source04$ = interval(1000).pipe(
	take(5),
	map(val => val === 4 ? new Error('Intentional Error') : val)
);
const shared00$ = source04$.pipe(publish(), refCount());
/*shared00$.subscribe(
	val => console.log(`Subscriber 1: ${val}`),
	err => console.log(`Subscriber 1: ${err}`),
);
timer(3000).subscribe(_ => {
	shared00$.subscribe(
		val => console.log(`Subscriber 2: ${val}`),
		err => console.log(`Subscriber 2: ${err}`),
		_ => console.log('Subscriber 2: Completed!')
	);
});*/

// desc-05
const source05$ = interval(1000);
const stop00$ = new Subject();
//source05$.pipe(takeUntil(stop00$)).subscribe(console.log);
//setTimeout(_ => stop00$.next(), 5000)

// desc-06
const source06$ = interval(1000);
const firstSubscribeMulticast00$ = defer(() => {
	console.log('First subscriber arrived, connecting...');
	return source06$.pipe(
		publish(),
		refCount(),
		tap({unsubscribe: _ => console.log('All unsubscribe, disconnecting...')})
	);
})
//firstSubscribeMulticast00$.subscribe(val => console.log(`Subscriber 1: ${val}`));
//setTimeout(_ => firstSubscribeMulticast00$.subscribe(val => console.log(`Subscriber 2: ${val}`)), 3000)

// desc-07
const source07$ = interval(1000);
const multicast01$ = source07$.pipe(
	multicast(new Subject()),
	refCount()
);
const subscription1 = multicast01$.subscribe(value => console.log('Subscriber 1:', value));
const subscription2 = multicast01$.subscribe(value => console.log('Subscriber 2:', value));

//setTimeout(() => subscription1.unsubscribe(), 5000);
//setTimeout(() => subscription2.unsubscribe(), 10000);

// desc-08
function expensiveCalc(val){
	console.log('Performing expensive calculations...');
	return val * 10;
};
const source08$ = interval(1000);
const cachedCalculations$ = source08$.pipe(
	map(expensiveCalc),
	multicast(new Subject()),
	refCount()
);
cachedCalculations$.subscribe(result => console.log(`Subscriber 1: ${result}`));
setTimeout(_ => cachedCalculations$.subscribe(result => console.log(`Subscriber 2: ${result}`)), 8000);
