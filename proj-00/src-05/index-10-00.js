/*
	desc-00: In RxJs explain in detail mergeMap() operator
	desc-00a: rxjs-mergemap
	desc-01: 1.  Fetching Posts and Comments
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, combineLatest, zip } = require('rxjs');
const { tap, map, reduce, filter, delay, take, flatMap, mergeMap, switchMap, concatMap } = require('rxjs/operators');

// desc-01
const getPosts$ = of([
	{ id: 1, title: 'Post 1' },
	{ id: 2, title: 'Post 2' },
	{ id: 3, title: 'Post 3' },
]).pipe(delay(1000));

const getCommentsForPost$ = postId => of([
	{ postId, text: 'Comment 1' },
	{ postId, text: 'Comment 2' },
]).pipe(delay(500));

const result00$ = getPosts$.pipe(
	flatMap(data01 => data01),
	mergeMap(data00 => of(data00).pipe(
		mergeMap(data02 => getCommentsForPost$(data02.id)),
	)),
);
const result00a$ = getPosts$.pipe(
	flatMap(data01 => data01),
	mergeMap(data00 => getCommentsForPost$(data00.id)),
);
const result00b$ = getPosts$.pipe(
	mergeMap(data00 => data00),
	mergeMap(data01 => getCommentsForPost$(data01.id).pipe(
		map(comments => ({...data01, comments}))
	))
);
const result01$ = getPosts$.pipe(
	flatMap(data00 => data00),
	concatMap(data01 => getCommentsForPost$(data01.id).pipe(
		map(comments => ({...data01, comments}))
	))	
);
const result01a$ = getPosts$.pipe(
	flatMap(data00 => data00),
	switchMap(data01 => getCommentsForPost$(data01.id).pipe(
		map(comments => ({...data01, comments}))
	))	
);
result00a$.subscribe(console.log);
