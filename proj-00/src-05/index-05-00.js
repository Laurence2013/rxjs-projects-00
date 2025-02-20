/*
	desc-00: Give some code examples for concatMap() operator.
	desc-00a: rxjs-concatmap, chain-observables
	desc-01: 3. Game Logic with Turn-Based Actions
	goal:
	line-code-added:
*/
const { of, from, interval, timer } = require('rxjs');
const { tap, map, filter, flatMap, concatMap, mergeMap, switchMap, bufferWhen, delay, take, mergeAll } = require('rxjs/operators');

const players = ['player-01', 'player-02'];
const playerOn$ = player => player === 'player-01' ? of(player) : of('player-02');
const source00$ = of(players[0]);
const result00$ = source00$.pipe(
	concatMap(val => playerOn$(val)),
	concatMap(_ => playerOn$(players[1])),
	concatMap(_ => source00$)
);
result00$.subscribe(console.log);

