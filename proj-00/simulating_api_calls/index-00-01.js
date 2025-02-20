/*
	desc-00: In Javascript create a complex Object with arrays in it.
	desc-01: Grab all the team members who completed their tasks
	goal:
	line-code-added:
*/

const { interval, of, from, zip, concat } = require('rxjs');
const { map, filter, switchMap, concatMap, delay, combineAll } = require('rxjs/operators');

// desc-01
const projectData = {
    projectName: "Web App Development",
    teamMembers: [
			{1: { name: "Alice", role: "Frontend Developer" }},
			{2: { name: "Bob", role: "Backend Developer" }},
			{3: { name: "Carol", role: "Designer" }}
    ],
    tasks: [
        { title: "Design UI", completed: true, id: 1 },
        { title: "Implement API", completed: false, id: 2 },
        { title: "Write Unit Tests", completed: false, id: 3 }
    ]
};
const schedule = {
	1: {inTomorrow: false},
	3: {inTomorrow: true},
	2: {inTomorrow: false},
};
const projectInfo00$ = of(projectData).pipe(concatMap(project => project.teamMembers.map(members => members)))
const projectInfo01$ = of(projectData).pipe(concatMap(project => project.tasks.map(tasks => tasks)))
const projectInfo02$ = of(schedule).pipe(concatMap(sched => Object.keys(sched).map(key => [key, sched[key]])));
const projectInfo03$ = projectInfo01$.pipe(
	concatMap(tasks => projectInfo02$.pipe(
		map(sched => parseInt(sched[0]) === tasks.id ? {sched, tasks} : false),
		filter(projects => projects)
	)),
)
const result00$ = zip(projectInfo00$, projectInfo01$, projectInfo03$)
//result00$.subscribe(console.log);
