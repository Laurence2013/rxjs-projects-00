/*
desc-00: https://www.learnrxjs.io/learn-rxjs/operators/combination/concatall, tag rxjs-concatall
desc-01: Example 3: Delay while inner observables complete
goal:
line-code-added:
*/

const { of, interval } = require('rxjs');
const { concat, concatAll, take } = require('rxjs/operators');

const obs1$ = interval(1000).pipe(take(5));
const obs2$ = interval(500).pipe(take(2));
const obs3$ = interval(2000).pipe(take(1));

const source$ = of(obs1$, obs2$, obs3$).pipe(concatAll());

source$.subscribe(console.log);
