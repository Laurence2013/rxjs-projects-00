/*
	desc-00: In RxJs give code examples 'Simulating API Calls with Dependent Data' only in Javascript.
	desc-01: Scenario 1: Sequential Dependencies
	desc-02: Continue to index-01.js
	goal:
	line-code-added:
*/

const { of, from, zip, merge } = require('rxjs');
const { map, filter, switchMap, catchError, combineAll, delay } = require('rxjs/operators');

// desc-01-00
const fetchUserProfile00 = userId => of({id: userId, name: 'Laurence'});
const fetchUserPosts00 = userId => of([{id: 123, title: 'Post 1'}]);

const userId = 123;
const result00$ = fetchUserProfile00(userId).pipe(
	switchMap(user => {
		console.log('Fetched profile:', user);
		return fetchUserPosts00(user.id)
	}),
	catchError(err => {
		console.error('Error fetching user data:', error);
		return of([]);
	})
);
//result00$.subscribe(console.log);

// desc-01-01
// This will never work
const fetchUserProfile01$ = userId => of(
	{id: 1, name: 'Laurence'},
	{id: 2, name: 'Carl'},
	{id: 3, name: 'Lee'}
);
const fetchUserPosts01$ = userId => of([
	{id: 1, title: 'Post 1'},
	{id: 2, title: 'Post 2'},
	{id: 3, title: 'Post 3'}
]);
const userIds00$ = of([1,2,33])
const result01$ = userIds00$.pipe(switchMap(user => fetchUserProfile01$(user)));
//result01$.subscribe(console.log);

