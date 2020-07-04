/*
Almost everything is an object.

Remember Primitives? (string, undefined, numbers, booleans, null). They are not objects.

The rest (Arrays, functions, objects, dates, wrappers) are objects.

- Every JS object has a prototype property, which makes inheritance possible in JS.
- The prototype property of an object is where we put methods and properties that we
want other objects to inherit.
- The Constructor's prototype property is NOT the prototype of the Constructor
itself, it's the prototype of ALL instances that are created through it.
- When a certain method (or property) is called, the search starts in the object itself,
and if it cannot be found, the search moves on to the object's prototype. This continues
until the method is found: prototype chain.
*/

/*******************************************************************************
* Function constructor
*******************************************************************************/
// Object literal
// var john = {
//   name: 'John',
//   yearOfBirth: 1990,
//   job: 'teacher'
// };

/*
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person.prototype.calculateAge = function() {
  console.log(2020 - this.yearOfBirth)
}
*/

/*
Instantiation:
The new operator creates an empty object and allows the this operator to point
the created empty object instead the global object
*/

/*
var john = new Person('John', 1990, 'teacher');
var mark = new Person('Jane', 1992, 'designer');
var jane = new Person('Mark', 1986, 'retired');

john.calculateAge()
jane.calculateAge()
mark.calculateAge()
*/

/*******************************************************************************
* Object.create
*******************************************************************************/
/*
var personProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  }
}

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

var jane = Object.create(personProto, {
  name: {value: 'Jane'},
  yearOfBirth: {value: 1969},
  job: {value: 'designer'}
})
*/

/*******************************************************************************
* Primitives vs Objects
*******************************************************************************/
/*
// Primitive variables hold the data inside the variable itself
// Object variables don't contain the object, they contain a reference to the place in memory where the objects sits. Only points to the object.

// Primitives
var a = 23;
var b = a;
a = 46;

console.log(a, b)

// Objects
var obj1 = {
  name: 'john',
  age: 26
};

var obj2 = obj1;
obj1.age = 30;

console.log(obj1, obj2);

// Functions
var age = 27;
var obj = {
  name: 'Jonas',
  city: 'Lisbon'
};

function change (a,b) {
  a = 30;
  b.city = 'San Francisco';
}

change(age, obj);

console.log(age);
console.log(obj);
*/

/*******************************************************************************
* Passing functions as arguments
*******************************************************************************/
/*
- A function is an instance of the Object type
- A function behaves like another object
- We can store functions in a variable
- We can pass a function as an argument to another function
- We can return a function from a function
*/
/*
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];

  for (var i = 0; i< arr.length; i++) {
    arrRes.push(fn(arr[i]))
  }

  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (isFullAge(el) && el <= 81 ) {
    return Math.round(206.9 - (0.67 * el));
  } else {
    return -1;
  }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var maxHeartRates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(maxHeartRates);
*/

/*******************************************************************************
* Passing functions as arguments
*******************************************************************************/
/*
function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(name + ', can you please explain what UX design is?');
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log('What subject do you teach, ' + name + '?');
    }
  } else {
    return function (name) {
      console.log('Hello' + name + 'what do you do?');
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
teacherQuestion('John');
designerQuestion('Jane');
interviewQuestion('teacher')('Mark');
*/

/*******************************************************************************
* Immediately Invoked Function Expressions (IIFE)
*******************************************************************************/
/*
(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);
*/

/*******************************************************************************
* Closures
*******************************************************************************/
// An inner function has always access to the variables and parameters of its
// outer function, even after the outer function has returned.
/*
function retirement(retirementAge) {
  var a = ' years left until retirement';

  return function(yearOfBirth) {
    var age  = 2020 - yearOfBirth;
    console.log((retirementAge - age) + a);
  }
}

var retirementGermany = retirement(65);
var retirementUS = retirement(66);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990);

function interviewQuestion(job) {
  return function (name) {
    if (job === 'designer') {
      console.log(name + ', can you please explain what UX design is?');
    } else if (job === 'teacher') {
      console.log('What subject do you teach, ' + name + '?');
    } else {
      console.log('Hello' + name + 'what do you do?');
    }
  }
}

interviewQuestion('teacher')('John');
*/

/*******************************************************************************
* Bind, call, apply
*******************************************************************************/
/*
var john = {
  name: 'John',
  age: 26,
  job: 'teacher',
  presentation: function (style, timeOfDay) {
    if (style === 'formal'){
      console.log('Good ' + timeOfDay + ', ladies and gentlemen. I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
    } else if (style === 'friendly') {
      console.log('Hey, what\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
    }
  }
};

var emily = {
  name: 'Emily',
  age: 35,
  job: 'designer'
}

john.presentation('formal', 'morning');
john.presentation.call(emily, 'friendly', 'afternoon');
john.presentation.apply(emily, ['formal', 'night']);

var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


var years = [2002, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
  var arrRes = [];

  for (var i = 0; i< arr.length; i++) {
    arrRes.push(fn(arr[i]))
  }

  return arrRes;
}

function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var isFullAgeJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(isFullAgeJapan);
*/

/*******************************************************************************
* CODING CHALLENGE
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A
question should include:

a) question itself
b) the answers from which the player can choose the correct one (choose an
adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the
possible answers (each question should have a number) (Hint: write a method for
the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user
should input the number of the correct answer such as you displayed it on
Task 4.

6. Check if the answer is correct and print to the console whether the answer is
correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their
code. So make sure that all your code is private and doesn't interfere with the
other programmers code (Hint: we learned a special technique to do exactly that)
*******************************************************************************/
/*
(function () {
  var Question = function(question, possibleAnswers, correctAnswer) {
    this.question = question;
    this.possibleAnswers = possibleAnswers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.print = function () {
    console.log('Question: ' + this.question);
    console.log('\nPossible answers:');

    for(var i = 0 ; i < this.possibleAnswers.length; i++) {
      console.log((i+1) + ': ' + this.possibleAnswers[i]);
    }
  }

  Question.prototype.checkValidAnswer = function(givenAnswer) {
    Number(givenAnswer) === this.correctAnswer ?
      console.log('That is correct! Congrats :D') :
      console.log('Sorry, that is incorrect :C');
  }

  var q1 = new Question(
    'Which was the last year of WWII?',
    [1992, 1993, 1970, 1945],
    4
  );
  var q2 = new Question(
    'Which is the biggest score in a FIFA World Cup match?',
    [
      '2014 - Brazil vs Germany -> 1 - 7',
      '1994 - USA vs Ghana -> 2 - 0',
      '2007 - Chile vs Mexico -> 7 - 0',
    ],
    1
  );

  var questions = [q1, q2];
  var selectedQuestion = questions[Math.round(Math.random() * (questions.length - 1))];
  selectedQuestion.print();

  var playerAnswer = prompt('Which is the correct answer?');
  selectedQuestion.checkValidAnswer(playerAnswer);
})();
*/

/*******************************************************************************
* CODING CHALLENGE
--- Expert level ---

8. After you display the result, display the next random question, so that the
game never ends (Hint: write a function for this and call it right after
displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the
option to quit the game if the user writes 'exit' instead of the answer. In this
case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is
correct, add 1 point to the score (Hint: I'm going to use the power of closures
for this, but you don't have to, just do this with the tools you feel
more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*******************************************************************************/
/*
(function () {
  var isPlaying = true;
  var playerAnswer = '';
  var selectedQuestion;
  var score = 0;

  var updateScore = function () {
    score += 1;
  }

  var Question = function(question, possibleAnswers, correctAnswer) {
    this.question = question;
    this.possibleAnswers = possibleAnswers;
    this.correctAnswer = correctAnswer;
  }

  Question.prototype.print = function () {
    console.log('\nQuestion: ' + this.question);
    console.log('\nPossible answers:');

    for(var i = 0 ; i < this.possibleAnswers.length; i++) {
      console.log((i+1) + ': ' + this.possibleAnswers[i]);
    }
  };

  Question.prototype.checkValidAnswer = function(givenAnswer) {
    if (Number(givenAnswer) === this.correctAnswer) {
      console.log('\nThat is correct! Congrats :D');
      updateScore();
    } else {
      console.log('\nSorry, that is incorrect :C');
    }
  }

  var q1 = new Question(
    'Which was the last year of WWII?',
    [1992, 1993, 1970, 1945],
    4
  );
  var q2 = new Question(
    'Which is the biggest score in a FIFA World Cup match?',
    [
      '2014 - Brazil vs Germany -> 1 - 7',
      '1994 - USA vs Ghana -> 2 - 0',
      '2007 - Chile vs Mexico -> 7 - 0',
    ],
    1
  );

  var questions = [q1, q2];

  function showQuestion() {
    selectedQuestion = questions[Math.round(Math.random() * (questions.length - 1))];
    selectedQuestion.print();

    playerAnswer = prompt('Which is the correct answer?');
  }

  function validateAnswer () {
    if (playerAnswer !== null && playerAnswer.toLowerCase() !== 'exit') {
      selectedQuestion.checkValidAnswer(playerAnswer);
    } else {
      isPlaying = false;
      console.log('\nEnd of the game. Thanks for playing.')
    }
  }

  function showScore() {
    if (isPlaying) {
      console.log('Your current score is ' + score + ' points');
    } else {
      console.log('Your final score is ' + score + ' points');
    }
    console.log('==============================');
  }

  while(isPlaying) {
    showQuestion();
    validateAnswer();
    showScore();
  }
})();
*/