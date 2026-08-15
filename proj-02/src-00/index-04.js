/*
desc-00: rxjs, quiz-
desc-01: Main operators: AsyncSubject()
desc-02: Tags: rxjs-asyncsubject
goal: 
line-code-added:
*/
const { AsyncSubject } = require('rxjs');

// 1. Predict the output of the following code

const sub = new AsyncSubject();
//sub.subscribe(console.log);
sub.next(123);
//sub.subscribe(console.log);
sub.next(444);
sub.complete();

// 2. Quiz 1: Triggering the Emission
// Goal: Make the subscriber log the final calculated 100

const calcSubject = new AsyncSubject();
calcSubject.subscribe(val => console.log(`Result: ${val}`));
calcSubject.next(25);
calcSubject.next(250);
calcSubject.next(2500);
calcSubject.complete()
