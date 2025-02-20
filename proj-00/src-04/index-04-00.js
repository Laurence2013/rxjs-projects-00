/*
	desc-00: How to use skipWhile(), BehaviorSubject() and withLatestFrom()?
	desc-00a: rxjs-skipWhile, rxjs-combineLatestFrom, rxjs-behaviorSubject
	desc-01: How to use skipWhile(), BehaviorSubject() and withLatestFrom()? -> Code Implementation
	desc-02: What happens when its false then true then false? -> Illustrative Example
	goal:
	line-code-added:
*/
const { interval, timer, from, of, combineLatest, combineAll, merge, race, BehaviorSubject } = require('rxjs');
const { tap, map, find, filter, switchMap, concatMap, delay, sample, skipUntil, skipWhile, withLatestFrom } = require('rxjs/operators');

// desc-01
const userActions00$ = new BehaviorSubject('initial');
const appState00$ = of('loading', 'ready', 'busy', 'ready');
const appState01$ = of('loading', 'ready', 'busy');

const triggetAction00$ = userActions00$.pipe(
	skipWhile(action => action !== 'submit'),
	withLatestFrom(appState00$),
	filter(([action, state]) => state === 'ready'),
	map(([action, state]) => ([action, state]))
);
const triggetAction01$ = userActions00$.pipe(
	skipWhile(action => action !== 'submit'),
	withLatestFrom(appState01$),
	filter(([action, state]) => state === 'ready'),
	map(([action, state]) => ([action, state]))
);
triggetAction00$.subscribe(([action, state]) => console.log(`Triggered action: ${action} - ${state}`));

userActions00$.next('click');
userActions00$.next('hover');
userActions00$.next('submit');
userActions00$.next('submit');
userActions00$.next('submit');

/*userActions00$.next('click');
userActions00$.next('hover');
userActions00$.next('submit');
userActions00$.next('submit');
userActions00$.next('submit');
userActions00$.next('hover');*/

// desc-02
const source00$ = of(1,2,3,4,5,6,3,2);
const result00$ = source00$.pipe(
	skipWhile(value => {
		if(value < 3) return true;
		if(value === 4) return true;
		return false;
	})
);
//result00$.subscribe(console.log);
