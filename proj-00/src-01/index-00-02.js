/*
	desc-00: Give more code examples using  forkJoin() operator. Simulate API requests and responses. Tag(s) rxjs-forkjoin()
	desc-01: Example 1: Fetching User Data and Posts
	desc-01-00: This example simulates fetching user data and their posts from two separate API endpoints.
	desc-02: Example 2:  Processing Multiple Files
	desc-02-00: This example simulates processing multiple files concurrently, with error handling for individual file processing.
	goal:
	line-code-added:
*/

const { forkJoin, of, from, interval, throwError } = require('rxjs');
const { take, map, switchMap, delay, catchError } = require('rxjs/operators');

// desc-01
const getUserData$ = _ => of({id: 1, name: 'Alice'}).pipe(delay(1000));
const getUserPosts00$ = userId => userId === 1 ? 
	of([{ id: 101, title: 'Post 1' }, { id: 102, title: 'Post 2' }]).pipe(delay(1000)) : throwError(_ => 'User not found').pipe(delay(500))
const getUserPosts01$ = userId => userId === 2 ? 
	of([{ id: 101, title: 'Post 1' }, { id: 102, title: 'Post 2' }]).pipe(delay(1000)) : throwError(_ => 'User not found').pipe(delay(500))

const result00$ = forkJoin({
	user: getUserData$().pipe(map(user => user.name)),
	posts: getUserData$().pipe(
		catchError(_ => of(undefined)),
		switchMap(user => user ? getUserPosts01$(user.id) : of([])),
	)
})
/*result00$.subscribe({
	next: res => console.log('Result:', res), 
	error: err => console.error('Error:', err)
});*/

// desc-02
const test$ = filename => of(filename)
const processFile$ = filename => {
	console.log(filename);
	const randomDelay = Math.random() * 2000;
	return filename === 'file2.txt' ? 
		throwError(_ => `Error processing ${filename}`).pipe(delay(randomDelay)) : of({filename, data: `Data from ${filename}`}).pipe(delay(randomDelay))
};
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
const result01$ = forkJoin(files.map(file00 => processFile$(file00).pipe(
	catchError(err => of({filename: file00, error: err}))
)))
const result02$ = forkJoin(files.map(file00 => file00));
const result02a$ = forkJoin(files.map(file00 => [file00]));
const result02b$ = forkJoin(files.map(file00 => test$(file00)));

result02b$.subscribe({
	next: res => console.log('Result:', res), 
	error: err => console.error('Error:', err)
});
