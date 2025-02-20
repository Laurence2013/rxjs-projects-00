/*
	desc-00: In RxJs explain in great detail groupBy() operator. Tag(s) rxjs-groupBy
	desc-01: Give some creative code examples for grouping using groupby() operator.
	desc-01-00: 1.  Dynamic Chat Room Grouping
	desc-02: 2.  Sensor Data Analysis
	desc-03: 3.  Event Stream Prioritization
	goal:
	line-code-added:
*/
const { of, from, interval, timer, combineAll, zip, scan } = require('rxjs');
const { tap, map, reduce, filter, delay, take, takeUntil, flatMap, groupBy, toArray, mergeMap, concatMap } = require('rxjs/operators');

// desc-01 -> desc-01-00
// The grouping technique is not suited here because of the shape of the object
function chatMessages00$(){
	const usernames = ['Alice', 'Bob', 'Charlie', 'David'];
	const rooms = ['general', 'random', 'jokes'];

	return {
		username: usernames[Math.floor(Math.random() * usernames.length)],
		message: 'Hello!',
		room: rooms[Math.floor(Math.random() * rooms.length)]
	}
}
const result00$ = of(chatMessages00$()).pipe(
	groupBy(grp99 => grp99.room),
	mergeMap(grp98 => grp98.pipe(
		map(grp97 => ({group: grp97}))
	))
);
// result00$.subscribe(messages => console.log(`Room: ${messages.group.room}`));

// desc-02
const sensorReadings$ = of(
  { sensorId: 'A', value: 25, timestamp: 1674989160 },
  { sensorId: 'B', value: 18, timestamp: 1674989165 },
  { sensorId: 'A', value: 28, timestamp: 1674989170 },
  { sensorId: 'C', value: 32, timestamp: 1674989175 },
  { sensorId: 'B', value: 21, timestamp: 1674989180 }
);
const valueRound = num => Math.floor(num / 10) * 10;

const result01$ = sensorReadings$.pipe(
	groupBy(snsor99 => snsor99.sensorId),
	mergeMap(snsor98 => snsor98.pipe(
		toArray()
	))
)
const result02$ = sensorReadings$.pipe(
	groupBy(vlue99 => valueRound(vlue99.value)),
	mergeMap(vlue98 => vlue98.pipe(
		map(vlue97 => ({key: vlue98.key, value: vlue97.value}))
	))
);
const result03$ = sensorReadings$.pipe(
	groupBy(vlue99 => valueRound(vlue99.value)),
	mergeMap(vlue98 => vlue98.pipe(
		reduce((acc, vlue97) => {
			acc.push({key: vlue98.key, sensor: vlue97});
			return acc;
		}, [])
	)),
);
const result03a$ = sensorReadings$.pipe(
	groupBy(vlue99 => valueRound(vlue99.value)),
	mergeMap(vlue98 => vlue98.pipe(
		reduce((_, vlue97) => ({
			key: vlue98.key,
			values: vlue97.value
		}), {})
	)),
);
const result03b$ = sensorReadings$.pipe(
	groupBy(vlue99 => valueRound(vlue99.value)),
	mergeMap(vlue98 => vlue98.pipe(
		reduce((acc, vlue97) => ({
			key: vlue98.key,
			values: [].push(vlue97.value)
		}), {key: 0, value: []})
	)),
);
const result04$ = sensorReadings$.pipe(
	groupBy(snsor99 => snsor99.sensorId),
	mergeMap(snsor98 => snsor98.pipe(
		reduce((acc, curr) => ({
			total: acc.total + curr.value,
			count: acc.count + 1
		}), {total: 0, count: 0}),
		map(result => ({sensorId: snsor98.key, aveValue: result.total / result.count}))
	))
);
result04$.subscribe(arr => console.log(JSON.stringify(arr, null, 2)));

// desc-03
const events$ = of(
  { type: 'info', message: 'System startup' },
  { type: 'warning', message: 'Disk space low' },
  { type: 'info', message: 'User logged in' },
  { type: 'critical', message: 'Database error!' },
);
const result05$ = events$.pipe(
	groupBy(ev99 => ev99.type.toUpperCase()),
	mergeMap(ev98 => ev98.pipe(
		map(ev97 => [`[${ev98.key}]`, ev97.message])
	))
);
const result05a$ = events$.pipe(
	groupBy(ev99 => ev99.type.toUpperCase()),
	mergeMap(ev98 => ev98.pipe(
		concatMap(ev97 => of(ev97).pipe(
		map(ev96 => [`[${ev98.key}]`, ev96.message])
		))
	))
);
const result06$ = events$.pipe(
	groupBy(eve99 => eve99.type),
	mergeMap(eve98 => {
		eve98.type === 'z';
		return of('hello')
	})
);
// result06$.subscribe(console.log);
