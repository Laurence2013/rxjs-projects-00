/*
desc-00: rxjs, quiz-08
desc-01: Main operators: publish(), muticast()
desc-02: Tags: rxjs-publish, rxjs-muticast, rxjs-quiz
goal: 
line-code-added:
*/
const { from, of, zip, interval, timer, combineLatest } = require('rxjs');
const { tap, map, publish } = require('rxjs/operators');

// 2.Consider the following code snippet:
const source00$ = interval(1000).pipe(publish());
const result00$ = source00$.subscribe(val => console.log('A: ', val));
setTimeout(_ => source00$.subscribe(val => console.log('B: ', val)));
