/*
desc-00: Using the concat() function, tag rxjs-concat
desc-01: Scenario 1: Sequential HTTP Requests
desc-02: You need to perform a series of HTTP requests where each request depends on the response of the previous one.
desc-03: Part 1, this is just me messing about with the ideas!
goal: 
line-code-added:
*/

const { from , of, concat } = require('rxjs');
const { map, catchError, delay } = require('rxjs/operators');

const localUserData = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'developer' },
  { id: 3, name: 'Charlie', role: 'manager' }
];
const localPostsData = [
  { userId: 2, title: 'My First Post' },
  { userId: 1, title: 'Welcome!' },
  { userId: 3, title: 'Project Updates' },
  { userId: 2, title: 'Development Tips' }
];

const reqLocalUser = (user) => {
	const localUser = localUserData.map(user => user.id)

	return of({
		...localUser,
		additionalInfo: 'Retrieved from localUserData'
	}).pipe(delay(1000))
};
const reqLocalPost = (id) => {
	const localPost = localPostsData.filter(user => user.userId === id)

	return of({
		...localPost,
		additionalInfo: 'Retrieved from localPostsData'
	})
};

from(reqLocalPost(3)).subscribe(console.log);
//2: from(reqLocalUser(localUserData)).subscribe(console.log);
