/*
	desc-00: Give some RxJs code examples using switchMap(), give scenarios and examples. Use arrays as data for switchMap()
	desc-00a: Tag(s) rxjs-switchmap()
	desc-01: Dynamic Data Fetching (API Calls)
	goal:
	line-code-added:
*/

const { of, from } = require('rxjs');
const { ajax } = require('rxjs/ajax');
const { switchMap, map, catchError } = require('rxjs/operators');

const userIds = [1, 5, 12, 99];
const mockUserDetails = {
  1: { id: 1, name: 'Alice', email: 'alice@example.com' },
  5: { id: 5, name: 'Bob', email: 'bob@example.com' },
  12: { id: 12, name: 'Charlie', email: 'charlie@example.com' }
};

const fetchUserDetails00$ = (userId) => {
	const user = of(mockUserDetails).pipe(
		map(getId => ({
			id: Object.keys(getId).filter(id => id === userId.toString()),
			vals: Object.values(getId).filter(user => user.id === userId)
		})),
	);
	return user;
};
const fetchUserDetails01$ = userId => mockUserDetails[userId] ? of(mockUserDetails[userId]) : of(null);

const fetchUserDetails02$ = (userId) => {
	const apiUrl = `/api/users/${userId}`;

	return ajax(apiUrl).pipe(
		map(res => res.response),
		catchError(err => {
			console.error(`Error fetching user details for ID ${userId}:`, err);
			return of(null);
		})
	);
};

const result00$ = from(userIds).pipe(
	switchMap(userId => fetchUserDetails01$(userId))
);

result00$.subscribe(console.log);
