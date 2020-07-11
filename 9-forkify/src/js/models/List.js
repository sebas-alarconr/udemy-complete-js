import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };

    this.items.push(item);
    this.persistData();
    return item;
  }

  deleteItem(id) {
    const foundIndex = this.items.findIndex(item => item.id === id);
    this.items.splice(foundIndex, 1);
    this.persistData();
  }

  updateItem(id, newCount) {
    this.items.find(item => item.id === id).count = newCount;
    this.persistData();
  }

  deleteAll() {
    this.items = [];
    this.persistData();
  }

  getNumberOfItems() {
    return this.items.length;
  }

  persistData() {
    localStorage.setItem('list', JSON.stringify(this.items));
  }

  retrieveData() {
    const storage = JSON.parse(localStorage.getItem('list'));
    if (storage) this.items = storage;
  }
}
