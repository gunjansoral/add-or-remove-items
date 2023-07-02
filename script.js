// Each list contains some ListItems
// The first List contains "Remove" button and the second List contains "Add" button
// Each ListItem has a check box and the name of the Item


class List {
  constructor(type, items) {
    this.type = type;
    this.items = items;
    this.render();
  }
  // add checked items into this.items array
  addItems(checkedItems) {
    // Convert the NodeList to an array
    const itemsToAdd = Array.from(checkedItems).map(item => ({
      id: item.id,
      isChecked: item.checked,
      label: item.nextSibling.textContent
    }));

    // Add the new items to this.items
    this.items = this.items.concat(itemsToAdd);
  }

  // remove checked items from this.items array
  removeItems(checkedItems) {
    // Convert the NodeList to an array of IDs
    const checkedIds = Array.from(checkedItems).map(item => item.id);
    // items which contain the id's of checkedItems should be removed from this.items
    this.items = this.items.filter(item => !checkedIds.includes(item.id));
  }

  // get the checked items from the list
  getCheckedItems() {
    return document.querySelectorAll(`#${this.type} ul li input[type=checkbox]:checked`);
  }

  // render the list
  render() {
    // remove previous ul element inside the list
    const ulPrev = document.getElementById(`${this.type}-items`);
    ulPrev?.remove();
    // add ul, li, input, label elements
    const ul = document.createElement('ul');
    ul.classList.add('list-container');
    ul.id = `${this.type}-items`;
    for (const item of this.items) {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const label = document.createElement('label');
      // set input.type and input.id
      input.type = "checkbox";
      input.id = item.id;
      input.className = 'checkbox-item';
      // add label's innerHtml and set for attribute
      label.for = item.id;
      label.innerText = item.label;
      // append each element accordingly
      li.append(input);
      li.append(label);
      ul.append(li);
    }
    // append the ul element
    const el = document.getElementById(this.type);
    el.append(ul);
  }
}

class ListItems {
  constructor(isChecked, label) {
    this.isChecked = isChecked;
    this.label = label;
  }
}



// there are two Lists


class App {
  items = [
    {
      id: '0',
      isChecked: false,
      label: 'Item 1'
    },
    {
      id: '1',
      isChecked: false,
      label: 'Item 2'
    },
    {
      id: '2',
      isChecked: false,
      label: 'Item 3'
    },
    {
      id: '3',
      isChecked: false,
      label: 'Item 4'
    },
    {
      id: '4',
      isChecked: false,
      label: 'Item 5'
    },
  ]
  constructor() {
    this.addedItemsList = new List('added', []);
    this.removedItemsList = new List('removed', this.items);
  }

  addItems() {
    // / get all the checked items from the removed items list
    const checkedItems = this.addedItemsList.getCheckedItems();
    if (checkedItems.length > 0) {
      // reomove all the checked items from the removed items list
      this.addedItemsList.removeItems(checkedItems);
      // add the removed items into added items list
      this.removedItemsList.addItems(checkedItems);
      // render both the lists
      this.removedItemsList.render();
      this.addedItemsList.render();
    }
  }
  removeItems() {
    // get all the checked items from the removed items list
    const checkedItems = this.removedItemsList.getCheckedItems();
    if (checkedItems.length > 0) {
      // reomove all the checked items from the removed items list
      this.removedItemsList.removeItems(checkedItems);
      // add the removed items into added items list
      this.addedItemsList.addItems(checkedItems);
      // render both the lists
      this.removedItemsList.render();
      this.addedItemsList.render();
    }
  }

  render() {
    console.log('addedItemsList: ' + this.addedItemsList + '\nremovedItemsList: ' + this.removedItemsList);
  }

  // event listeners
}
const app = new App();
// const rmvItemBtn = document.getElementById('remove-item-button')
// rmvItemBtn.addEventListener('click', app.addItems.bind(app))

const addItemBtn = document.getElementById('add-item-button');
addItemBtn.addEventListener('click', app.removeItems.bind(app));

const removeItemBtn = document.getElementById('remove-item-button');
removeItemBtn.addEventListener('click', app.addItems.bind(app));
