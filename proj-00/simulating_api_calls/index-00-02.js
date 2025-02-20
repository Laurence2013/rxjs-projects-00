/*
	desc-00: Simulating Javascript quizzes
	desc-00a: simulating-js-quizzes-in-rxjs
	desc-01: Question 1: Total Quantity per Customer
	desc-02: Question 2: Most Popular Product and who ordered them
	desc-03: Continue to index-00-03.js
	goal:
	line-code-added:
*/

const { interval, of, from, zip, concat } = require('rxjs');
const { map, filter, switchMap, concatMap, delay, combineAll } = require('rxjs/operators');

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
        unitPrice: 14.50
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
				total: customer.items.reduce((acc, val) => acc + val.quantity, 0)
			}
		}),
		delay(1000)
	))
);
const source00a$ = of(customerOrders).pipe(
	concatMap(customers => customers.map(customer => customer.customerId)),
	concatMap(customerId => of(customerOrders).pipe(
		map(itemss => Object.values(itemss).map(c => {
			return {
				customer: customerId,
				total: c.items.reduce((acc, val) => acc + val.quantity, 0)
			}
		})),
	)),
	delay(500)
);
const source01$ = source00$.pipe(
	concatMap(customers => of(customerOrders).pipe(
		map(itemss => Object.values(itemss).map(c => c.items.reduce((acc, val) => acc + val.quantity, 0))),
		map(total => customers.tots = total),
	)),
);
//source00$.subscribe(console.log);

// desc-02
const source02$ = from(customerOrders).pipe(
	concatMap(customers => of(customers).pipe(
		map(customer => {
			return {
				cust_id: customer.customerId,
				items_bought: {
					id: customer.items.map(prods => prods.product.id),
					name: customer.items.map(prods => prods.product.name)
				}
			}
		}),
		delay(1000)
	)),
);
source02$.subscribe(console.log);
