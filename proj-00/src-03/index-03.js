/*
	desc-00: in rxjs what is sharereplay() operator?
	desc-00a: rxjs-sharereplay
	desc-01: 4. combining with other operators
	desc-02: 1. centralized data source
	desc-03: 3. asynchronous operations
	desc-04: scenario 2: user profile data fetching
	goal:
	line-code-added:
*/

const { generate, of, from, timer, interval, throwError, Subject, ReplaySubject } = require('rxjs');
const { tap, map, switchMap, filter, delay, refCount, scan, shareReplay } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000).pipe(
	map(val => val * 2),
	filter(val => val % 2 === 0),
	shareReplay(3)
);
//source00$.subscribe(val => console.log(`Subscriber 1: ${val}`));
//setTimeout(_ => source00$.subscribe(val => console.log(`Subscriber 2: ${val}`)), 5000);

// desc-02
const dataSubject00$ = new Subject();
const sharedData00$ = dataSubject00$.pipe(shareReplay(1));

setInterval(_ => dataSubject00$.next(Math.random()), 2000);

//sharedData00$.subscribe(data => console.log(`Subscriber 1: ${data}`));
//setTimeout(_ => sharedData00$.subscribe(data => console.log(`Subscriber 2: ${data}`)), 7000);

// desc-03
const dataSubject01$ = new Subject();
const apiResponse00$ = dataSubject01$.pipe(shareReplay(1));

setTimeout(_ => dataSubject01$.next('Hello After 3 seconds!'), 3000);
setTimeout(_ => dataSubject01$.next('Hello After 5 seconds!'), 5000);

/*apiResponse00$.subscribe(val => console.log(`Received value: ${val}`));

setTimeout(_ => apiResponse00$.subscribe(val => console.log(`Late subscriber received value: ${val}`)), 8000);
setTimeout(_ => dataSubject01$.unsubscribe(), 10000)*/

// desc-04
const fetchUserProfile = () => of({name: 'Alice', email: 'alice@gmail.com'}).pipe(delay(2000));
const source01$ = of(null).pipe(
	switchMap(_ => fetchUserProfile()),
	tap(_ => console.log('Fetched profile...')),
	map(profile => profile.name),
	shareReplay(1)
)
source01$.subscribe(val => console.log(`Subscriber 1: ${val}`));
timer(5000).subscribe(val => source01$.subscribe(val => console.log(`Subscriber 2: ${val}`)));
