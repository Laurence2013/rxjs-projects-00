/*
	desc-00: Give code examples using Notification, dematerialize() and materialize() in RxJs.
	desc-00a: rxjs-dematerialize, rxjs-notification, rxjs-materialize
	desc-01: // Example 1: Using materialize and dematerialize to handle errors
	desc-02: // Example 2: Logging all notifications
	desc-03: // Example 3: Creating a custom notification
	goal:
	line-code-added:
*/
const { of, from, interval, timer, Notification } = require('rxjs');
const { tap, map, filter, delay, flatMap, delayWhen, dematerialize, materialize } = require('rxjs/operators');

// desc-01
const source00$ = interval(1000).pipe(
	map(val00 => val00 === 5 ? new Error('An ERROR occured!') : val00),
	materialize(),
	delay(2000),
	dematerialize()
);
const source00a$ = interval(1000).pipe(
	map(val00 => {
		if(val00 === 5){throw new Error('An ERROR occured!')};
		return val00
	}),
	materialize(),
	delay(2000),
	dematerialize()
);
/*source00a$.subscribe({
	next: val => console.log('Next', val),
	err: err => console.log('Error', err),
	complete: _ => console.log('Complete!')
});*/

// desc-02
const source01$ = of(1,2,3,4,5,6,7,8,9).pipe(materialize());
const source01a$ = of(1,2,3,4,5,6,7,8,9).pipe(
	materialize(),
	delay(2000),
	dematerialize()
);
source01$.subscribe(notify00 => console.log('Notification: ', notify00));

// desc-03
const customNotify = new Notification('N', 50);
const source02$ = of(customNotify).pipe(dematerialize());
/*source02$.subscribe({
	next: (value) => console.log('Next:', value),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('Complete')
})*/
