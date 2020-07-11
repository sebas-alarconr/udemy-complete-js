export default class Likes {
  constructor() {
    this.items = [];
  }

  addItem(id, title, author, img) {
    const item = {
      id,
      title,
      author,
      img,
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

  isLiked(id) {
    return this.items.findIndex(item => item.id === id) !== -1;
  }

  getNumberOfLikes() {
    return this.items.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.items));
  }

  retrieveData() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if (storage) this.items = storage;
  }
}