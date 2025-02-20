/*
	desc-00: In RxJs what is sequenceEqual(). Tag rxjs-sequenceEqual, simulating-js-quizzes-in-rxjs
	goal:
	line-code-added:
*/

const { of, from, concat, iif, forkJoin, interval, zip } = require('rxjs');
const { tap, map, filter, concatMap, mergeMap, switchMap, delay, sequenceEqual, combineAll } = require('rxjs/operators');

function sendRequest(method, url){
	const mockResponse = {
		'/api/users': { 
			status: 200, body: [ 'users',
				{ id: 1, name: 'Alice' }, { id: 32, name: 'Bob' }
			] 
		},
		'/api/products/1': { 
			status: 200, body: [ 'products',
				{ id: 1, product: 'Widget0', price: 19.99 },
				{ id: 32, product: 'Widget1', price: 19.99 }
			] 
		},
		'/api/nonexistent': { status: 404, body: { error: 'Not Found' } },
	};
	const response = mockResponse[url];
	return response ? Promise.resolve(response) : Promise.reject({status: 404, body:{error: 'Not Found'}});
};
const result00$ = forkJoin([
	from(sendRequest('GET', '/api/users')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	),
	from(sendRequest('GET', '/api/products/1')).pipe(
		tap(_ => console.log('Receiving request...')),
		delay(1000)
	),
]);
const result00a$ = result00$.pipe(switchMap(objs => of(objs).pipe(map(api => api.filter(user => user.body[0] === 'users')))));
const result00b$ = result00$.pipe(switchMap(objs => of(objs).pipe(map(api => api.filter(user => user.body[0] === 'products')))));
const result00c$ = result00a$.pipe(map(users => users[0].body.filter(user => typeof user === 'object')));
const result00d$ = result00b$.pipe(map(products => products[0].body.filter(product => typeof product === 'object')))
const result00e$ = result00d$.pipe(
	switchMap(products => result00c$.pipe(
		map(users => {
			const userId = users.map(user => user.id);
			const productId = products.map(product => product.id);
			for(const elem in productId){
				if(userId[elem] === productId[elem]){
					return products.map((product, index) => {
						return {productInfo: product, id: users.find(user => user.id === product.id) || false};
					})}}
		})
	))
)
result00e$.subscribe(console.log);
