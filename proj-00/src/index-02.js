/*
desc-00: Using the combineLatest() function, tag rxjs-combinelatest
goal: 
line-code-added:
*/
const { timer, combineLatest } = require('rxjs');

const timerOne$ = timer(1000, 4000);
const timerTwo$ = timer(2000, 4000);
const timerThree$ = timer(3000, 4000);

/*
combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(([timerValOne, timerValTwo, timerValThree]) => {
	console.log(`Timer One Latest: ${timerValOne}, Timer Two Latest: ${timerValTwo}, Timer Three Latest: ${timerValThree}`);
});
*/

combineLatest(timerOne$, timerTwo$, timerThree$, (one, two, three) => {
	return `Timer One (Proj) Latest: ${one}, Timer Two (Proj) Latest: ${two}, Timer Three (Proj) Latest: ${three}`;
}).subscribe(console.log);
