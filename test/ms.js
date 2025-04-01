const ms = require("@sencinion/ms");

const normal = ms("2 days 3 hours 4 minutes 5 seconds 6 milliseconds");
const parse = ms("2 days 3 hours 4 minutes 5 seconds 6 milliseconds",true);
const formatted = ms(normal,);
const parseFromatted = ms(parse,false,true);
console.log(normal) // 183845006
console.log(parse) // [{ value: 2, unit: 'gün' },{ value: 3, unit: 'saat' },{ value: 4, unit: 'dakika' },{ value: 5, unit: 'saniye' },{ value: 6, unit: 'milisaniye' }]
console.log(formatted) // 2 gün 3 saat 4 dakika 5 saniye 6 milisaniye
console.log(parseFromatted) //2 gün 3 saat 4 dakika 5 saniye 6 milisaniye or 183845006