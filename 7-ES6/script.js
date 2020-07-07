/*******************************************************************************
* Let and Const
*******************************************************************************/
/*
var -> function scoped
let -> block scoped
const -> also block scoped but you can't mutate it
*/

/*
// Assigning / Mutating
// ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';

console.log(name5, age5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;
*/

/*
// Scoping
// ES5
function driversLicense5(passedTest) {
  if (passedTest) {
    var firstName = 'John';
    var yearOfBirth = 1990;
  }

  console.log(firstName + ' born in ' + yearOfBirth + 'is now officially allowed to drive a car.');
}

driversLicense5(true);

// ES6
function driversLicense6(passedTest) {
  let firstName
  const yearOfBirth = 1990;

  if (passedTest) {
    firstName = 'John';
  }

  console.log(firstName + ' born in ' + yearOfBirth + 'is now officially allowed to drive a car.');
}

driversLicense6(true);
*/

/*******************************************************************************
* Blocks and IIFEs
*******************************************************************************/
/*
// ES5
(function() {
  var c = 3;
})()

// ES6
{
  const a = 1;
  let b = 2;
  console.log(a, b)
}
*/

/*******************************************************************************
* Strings
*******************************************************************************/
/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function callAge(year) {
  return 2020 - year;
}

console.log(firstName + ' ' + lastName + ' is ' + callAge(yearOfBirth) + ' years old');
console.log(`${firstName} ${lastName} is ${callAge(yearOfBirth)} years old`);

const name = `${firstName} ${lastName}`;
console.log(name.startsWith('J'));
console.log(name.endsWith('th'));
console.log(name.includes(' '));
console.log(`${name} `.repeat(5));
*/

/*******************************************************************************
* Arrow functions
*******************************************************************************/
/*
const years = [1990, 1965, 1992, 1984];

// ES5
var ages5 = years.map(function(year) {
  return 2020 - year;
});
console.log(ages5);

// ES6
let ages = years.map(year => 2020 - year);

ages = years.map((year, index) => `Age in index ${index}: ${year}`);

ages = years.map((year, index) => {
  const now = new Date().getFullYear();
  const age = now - year;
  return `Age in index ${index}: ${age}`;
});

console.log(ages);
*/

/*
// ES5
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function () {
    var self = this;
    document.querySelector('.green').addEventListener('click', function() {
      var str = 'This is box number ' + self.position + ' and it is ' + self.color;
      alert(str);
    });
  }
}

// box5.clickMe();

const box = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener('click', () => {
      const str = `This is box number ${this.position} and it is ${this.color}`;
      alert(str);
    });
  }
}

box.clickMe();
*/
/*
function Person(name) {
  this.name = name;
}

Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(friend) {
    return this.name + ' is friends with ' + friend;
  }, this)
  console.log(arr);
}

Person.prototype.myFriends6 = function(friends) {
  var arr = friends.map(friend => `${this.name} is friends with ${friend}`);
  console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

// new Person('John').myFriends5(friends);
new Person('John').myFriends6(friends);
*/

/*******************************************************************************
* Destructuring
*******************************************************************************/
/*
// ES5
var john = ['John', 26];
// var name = john[0];
// var age = john[1];

// ES6
const [name, age] = john;

console.log(name);
console.log(age);

const obj = {
  firstName: 'John',
  lastName: 'Smith',
};

const {firstName, lastName} = obj;
const {firstName: a, lastName: b} = obj;

console.log(firstName, lastName);
console.log(a, b);


function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [currentAge, retirement] = calcAgeRetirement(1990);

console.log(currentAge, retirement);
*/

/*******************************************************************************
* Arrays
*******************************************************************************/
/*
const boxes = document.querySelectorAll('.box');

// ES5
var boxes5arr = Array.prototype.slice.call(boxes);

boxes5arr.forEach(function(box) {
  box.style.backgroundColor = 'dodgerblue';
});

// ES6
const boxesArr = Array.from(boxes);
boxesArr.forEach((box) => box.style.backgroundColor = 'red');

// ES5
for(var i = 0; i < boxes5arr.length; i++) {
  if (boxes5arr[i].className === 'box blue') {
    continue;
  }
  boxes5arr[i].textContent = 'New text';
}

// ES6
for(const currentBox of boxesArr) {
  if (currentBox.className.includes('blue')) {
    continue;
  }

  currentBox.textContent = 'Again new text';
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function(age) {
  return age >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
console.log(ages.findIndex(age => age >= 18));
console.log(ages.find(age => age >= 18));
*/

/*******************************************************************************
* Spread Operator
*******************************************************************************/
/*
function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);

// ES5
var ages = [18, 30, 12, 21];

var sum2 = addFourAges.apply(this, ages);
console.log(sum2);

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const reunion = [...familySmith, 'Lily',...familyMiller];
console.log(reunion);

// It works also with oder structures as NodeLists
const heading = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

const all = [heading, ...boxes];

Array.from(all).forEach((element) => element.style.color = 'purple');
*/

/*******************************************************************************
* Rest parameters
*******************************************************************************/
/*
// ES5
function isFullAge5() {
  var arrayArgs = Array.prototype.slice.call(arguments);

  arrayArgs.forEach(function(arg) {
    console.log((2020 - arg) >= 18);
  })
}

isFullAge5(1990, 2005, 1992, 1986, 2010);

// ES6
function isFullAge(...years) {
  years.forEach(year => console.log((2020 - year) >= 18));
}

isFullAge(1990, 2005, 1992, 1986, 2010);

function isFullAge5(limit) {
  var arrayArgs = Array.prototype.slice.call(arguments, 1);

  arrayArgs.forEach(function(arg) {
    console.log((2020 - arg) >= limit);
  })
}

isFullAge5(21, 1990, 2005, 1992, 1986, 2010);
console.log('\n');

// ES6
function isFullAge(limit, ...years) {
  years.forEach(year => console.log((2020 - year) >= limit));
}

isFullAge(21, 1990, 2005, 1992, 1986, 2010);
*/

/*******************************************************************************
* Default parameters
*******************************************************************************/
/*
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName ? lastName : 'Smith';
  this.nationality = nationality ? nationality : 'USA';
};

var john = new SmithPerson('John', 1990);
var emily = new SmithPerson('Emily', 1993, 'Diaz', 'Spanish');

// ES6
function DanePerson(firstName, yearOfBirth, lastName = 'Dane', nationality = 'USA') {
  this.firstName = firstName;
  this.yearOfBirth = yearOfBirth;
  this.lastName = lastName;
  this.nationality = nationality;
};

var johnD = new DanePerson('John', 1990);
var emilyD = new DanePerson('Emily', 1993, 'Diaz', 'Spanish');
*/

/*******************************************************************************
* Maps
*******************************************************************************/
/*

// Why choosing Maps over Objects?
// 1. You can use anything as key
// 2. Maps are iterable
// 3. Size property is super useful

const question = new Map();

question.set('text', 'What is the official name of the latest major JS version?');

question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');

question.set('correct', 3);
question.set(true, 'Correct answer :D');
question.set(false, 'Wrong, please try again.');

console.log(question.get('text'));
// console.log(question.size);

if (question.has(4)) {
  // question.delete(4);
  // console.log('Yes, it has answer 4.\n ');
}

// question.clear();

question.forEach((value, key) => {
  // console.log(`This is ${key}, and it's set to ${value}.`);
});

for (let [key, value] of question.entries()) {
  if (typeof(key) === 'number') {
    console.log(`Answer ${key} is ${value}.`);
  }
}

const answer = Number(prompt('Type the number of the answer'));

console.log(question.get(answer === question.get('correct')));
*/

/*******************************************************************************
* Classes
*******************************************************************************/
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person5.prototype.calcAge = function() {
  var age = new Date().getFullYear() - this.yearOfBirth;
  console.log(age);
}

var john = new Person5('John Smith', 1990, 'Teacher');

// ES6
class Person {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calcAge() {
    const age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
  }

  static greeting() {
    console.log('Hey there!');
  }
}

var emily = new Person('Emily Dane', 1992, 'Designer');
Person.greeting();
*/

/*******************************************************************************
* Inheritance
*******************************************************************************/
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person5.prototype.calcAge = function() {
  return new Date().getFullYear() - this.yearOfBirth;
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals) {
  Person5.call(this, name, yearOfBirth, job);
  this.olympicGames = olympicGames;
  this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
  this.medals++;
}

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
console.log(johnAthlete5.calcAge());

// ES6
class Person {
  constructor(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
  }

  calcAge() {
    return new Date().getFullYear() - this.yearOfBirth;
  }
}

class Athlete extends Person {
  constructor(name, yearOfBirth, job, olympicGames, medals) {
    super(name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
  }

  wonMedal() {
    this.medals++;
  }
}

var emilyAthlete = new Athlete('Emily Dane', 1992, 'Swimmer', 2, 20);
*/


/*******************************************************************************
* CODING CHALLENGE

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area) ✅
2. Average age of each town's park (formula: sum of all ages/number of parks) ✅
3. The name of the park that has more than 1000 trees ✅
4. Total and average length of the town's streets ✅
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal ✅

All the report data should be printed to the console. ✅

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc. ✅
*******************************************************************************/
/*
class CityElement {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }
}

class Park extends CityElement {
  constructor(name, buildYear, numberOfTrees, area) {
    super(name, buildYear);
    this.numberOfTrees = numberOfTrees;
    this.area = area;
  }

  getAge() {
    return new Date().getFullYear() - this.buildYear;
  }

  getDensity() {
    return this.numberOfTrees / this.area;
  }
}

class Street extends CityElement {
  constructor(name, buildYear, streetLength, size = 3) {
    super(name, buildYear);
    this.streetLength = streetLength;
    this.size = Street.CLASSIFICATION.get(size);
  }

  static CLASSIFICATION = new Map()
    .set(1, 'tiny')
    .set(2, 'small')
    .set(3, 'normal')
    .set(4, 'big')
    .set(5, 'huge');

  static SIZES = {
    TINY: 1,
    SMALL: 2,
    NORMAL: 3,
    BIG: 4,
    HUGE: 5
  }
}

const park1 = new Park('Park 1', 1980, 100, 500);
const park2 = new Park('Park 2', 1990, 500, 800);
const park3 = new Park('Park 3', 2000, 1000, 1200);
const park4 = new Park('Park 4', 2100, 1200, 1500);
const parks = [park1, park2, park3, park4];

const street1 = new Street('Street 1', 1940, 2.36);
const street2 = new Street('Street 2', 1950, 5.45, Street.SIZES.TINY);
const street3 = new Street('Street 3', 1960, 0.55, Street.SIZES.SMALL);
const street4 = new Street('Street 4', 2005, 10.87, Street.SIZES.HUGE);
const streets = [street1, street2, street3, street4];

const getAverageParkAge = (...parks) => parks.reduce(
  (previous, current) => previous + current.getAge(), 0
) / parks.length;

const findPopulatedPark = (parks) => parks.find((park) => park.numberOfTrees > 1000);

const getAverageStreetLength = (...streets) => streets.reduce(
  (previous, current) => previous + current.streetLength, 0
) / streets.length;

const getTotalLength = (...streets) => streets.reduce(
  (previous, current) => previous + current.streetLength, 0
);

{
  const averageAge = getAverageParkAge(park1, park2, park3, park4);
  const {name: nameOfPopulatedPark, numberOfTrees: numberOfTreesOfPopulatedPark} = findPopulatedPark(parks);
  console.log('=== === === PARKS REPORT === === ===');
  console.log(`Our ${parks.length} park(s) have an average age of ${averageAge} years.`);
  parks.forEach((park) => console.log(`${park.name} has a tree density of ${park.getDensity()} trees/km\u00B2`));
  console.log(`${nameOfPopulatedPark} has more than 1000 trees with ${numberOfTreesOfPopulatedPark} trees`);
}

{
  const averageStreetLength = getAverageStreetLength(street1, street2, street3, street4);
  const totalStreetLength = getTotalLength(street1, street2, street3, street4);
  console.log('=== === === STREETS REPORT === === ===');
  console.log(`Our ${streets.length} street(s) have a total an average length of ${totalStreetLength}km and a average of ${averageStreetLength}km.`);
  streets.forEach(({name, buildYear, size}) => console.log(`${name}, built in ${buildYear}, is a ${size} street.`));
}
*/