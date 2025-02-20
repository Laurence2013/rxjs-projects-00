/*
	desc-00: Simulating Javascript quizzes
	desc-00a: simulating-js-quizzes-in-rxjs
	desc-01: 1. Courses (with grades)
	goal:
	line-code-added:
*/

const { interval, of, from, zip, concat } = require('rxjs');
const { map, filter, switchMap, concatMap, delay, combineAll } = require('rxjs/operators');

function grades(method, url) { 
  const mockResponse = {
    '/api/users': {
			status: 200,
      body: [
        'users', // This might be removed in a real API
        { id: 1, name: 'Alice', purchasedProducts: [1, 3], nectarPoints: 520 },
        { id: 32, name: 'Bob', purchasedProducts: [1, 2, 32], nectarPoints: 2850 },
      ],
    },
    '/api/products': {
      status: 200,
      body: [
        'products', 
        {
          id: 1,
          product: 'Widget0',
          price: 19.99,
          discount: 0.10,
          category: 'electronics',
          description: 'A versatile electronic gadget.',
          inventory: 50,
          imageUrl: '/images/widget0.jpg',
          reviews: [
            { userId: 1, rating: 5, comment: 'Great product!' },
            { userId: 32, rating: 4, comment: 'Good value for the price.' }
          ]
        },
        {
          id: 2,
          product: 'SuperWidget',
          price: 49.99,
          discount: 0,
          category: 'electronics',
          description: 'The ultimate electronic device.',
          inventory: 10,
          imageUrl: '/images/superwidget.jpg',
          reviews: []
        },
        {
          id: 3,
          product: 'Book: The Art of Coding',
          price: 29.99,
          discount: 0.15, 
          category: 'books',
          description: 'A comprehensive guide to coding.',
          inventory: 200,
          imageUrl: '/images/book.jpg',
          reviews: [
            { userId: 1, rating: 4, comment: 'Informative and well-written.' }
          ]
        },
        {
          id: 32,
          product: 'Widget1',
          price: 19.99,
          discount: 0,
          category: 'electronics',
          description: 'Another great gadget.',
          inventory: 80,
          imageUrl: '/images/widget1.jpg',
          reviews: []
        }
      ],
    },
    '/api/nonexistent': { status: 404, body: { error: 'Not Found' } },
  };
	const response = mockResponse[url];
	return response ? Promise.resolve(response) : Promise.reject({status: 404, body:{error: 'Not Found'}});
}
const source00$ = forkJoin([])
