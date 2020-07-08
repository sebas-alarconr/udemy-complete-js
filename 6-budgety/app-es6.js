const budgetController = (() => {
  let data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
    month: '',
    year: '',
  };

  class Expense {
    constructor(id, description, value, percentage = -1) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = percentage;
    }

    calculatePercentage(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round(this.value * 100 / totalIncome);
      } else {
        this.percentage = -1;
      }
    }

    getPercentage() {
      return this.percentage;
    }
  }


  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  const calculateTotal = (type) =>
    data.totals[type] = data.allItems[type].reduce((previous, current) => previous + current.value, 0);

  return {
    addItem: (type, description, value) => {
      let newItem, ID;
      ID = data.allItems[type].length ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 1;

      if (type === 'exp') {
        newItem = new Expense(ID, description, value);
      } else {
        newItem = new Income(ID, description, value);
      }

      data.allItems[type].push(newItem);

      return newItem;
    },
    calculateBudget: () => {
      calculateTotal('exp');
      calculateTotal('inc');

      data.budget = data.totals.inc - data.totals.exp;

      if (data.totals.inc > 0) {
        data.percentage = Math.round(data.totals.exp * 100 / data.totals.inc);
      } else {
        data.percentage = -1;
      }

      window.localStorage.setItem('budget', JSON.stringify(data));
    },
    calculatePercentages: () => {
      data.allItems.exp.forEach((expense) => expense.calculatePercentage(data.totals.inc));
      window.localStorage.setItem('budget', JSON.stringify(data));
    },
    deleteItem: (type, id) => {
      const indexOfItem = data.allItems[type].findIndex((element) => element.id === Number(id));

      if (indexOfItem !== -1) {
        data.allItems[type].splice(indexOfItem, 1);
      }
    },
    getBudget: () => ({
      budget: data.budget,
      totalIncome: data.totals.inc,
      totalExpense: data.totals.exp,
      percentage: data.percentage,
    }),
    getPercentages: () => data.allItems.exp.map((expense) => expense.getPercentage()),
    getDate: ()=> ({
      month: data.month,
      year: data.year,
    }),
    setDate: (month, year) => {
      data.month = month;
      data.year = year;
    },
    setData: (existingData) => {
      data = existingData;
    },
    updateItem: (item, type) => {
      const indexOfItem = data.allItems[type].findIndex((element) => element.id === item.id);

      if (type === 'inc') {
        data.allItems[type][indexOfItem] = new Income(item.id, item.description, item.value);
      } else {
        data.allItems[type][indexOfItem] = new Expense(item.id, item.description, item.value, item.percentage);
      }
    },
  }
})();

const UIController = (() => {

  const DOMStrings = {
    description: '.add__description',
    value: '.add__value',
    type: '.add__type',
    button: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    totalIncome: '.budget__income--value',
    totalExpenses: '.budget__expenses--value',
    totalBudget: '.budget__value',
    expensePercentage: '.budget__expenses--percentage',
    container: '.container.clearfix',
    itemPercentage: '.item__percentage',
    monthLabel: '.budget__title--month',
  };

  const formatNumber = (num, type) => {
    let numSplit, int, dec;
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split('.');
    int = numSplit[0];

    if (int.length > 3) {
      int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, int.length)}`;
    }

    dec = numSplit[1];

    return `${(type === 'inc' ? '+' : '-')} ${int}.${dec}`;
  };

  const nodeListForEach = (list, callback) => {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  }

  return {
    addListItem: (budgetItem, type) => {
      let html, newHtml, elementContainer;

      if (type === 'inc') {
        elementContainer = DOMStrings.incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        elementContainer = DOMStrings.expenseContainer;
        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      newHtml = html.replace('%id%', budgetItem.id).replace('%description%', budgetItem.description).replace('%value%', formatNumber(budgetItem.value, type));

      document.querySelector(elementContainer).insertAdjacentHTML('beforeend', newHtml);
    },
    changeType: () => {
      const fields = document.querySelectorAll(`${DOMStrings.type},${DOMStrings.value},${DOMStrings.description}`);

      nodeListForEach(fields, (element) => element.classList.toggle('red-focus'));

      document.querySelector(DOMStrings.button).classList.toggle('red');
    },
    clearFields: () => {
      let fields, fieldsArr;
      fields = document.querySelectorAll(`${DOMStrings.value}, ${DOMStrings.description}`);
      fieldsArr = Array.from(fields);
      fieldsArr.forEach((field) => field.value = '');
      fieldsArr[0].focus();
    },
    displayBudget: (budgetObj) => {
      const type = budgetObj.budget >= 0 ? 'inc' : 'exp';

      document.querySelector(DOMStrings.totalBudget).textContent = formatNumber(budgetObj.budget, type);
      document.querySelector(DOMStrings.totalIncome).textContent = formatNumber(budgetObj.totalIncome, 'inc');
      document.querySelector(DOMStrings.totalExpenses).textContent = formatNumber(budgetObj.totalExpense, 'exp');

      if (budgetObj.percentage >= 0) {
        document.querySelector(DOMStrings.expensePercentage).textContent = `${budgetObj.percentage}%`;
      } else {
        document.querySelector(DOMStrings.expensePercentage).textContent = '---';
      }
    },
    displayPercentages: (percentages) => {
      const percentagesFields = document.querySelectorAll(DOMStrings.itemPercentage);

      nodeListForEach(percentagesFields, (current, index) => {
        if (percentages[index] > 0) {
          current.textContent = `${percentages[index]}%`;
        } else {
          current.textContent = '---';
        }
      });
    },
    displayDate: (month, year) => (
      document.querySelector(DOMStrings.monthLabel).textContent = `${month} ${year}`
    ),
    getInput: () => ({
        description: document.querySelector(DOMStrings.description).value,
        value: Number(document.querySelector(DOMStrings.value).value),
        type: document.querySelector(DOMStrings.type).value,
    }),
    getDOMStrings: () => DOMStrings,
    removeListItem: (id) => document.getElementById(id).remove(),
    validateInput: (event) => {
      if (Number(event.target.value) < 0) {
        document.querySelector(DOMStrings.value).value = 0;
      }
    }
  }
})();

const controller = ((budgetCtrl, UICtrl) => {
  const addItem = () => {
    let input, addedItem;
    /*
      1. Get field input data
      2. Add the item to the budget controller
      3. Add the item to the UI
      4. Clear fields
      5. Calculate and update budget
      6. Calculate and update expense percentages
    */
    input = UICtrl.getInput();

    if (input.description && input.value) {
      addedItem = budgetCtrl.addItem(input.type, input.description, input.value);
      UICtrl.addListItem(addedItem, input.type);
      UICtrl.clearFields();
      updateBudget();
      updatePercentages();
    }
  };

  const deleteItem = (event) => {
    const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
       const splittedID = itemID.split('-');
       budgetCtrl.deleteItem(splittedID[0], splittedID[1]);
       UICtrl.removeListItem(itemID);
       updateBudget();
       updatePercentages();
    }
  };

  const setupEventListeners = () => {
    const DOMStrings = UICtrl.getDOMStrings();

    document.querySelector(DOMStrings.button).addEventListener('click', addItem);
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        addItem();
      }
    });

    document.querySelector(DOMStrings.container).addEventListener('click', deleteItem);
    document.querySelector(DOMStrings.type).addEventListener('change', UICtrl.changeType);
    document.querySelector(DOMStrings.value).addEventListener('input', UICtrl.validateInput);
  };

  const updateBudget = () => {
    /*
      1. Calculate the budget
      2. Return the budget
      3. Display the budget
    */
   budgetCtrl.calculateBudget();
   UICtrl.displayBudget(budgetCtrl.getBudget());
  };

  const updatePercentages = () => {
    budgetCtrl.calculatePercentages();
    UICtrl.displayPercentages(budgetCtrl.getPercentages());
  };

  const updateDate = () => {
    let date, year, month, months;
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    UICtrl.displayDate(months[month], year);
    budgetCtrl.setDate(month, year);
  }

  return {
    init: () => {
      updateDate();
      const currentDate = budgetCtrl.getDate();
      const localStorageBudget = JSON.parse(window.localStorage.getItem('budget'));

      if (localStorageBudget && localStorageBudget.month === currentDate.month && localStorageBudget.year === currentDate.year) {
        budgetCtrl.setData(localStorageBudget);
        localStorageBudget.allItems.inc.forEach((income) => {
          budgetCtrl.updateItem(income, 'inc');
          UICtrl.addListItem(income, 'inc')
        });
        localStorageBudget.allItems.exp.forEach((expense) => {
          budgetCtrl.updateItem(expense, 'exp');
          UICtrl.addListItem(expense, 'exp')
        });
        updateBudget();
        updatePercentages();
      }

      UICtrl.displayBudget(budgetCtrl.getBudget());
      setupEventListeners();
    }
  }
})(budgetController, UIController);


controller.init();