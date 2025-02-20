/*
desc-00: Using the concat() function, tag rxjs-concat
desc-01: https://www.learnrxjs.io/learn-rxjs/operators/combination/concat
desc-02: Had problem with concat() at line 25, had to change to switchMap() at line 26. It seems there is a problem when from() and concat()
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
const getPosts = userId => Promise.resolve([
	{ userId, title: 'Post 1' },
  { userId, title: 'Post 2' }
]);

const user$ = from(getUsers()).pipe(map(user => user[1]));
const userPosts$ = userId => from(getPosts(userId));

//const result$ = concat(user$, user$.pipe(map(userPosts$)));
//const result$ = user$.pipe(switchMap(user => userPosts$(user.id)));
//const result$ = concat(user$, user$.pipe(switchMap(user => userPosts$(user.id))));
const result$ = concat(user$, user$.pipe(switchMap(userPosts$)));

result$.subscribe(data => console.log(data));

//1: user$.subscribe(console.log);
//2: userPosts$(2).subscribe(console.log);

