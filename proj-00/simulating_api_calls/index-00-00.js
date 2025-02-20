/*
	desc-00: In RxJs give code examples 'Simulating API Calls with Dependent Data' only in Javascript.
	desc-01: Scenario 1: Sequential Dependencies
	desc-01: Continued from index-00.js
	goal:
	line-code-added:
*/

const { of, from, zip, merge } = require('rxjs');
const { map, filter, concatMap, switchMap, catchError, combineAll, delay } = require('rxjs/operators');

// desc-01-02
function fetchUserProfile02(userId){
	const profile = [
		{id: 1, name: 'Laurence'},
		{id: 2, name: 'Carl'},
		{id: 3, name: 'Lee'}
	]
	return profile.filter(user => user.id === userId);
};
function fetchUserProfile02a(userId){
	const profile = [
		{id: 1, name: 'Laurence'},
		{id: 2, name: 'Carl'},
		{id: 3, name: 'Lee'}
	]
	return from(profile).pipe(filter(user => user.id === userId))
};
function fetchUserProfile02b(){
	const arr = []
	const profile = [
		{id: 1, name: 'Laurence'},
		{id: 2, name: 'Carl'},
		{id: 3, name: 'Lee'}
	]
	profile.forEach(profile => arr.push(profile));
	return arr;
};
function fetchUserProfile02c(){
	const profile = [
		{id: 1, name: 'Laurence'},
		{id: 2, name: 'Carl'},
		{id: 3, name: 'Lee'}
	];
	return from(profile).pipe(
		map(person => of(person).pipe(delay(1000))),
		combineAll()
	);
};
function fetchUserProfile02d(userId){
	const profile = [
		{id: 1, name: 'Laurence'},
		{id: 2, name: 'Carl'},
		{id: 3, name: 'Lee'}
	];
	return from(profile).pipe(
		concatMap(person => of(person).pipe(
			filter(user => user.id === userId),
			delay(1000)
		))
	);
};
const fetchUserPosts02$ = of([
	{id: 1, title: 'Post 1'},
	{id: 2, title: 'Post 2'},
	{id: 3, title: 'Post 3'}
]);
const userIds01$ = of(1,2,3);
const userIds02$ = of(1,2,33);

const profile00$ = userIds01$.pipe(
	map(id => fetchUserProfile02(id)),
	delay(1000),
	combineAll()
);
const profile00a$ = userIds01$.pipe(
	map(id => fetchUserProfile02a(id)),
	map(profile => profile.pipe(map(person => `Person name: ${person.name}`))),
	delay(1000),
	combineAll()
);
const profile01$ = userIds02$.pipe(
	concatMap(id => fetchUserProfile02d(id)),
	concatMap(profile => fetchUserPosts02$.pipe(
		map(posts => {
			return { profile: profile, post: posts.filter(post => post.id === profile.id) }
		})
	)),
);
profile01$.subscribe(console.log);

const profile02$ = fetchUserProfile02a();
const profile03$ = fetchUserProfile02d();

