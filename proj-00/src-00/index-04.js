/*
desc-00: Understanding the source observable and its inner observables, tag source-obs, inner-obs, rxjs-concatall
desc-01: Scenario: Simulating API Requests
goal:
line-code-added:
*/

const { of } = require('rxjs');
const { map, concatAll, delay } = require('rxjs/operators');

const sourceObservable$ = of([1,2,3,4,5]);

function sampFetchUserDetails(userId){
	return of(`User detail for ${userId}`).pipe(delay(1000));
};

const source$ = sourceObservable$.pipe(
	map(id => sampFetchUserDetails(id)),
	concatAll()
);

source$.subscribe(console.log);
//1: sampFetchUserDetails(sourceObservable$).subscribe(console.log);
