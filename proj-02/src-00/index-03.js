/*
desc-00: rxjs, quiz-08
desc-01: Main operators: publish(), muticast()
desc-02: Tags: rxjs-publish, rxjs-muticast, rxjs-quiz
goal: 
line-code-added:
*/
const { from, of, zip, interval, timer, combineLatest } = require('rxjs');
const { debounceTime, concatMap, delay, take, mapTo, map, withLatestFrom } = require('rxjs/operators');
