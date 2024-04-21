/*
	Trying to use this nodejs code with a html page (index-02-06.html)
*/
const { fromEvent, combineLatest } = require('rxjs');
const { map } = require('rxjs/operators');

const clicks$ = fromEvent(document.getElementById('button-1'), 'click');
const moves$ = fromEvent(document, 'mousemove');

const combine$ = combineLatest(clicks$, moves$).pipe(
	map(([click, move]) => {
		const clickX = click.clientX;     
		const clickY = click.clientY;     
		const moveX = move.clientX;     
		const moveY = move.clientY;     
		return Math.sqrt(Math.pow(moveX - clickX, 2) + Math.pow(moveY - clickY, 2));
	})
);
combine$.subscribe(distance => console.log(`Distance: ${distance}`));
