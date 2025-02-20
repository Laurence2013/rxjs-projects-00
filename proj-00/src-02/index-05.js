/*
	desc-00: In RxJs how to use the create()? Tag rxjs-create
	desc-01: Basic Example
	desc-02: Example: Multiple Values (Streaming)
	goal:
	line-code-added:
*/

// desc-01
const { Observable, of, throwError } = require('rxjs');
const { delay } = require('rxjs/operators');

function fakeApiRequest00$(url){
	return new Observable(subs => {
		setTimeout(() => {
			if(url === '/api/success'){
				subs.next({data: 'Success!'});
				subs.complete();
			}else if(url === '/api/error'){
				subs.error(new Error('API request failed'));
			}else{
				subs.error(new Error('Invalid API endpoint'));
			}
		}, 1000)
	});
};
function fakeApiRequest01$(url){
	return new Observable(subs => {
		const latency = Math.floor(Math.random() * 3000) + 1000;

		setTimeout(() => {
			if(url === '/api/success'){
				subs.next({data: 'Success!'});
				subs.complete();
			}
			if(url === '/api/randomError'){
				if(Math.random() < 0.5){
					subs.error(new Error('API request failed'));
				}else{
					subs.next({data: 'Success despite potential error!'});
					subs.complete();
				}
			}else{
				subs.error(new Error('Invalid API endpoint!'));
			}
		}, latency);
	});
};

// desc-02
function fakeApiRequest02$(){
	return Observable.create(subs => {
		const data = [
			{ id: 1, name: 'Alice' },
			{ id: 2, name: 'Bob' },
			{ id: 3, name: 'Charlie' }
		];
		data.forEach(user => typeof user === 'object' ? subs.next(user) : subs.next(null));
		/*data.forEach(user => {
			if(typeof user === 'object') subs.next(user); 
			subs.complete();
		});*/
	});
};
fakeApiRequest02$().subscribe({
    next: (data) => console.log('Received data:', data),
    error: (error) => console.error('Error:', error),
    complete: () => console.log('Request completed')
});
/*fakeApiRequest01$('/api/randomError').pipe(delay(2000)).subscribe({
	next: res => console.log(res),
	error: err => console.log(err)
});/*
/*fakeApiRequest00$('/api/error').subscribe({
	next: res => console.log(res),
	error: err => console.log(err)
});*/


