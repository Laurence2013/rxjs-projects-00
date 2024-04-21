/*
desc-00: Using the concat() function, tag rxjs-concat
desc-01: https://www.learnrxjs.io/learn-rxjs/operators/combination/concat
desc-02: Trying to find the problem at index-03-00.js
desc-03: Found the problem, you cannot use map() with from(), where from() is transforming a Promise to an Observable. Intead you have to use switchMap(),
	like in index-03-00.js, which solves the issue. You can use map() with getPosts01.
goal: 
line-code-added:
*/

// Scenario 4: Loading Local JSON Data Sequentially
const { concat, from, of, switchMap } = require('rxjs');
const { map } = require('rxjs/operators');

const getUsers = () => Promise.resolve([
	{ id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
]);
const getPosts00 = userId => Promise.resolve([
	{ userId, title: 'Post 1' },
  { userId, title: 'Post 2' }
]);
const getPosts01 = userId => [
	{ userId, title: 'Post 1' },
  { userId, title: 'Post 2' }
];

const user$ = from(getUsers()).pipe(map(user => user[0]));
const userPosts$ = userId => getPosts01(userId);

//const test$ = user$.pipe(map(user => userPosts$(user.id)));
//test$.subscribe(console.log);

//const result$ = concat(user$, user$.pipe(map(user => userPosts$(user.id))));
const result$ = concat(user$, user$.pipe(map(userPosts$)));

result$.subscribe(data => {
	console.log(data);
});

//1: user$.subscribe(console.log);
//2: userPosts$(2).subscribe(console.log);

