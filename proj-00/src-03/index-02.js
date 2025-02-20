/*
	desc-00: In RxJs multicasting, what is the multicast() operator?
	desc-00a: rxjs-multicast
	desc-01: 1. Using connectable and connect
	desc-02: 1. Delayed Connection
	desc-03: 2. Manual Disconnection
	desc-04: 1. RefCounting with share
	desc-05: 2. Custom Subject with connectable
	goal:
	line-code-added:
*/

const { generate, of, from, timer, interval, throwError, Subject, ReplaySubject, connectable } = require('rxjs');
const { tap, map, filter, delay, refCount, scan, share, publish, takeUntil, take, multicast } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000);
const multicasted00$ = connectable(source00$, {connector: _ => new Subject()});

multicasted00$.subscribe(value => console.log('Subscriber 1:', value));
multicasted00$.subscribe(value => console.log('Subscriber 2:', value));

//const subscribe00 = multicasted00$.connect();
//setTimeout(_ => subscribe00.unsubscribe(), 5000);

// desc-02
const source01$ = interval(1000);
const multicasted01$ = connectable(source01$, {connector: _ => new Subject()});

//multicasted01$.subscribe(value => console.log('Subscriber 1:', value));
/*timer(6000).subscribe(_ => {
	const sub00 = multicasted01$.connect();
	multicasted01$.subscribe(val => console.log(`Subscriber 2: ${val}`));
});*/

// desc-03
const source02$ = interval(1000);
const multicasted02$ = connectable(source02$, {connector: _ => new Subject()});
/*multicasted02$.subscribe(val => console.log(`Subscriber 1: ${val}`));

const subscription00$ = multicasted02$.connect();
timer(7000).subscribe(_ => subscription00$.unsubscribe());

setTimeout(_ => multicasted02$.subscribe(val => console.log(`Subscriber 3: ${val}`)), 3500)
setTimeout(_ => multicasted02$.subscribe(val => console.log(`Subscriber 2: ${val}`)), 9000);*/

// desc-04
const source03$ = interval(1000);
const shared00$ = source03$.pipe(share({
	connector: _ => new Subject(),
	resetOnRefCountZero: true
}));
/*const sub00$ = shared00$.subscribe(val => console.log(`Subscriber 1: ${val}`));

setTimeout(_ => {
	const sub01$ = shared00$.subscribe(val => console.log(`Subscriber 2: ${val}`));

	setTimeout(_ => {
		sub00$.unsubscribe();
		sub01$.unsubscribe();
	}, 9000);
}, 5000);*/

// desc-05
const source04$ = interval(1000);
const multicasted03$ = connectable(source04$, {connector: _ => new ReplaySubject(3)});
const sub02$ = multicasted03$.subscribe(val => console.log(`Subscriber 1: ${val}`));

setTimeout(_ => {
	multicasted03$.connect();
	setTimeout(_ => {
		const sub01$ = multicasted03$.subscribe(val => console.log(`Subscriber 2: ${val}`));
	}, 4000);
}, 2000);
