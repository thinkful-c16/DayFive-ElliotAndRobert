'use strict';
const STORE = [
  {name: "apples", checked: false, editing: false},
  {name: "oranges", checked: false, editing: false},
  {name: "milk", checked: true, editing: false},
  {name: "bread", checked: false, editing: false}
];
let hideChecked = false;
let nowEditing = false;

function generateItemElement(item, itemIndex) {
  if(item.name === '' || (hideChecked === true && item.checked === true)) {
    return;
  } else {
    return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''} 
      ${nowEditing ? "editing" : ""}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle ${item.checked ? 'shopping-item-toggle__checked' : ''}">
          <span class="button-label">${item.checked ? 'uncheck' : 'check'}</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
  }
}
  
function generateShoppingItemsString(shoppingList) {
  // console.log("Generating shopping list element");  
  const items = shoppingList.map((item, index) => generateItemElement(item, index));    
  return items.join('');
}
  
function renderShoppingList() {
  // render the shopping list in the DOM
  // console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}
  
function addItemToShoppingList(itemName) {
  // console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false, editing: false});
}
  
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    // console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}
  
function toggleCheckedForListItem(itemIndex) {
  // console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}
  
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}
  
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    // console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteListItem(itemIndex) {
  // console.log("Deleted item at index " + itemIndex);
  STORE.splice(itemIndex, 1);
  console.log(STORE);
  //STORE[itemIndex].checked = !STORE[itemIndex].checked;
}
  
function handleDeleteItemClicked() {
  // Listen for when users want to delete an item and delete it
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    // console.log('`handleDeleteItemClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

function handleToggleHideChecked() {
  $('#js-hide-checked').change(function(){
    hideChecked = $(this).is(':checked')
    // console.log(hideChecked);
    renderShoppingList();
  });
}

function handleEditItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-edit`, event => {
    console.log('edit clicked');
    nowEditing = true;
    renderShoppingList();
  });
}
  
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleEditItemClicked();
  handleToggleHideChecked();
}
  
$(handleShoppingList);