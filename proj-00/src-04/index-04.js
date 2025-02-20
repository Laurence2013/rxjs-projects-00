/*
	desc-00: In RxJs explain find(), In RxJs, what is the sample() operator?
	desc-00a: rxjs-find, rxjs-first, rxjs-ignoreElements, rxjs-last, rxjs-sample, rxjs-skipUntil, rxjs-skipWhile
	desc-01: 1. Finding the First User with a Matching Skill. Code altered because the one Gemini gave is wrong!
	desc-02: 1. Finding a User by ID
	desc-03: 3. Finding the First Valid Input in a Form
	desc-04: In RxJs, what is the sample() operator? -> Example
	desc-05: In RxJs what is skipUntil() operator? Example
	desc-06: Using merge or race
	desc-07: Example: Skipping Requests Until a Successful Response. This code needs re-doing
	goal:
	line-code-added:
*/
const { interval, timer, from, of, combineLatest, combineAll, merge, race, BehaviorSubject } = require('rxjs');
const { tap, map, find, filter, switchMap, concatMap, delay, sample, skipUntil, skipWhile, withLatestFrom } = require('rxjs/operators');

// desc-01
const users00$ = from([
  { id: 1, name: 'Alice', skills: ['JavaScript', 'C'] },
  { id: 2, name: 'Bob', skills: ['Java', 'C++', 'Python'] },
  { id: 3, name: 'Charlie', skills: ['Python', 'Ruby'] }
]);
const targetSkill$ = from(['Python']);
const result00$ = targetSkill$.pipe(
	switchMap(skill => users00$.pipe(
		find(user => user.skills.includes(skill))
	))
);
//result00$.subscribe(console.log);

// desc-02
const users00 = [
  { id: 1, name: 'Alice' },
  { id: 4, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Tim' }
];
const targetUserId$ = from([4]).pipe(map(id => id));
const result01b$ = from(users00).pipe(
	switchMap(users => targetUserId$.pipe(
		find(id => users.id === id),
		filter(id => id)
	))
);
const result01c$ = targetUserId$.pipe(
	switchMap(id => from(users00).pipe(
		find(user => user.id === id)
	))
)
//result01c$.subscribe(console.log);

// desc-03
const nameInput00$ = of(
	{id: 01, message: 'h'},
	{id: 02, message: 'he'},
	{id: 03, message: 'hell'},
	{id: 04, message: 'hello'},
	{id: 05, message: 'he'},
);
const source00$ = nameInput00$.pipe(
	concatMap(input => of(input).pipe(delay(1000)))
);
//source00$.subscribe(console.log);

// desc-03a
const nameInput01$ = of([
	{id: 01, message: 'h'},
	{id: 02, message: 'he'},
	{id: 03, message: 'hell'},
	{id: 04, message: 'hello'},
	{id: 05, message: 'he'},
]);
const source01$ = nameInput01$.pipe(
	concatMap(input => from(input)),
	concatMap(inpt => of(inpt).pipe(delay(1000)))
);
//source01$.subscribe(console.log);

// desc-04
const source02$ = interval(500);
const source02a$ = interval(1000);
const source02b$ = from(['a','b','c','d','e','f','g']);
const result02$ = source02a$.pipe(
	sample(source02$)
);
//result02$.subscribe(console.log);

// desc-05
const source03$ = interval(1000);
const source04$ = interval(5000);
const result03$ = source03$.pipe(
	skipUntil(source04$),
	map((source03, source04) => `Source-04: ${source04} - Source-03: ${source03}`)
);
//result03$.subscribe(console.log);

// desc-06
const source05$ = interval(1000);
const notifier00$ = timer(7000);
const notifier01$ = timer(5000);
const combinedNotifier00$ = merge(notifier00$, notifier01$);
const combinedNotifier01$ = race(notifier00$, notifier01$);
const result04$ = source05$.pipe(
	skipUntil(combinedNotifier01$),
	map((source05, notifier00, notifier01) => `Source-05: ${source05} - Notifier-00: ${notifier00} - Notifier-01: ${notifier01}`)
);
//result04$.subscribe(console.log);

// desc-07
const hasSuccessResponse$ = new BehaviorSubject(false);
const requestStream$ = interval(2000).pipe(map(val => `query-${val}`));
const apiResponse$ = (query) => {
	const success = Math.random() > 0.3;
	return of({query, success});
};
const result05$ = requestStream$.pipe(
	withLatestFrom(hasSuccessResponse$),
	skipWhile(([query, hasSuccess]) => hasSuccess),
	switchMap(([query, hasSuccess]) => apiResponse$(query).pipe(
		tap(res => res.success === true ? hasSuccessResponse$.next(true) : hasSuccessResponse$.next(false))
	))
);
result05$.subscribe(console.log);
