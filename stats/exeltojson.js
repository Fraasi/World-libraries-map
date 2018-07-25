/* eslint-disable */
const convertExcel = require('excel-as-json').processFile;

// convertExcel('globalstats_countrydataset_oclcweb.xlsx', 'about.json', { sheet: 1 });
convertExcel('globalstats_countrydataset_oclcweb.xlsx', 'library-data.js', { sheet: 2 });
console.log('dones')
