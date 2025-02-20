/*
	desc-00: Simulating Javascript quizzes
	desc-00a: simulating-js-quizzes-in-rxjs
	desc-01: Filter Orders by Quantity, most ordered first
	desc-02: Question 4: Filter Orders by Category
	desc-03: Question 5: Advanced: Group Items by Brand
	desc-04: Question 9: Find Most Expensive Item per Customer
	goal:
	line-code-added:
*/

const { interval, of, from, zip, concat, iif, forkJoin } = require('rxjs');
const { tap, map, filter, switchMap, concatMap, mergeMap, delay, combineAll, sequenceEqual, reduce } = require('rxjs/operators');

const customerOrders = [{
	customerId: "CUST001",
  items: [{
		product: {id: "PROD123",name: "Wireless Headphones",category: "Electronics",brand: "SoundWave"},
		quantity: 2, 
		unitPrice: 15.99
	},
  {
		product: {id: "PROD456",name: "Running Shoes",category: "Apparel",brand: "SwiftStride"},
		quantity: 1,
		unitPrice: 29.95
	},
  {
		product: {id: "PROD789",name: "Coffee Maker",category: "Appliances",brand: "BrewMaster"},
    quantity: 3,
		unitPrice: 8.50
  },
  {
		product: {id: "PROD012",name: "Backpack",category: "Luggage",brand: "PackIt"},
   	quantity: 1,
   	unitPrice: 12.99
	}]
  },
  {
		customerId: "CUST002",
		items: [{
			product: {id: "PROD789",name: "Coffee Maker",category: "Appliances",brand: "BrewMaster"},
      quantity: 3,
      unitPrice: 9.99
		},
			{
			product: {id: "PROD012",name: "Backpack",category: "Luggage",brand: "PackIt"},
      quantity: 1,
      unitPrice: 39.99
      },
      {
				product: {id: "PROD345",name: "Smart Watch",category: "Electronics",brand: "TechWear"},
				quantity: 2,
        unitPrice: 19.99
      },
      {
        product: {id: "PROD567",name: "Socks",category: "Apparel",brand: "ComfyFeet"},
        quantity: 4,
        unitPrice: 6.99
      }
    ]
  },
  {
    customerId: "CUST003",
    items: [{
        product: {id: "PROD345",name: "Smart Watch",category: "Electronics",brand: "TechWear"},
        quantity: 1,
        unitPrice: 49.99
      },
      {
        product: {id: "PROD890",name: "Water Bottle",category: "Outdoor",brand: "H2Go"},
        quantity: 5,
        unitPrice: 3.75
      },
      {
        product: {id: "PROD234",name: "Sunglasses",category: "Accessories",brand: "SunGuard"},
        quantity: 2,
        unitPrice: 140.50
      }
    ]
  }
];
// desc-01
const source00$ = from(customerOrders).pipe(
	concatMap(customers => of(customers).pipe(
		map(customer => {
			return {
				id: customer.customerId,
				asc: customer.items
					.sort((itemA, itemB) => itemB.quantity - itemA.quantity)
					.map(item => {
						return {
							product: item.product.name,
							quantity: item.quantity
						}
					})
			}
		}),
		delay(1000)
	))
);
//source00$.subscribe(console.log);
// desc-02
const source01$ = from(customerOrders).pipe(
	map(customerss => of(customerss).pipe(
		map(customers => customers.items.reduce((accum, item) => {
			const category = item.product.category;
			
			!accum[category] ? accum[category] = [] : [];
			accum[category].push(item.product.name);

			return accum;
		}, {})),
		delay(1000)
	)),
	combineAll()
);
const source02$ = source01$.pipe(
	map(products => products.reduce((accum, product) => {
		!accum.keys ? accum.keys = [] : false;
		accum.keys.push(Object.keys(product));

		return accum;
	}, {})),
	map(productData => [...new Set(productData.keys.flat())]),
	delay(1000)
);
const source03$ = source01$.pipe(
	switchMap(products => source02$.pipe(
		map(keys => {
			return keys.reduce((accum, key) => {
				!accum[key] ? accum[key] = [] : [];
				accum[key].push(products.map(product => product[key]).flat());
				accum[key] = accum[key].flat().filter(data => data);

				return accum;
			}, {})
		})
	))
);
//source03$.subscribe(value => console.log(JSON.stringify(value, null, 2)));
// desc-04
const source04$ = from(customerOrders).pipe(
	concatMap(customers => of(customers).pipe(
		map(customer => {
			return {
				id: customer.customerId,
				price: customer.items.sort((priceA, priceB) => priceB.unitPrice - priceA.unitPrice)[0]
			}
		}),
		delay(1000)
	))
);
//source04$.subscribe(console.log);
// desc-03
const source05$ = from(customerOrders).pipe(
	concatMap(customers => of(customers).pipe(
		map(customrs => customrs.items.reduce((accum, item) => {
			const brand = item.product.brand;

			accum[brand] = [];
			item.product.brand === brand ? accum[brand].push(item.product.name) : null;

			return accum;
		}, {})),
		delay(1000)
	))
);
source05$.subscribe(console.log);
