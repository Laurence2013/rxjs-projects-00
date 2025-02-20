/*
desc-00: Using the concat() function, tag rxjs-concat
desc-01: Scenario 1: Concatenating HTTP Requests
desc-02: You need to perform a series of HTTP requests where each request depends on the response of the previous one.
desc-03: Part 3, satisfied and finished this part of the challenge
goal: 
line-code-added:
*/

const { of } = require('rxjs');
const { concat, map, catchError, delay } = require('rxjs/operators');

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

const localUserAsObs$ = of(localUserData);
const localPostsAsObs$ = of(localPostsData);

const fetchEachPosts$ = (userId) => {
	return of(localPostsData.filter(post => post.userId === userId)).pipe(
		delay(1000)
	);
};
const combUserPosts00$ = localUserAsObs$.pipe(
	concat(...localUserData.map(user => fetchEachPosts$(user.id).pipe(
		map(posts => ({...user, posts}))
	)))
);
const combUserPosts01$ = localUserAsObs$.pipe(
	concat(localPostsData.map(user => fetchEachPosts$(user.id).pipe(
		map(posts => ({...user, posts}))
	)))
);

//1: localUserAsObs$.subscribe(console.log);
//2: localPostsAsObs$.subscribe(console.log);
//3a: fetchEachPosts$(2).subscribe(console.log);
//3b: fetchEachPosts$(3).subscribe(console.log);

combUserPosts01$.subscribe(data => console.log(data));

