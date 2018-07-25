/* eslint-disable */

const fs = require('fs')
const data = require('./library-data')
const population = require('./worldpopulation')

const cleaned = []
data.forEach((el) => {
	if (el.Location) {
		const obj = {}

		const pop = (population.find(pop => pop.country === el.Location))
		obj.Population = Boolean(pop) ? Number(pop.population) : 'N/A'
		// if (pop) obj.Population = pop.population
		// else { console.log(el.Location)}

		obj.Name = el.Location
		obj.Museums = el.Museums
		obj.Publishers = el.Publishers
		obj['Expenditures-Academic'] = el['Expenditures-Academic']
		obj['Expenditures-Public'] = el['Expenditures-Public']
		obj['Expenditures-National'] = el['Expenditures-National']
		obj['Expenditures-School'] = el['Expenditures-School']
		obj['Expenditures-Special'] = el['Expenditures-Special']
		obj['Librarians-Academic'] = el['Librarians-Academic']
		obj['Librarians-Public'] = el['Librarians-Public']
		obj['Librarians-National'] = el['Librarians-National']
		obj['Librarians-School'] = el['Librarians-School']
		obj['Librarians-Special'] = el['Librarians-Special']
		obj['Libraries-Academic'] = el['Libraries-Academic']
		obj['Libraries-Public'] = el['Libraries-Public']
		obj['Libraries-National'] = el['Libraries-National']
		obj['Libraries-School'] = el['Libraries-School']
		obj['Libraries-Special'] = el['Libraries-Special']
		obj['Users-Academic'] = el['Users-Academic']
		obj['Users-Public'] = el['Users-Public']
		obj['Users-National'] = el['Users-National']
		obj['Users-School'] = el['Users-School']
		obj['Users-Special'] = el['Users-Special']
		obj['Volumes-Academic'] = el['Volumes-Academic']
		obj['Volumes-Public'] = el['Volumes-Public']
		obj['Volumes-National'] = el['Volumes-National']
		obj['Volumes-School'] = el['Volumes-School']
		obj['Volumes-Special'] = el['Volumes-Special']
		cleaned.push(obj)
	}
})

const counted = []
cleaned.forEach(el => {
	const obj = {}
	let expenditures = 0
	let librarians = 0
	let libraries = 0
	let users = 0
	let volumes = 0
	Object.keys(el).forEach(key => {
		if (key.includes('Expenditures') && typeof el[key] === 'number') expenditures += el[key]
		if (key.includes('Librarians') && typeof el[key] === 'number') librarians += el[key]
		if (key.includes('Libraries') && typeof el[key] === 'number') libraries += el[key]
		if (key.includes('Users') && typeof el[key] === 'number') users += el[key]
		if (key.includes('Volumes') && typeof el[key] === 'number') volumes += el[key]
	})

	obj.Name = el.Name
	obj.Museums = el.Museums
	obj.Publishers = el.Publishers
	obj.Expenditures = expenditures
	obj.Librarians = librarians
	obj.Libraries = libraries
	obj.Users = users
	obj.Volumes = volumes
	obj.Population = el.Population
	counted.push(obj)
})


fs.writeFile('library-data-cleaned.js', '/* eslint-disable */\n export default ' + JSON.stringify(counted, null, 2), (err) => {
	if (err) throw err;
	console.log('The file has been saved!');
});
