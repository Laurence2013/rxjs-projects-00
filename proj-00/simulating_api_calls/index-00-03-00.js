/*
	desc-00: Simulating Javascript quizzes
	desc-00a: simulating-js-quizzes-in-rxjs
	desc-01: Question 7: Calculate Average Order Value
	desc-02: Calculate average orders from the total orders?
	goal:
	line-code-added:
*/

const { interval, of, from, zip, concat, iif, forkJoin } = require('rxjs');
const { tap, map, filter, switchMap, concatMap, mergeMap, delay, combineAll, sequenceEqual, reduce, toArray } = require('rxjs/operators');

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
	concatMap(customerss => of(customerss).pipe(
		map((customers, index) => {
			return {
				custId: customers.customerId,
				orders: customers.items.reduce((acc, items) => acc + items.unitPrice, 0)
				//orderWorth: totalOrderWorth[index]
			}
		}),
		delay(100)
	))
);
const source01$ = from(source00$).pipe(
	map(customers => customers.orders),
	toArray(),
	map(orders => ({total: orders.reduce((acc, item) => acc + item, 0)}))
);
const source02$ = concat(source00$, source01$).pipe(toArray())
const source03$ = source02$.pipe(
	map(calc => {
		const total = calc.filter(ave => ave.total).map(ave => ave.total)[0];
		return calc.map((customer, index) => Object.assign(customer, {
			aveOrderValue: calc.map(ave => ave.orders ? (ave.orders / total).toFixed(2) : null)[index]
		}))
	})
);
source03$.subscribe(console.log);
