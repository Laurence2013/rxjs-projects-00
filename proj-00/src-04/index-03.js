/*
	desc-00: In RxJs what is distinct()? In RxJs what is distinctUntilChanged()? In RxJs what is distinctUntilKeyChanged()?
	desc-00a: rxjs-distinct, rxjs-distinctUntilChanged, rxjs-distinctUntilKeyChanged
	desc-01: 1. Filtering Duplicate User IDs from an API Response
	desc-02: 3. Filtering Consecutive API Responses with the Same Status
	goal:
	line-code-added:
*/
const { interval, of, from } = require('rxjs');
const { tap, map, mergeMap, switchMap, delay, distinct, distinctUntilChanged, distinctUntilKeyChanged } = require('rxjs/operators');

// desc-01
const fetchUser = _ => {
	const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alice' }, // Duplicate
    { id: 3, name: 'Charlie' },
    { id: 2, name: 'Bob' }, // Duplicate
  ];
	return of(users).pipe(delay(1000));
};
const result00$ = fetchUser().pipe(
	switchMap(users => from(users)),
	distinct(user => user.id),
	mergeMap(user => {
		const fetchUserDetails = (userId) => of({...user, details: 'Some details for user ' + userId}).pipe(delay(1000));
		return fetchUserDetails(user.id);
	})
);
const result01$ = fetchUser().pipe(
	mergeMap(users => from(users)),
	distinct(user => user.id),
	mergeMap(user => {
		const fetchUserDetails = (userId) => of({...user, details: 'Some details for user ' + userId}).pipe(delay(1000));
		return fetchUserDetails(user.id);
	})
);
//result01$.subscribe(console.log);

// desc-02
const apiResponses$ = of(
  { data: '...', status: 200 },
  { data: '...', status: 200 },
  { data: '...', status: 200 }, // Same status, suppressed
  { data: '...', status: 404 },
  { data: '...', status: 404 },
  { data: '...', status: 404 },
  { data: '...', status: 200 },
  { data: '...', status: 404 }, // Same status, suppressed
  { data: '...', status: 200 }
).pipe(delay(1000));

const result02$ = apiResponses$.pipe(distinctUntilChanged((prev, curr) => prev.status === curr.status));
result02$.subscribe(console.log);
