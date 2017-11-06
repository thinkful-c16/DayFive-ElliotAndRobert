'use strict';

/********************************************************
Step 1: Define objects & globals
********************************************************/

const STORE = [
  // {name: 'apples', checked: false, editing: false},
  // {name: 'oranges', checked: false, editing: false},
  // {name: 'milk', checked: true, editing: false},
  // {name: 'bread', checked: false, editing: false} 
  /* NOTE: If you uncheck these, also uncheck the call to 
  renderShoppingList() in the handleNewItemSubmit() function.*/
];
let hideChecked = false;

/********************************************************
Step 2: Define functions that have no user interaction
********************************************************/

// 1: Add new item after user submits it.
function addItemToShoppingList(itemName) {
  // console.log(`Adding '${itemName}' to shopping list`);
  STORE.push({name: itemName, checked: false, editing: false});
  renderShoppingList();
}

// 2: HideUnhide checked items.
function ToggleHideCheckedItems(hideBoxChecked) {
  // console.log('ToggleHideCheckedItems');
  hideChecked = hideBoxChecked;
  $('#js-Hide-Unhide').text($(hideChecked ? 'Unhide' : 'Hide'));
  renderShoppingList();
}

// 3: Check/Uncheck a list item.
function toggleCheckedForListItem(itemIndex) {
  // console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
  renderShoppingList();
}

// 4: Delete a list item.
function deleteListItem(itemIndex) {
  // console.log('Deleted item at index ' + itemIndex);
  STORE.splice(itemIndex, 1);
  renderShoppingList();
}

// 5: Go into edit mode for a list item.
function editModeListItem(itemIndex) {
  STORE[itemIndex].editing = true;
  renderShoppingList();
  handleEditItemSubmit(itemIndex);
}

// 6: Update the STORE object after user edits an item.
function updateEditedListItem(itemIndex, editText) {
  if(STORE[itemIndex].editing === true){
    STORE[itemIndex].name = editText;
    STORE[itemIndex].editing = false;
    renderShoppingList();
  }
}


/********************************************************
Utility housekeeping functions
********************************************************/

// Redraw the web page with the latest generated DOM.
function renderShoppingList() {
  // render the shopping list in the DOM
  // console.log('renderShoppingList ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);  
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}

// Concatenate string from generated HTML.
function generateShoppingItemsString(shoppingList) {
  // console.log('Generating shopping list element');  
  const items = shoppingList.map((item, index) => generateItemElement(item, index));    
  return items.join('');
}

// Generate new HTML for the DOM.
function generateItemElement(item, itemIndex) {
  if(item.name === '' || (hideChecked === true && item.checked === true)) {
    return;
  } else {
    return `
    <li class='js-item-index-element' data-item-index="${itemIndex}">
      <form class='js-edit-item-form-${itemIndex} ${item.editing && !item.checked ? 'showEdit'  : 'hideEdit'}'>
        <input type='text' name='js-edit-item-entry-${itemIndex}' class="js-edit-item-entry-${itemIndex}" value=${item.name}>
        <button type='submit' class='js-edit-item-button'>Done</button>
      </form>
      <span class='shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''} 
      ${item.editing && !item.checked ? 'hideText'  : 'showText'}'>${item.name}</span>
      <div class='shopping-item-controls'>
        <button class='shopping-item-toggle js-item-toggle ${item.checked ? 'shopping-item-toggle__checked' : ''}'>
          <span class='button-label'>${item.checked ? 'uncheck' : 'check'}</span>
        </button>
        <button class='shopping-item-delete js-item-delete'>
          <span class='button-label'>delete</span>
        </button>
        <button class='shopping-item-edit js-item-edit'>
          <span class='button-label'>edit</span>
        </button>
      </div>
    </li>`;
  }
}

// Return the list item index for functions which need to know it.
function getItemIndexFromElement(item) {
  let itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}
  
/********************************************************
Step 3: Define functions that da have user interaction
********************************************************/

// 1: Listen for Submit of Add item.
function handleNewItemSubmit() {
  // renderShoppingList(); /* Only needed if there is pre-loaded data, such as the apples, oranges, milk, and bread at the top. */
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    // console.log('`handleNewItemSubmit` ran');
    let newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
  });
}

// 2: Listen for clicking on Hide checked items.
function handleToggleHideChecked() {
  $('#js-hide-checked').change(function(){
    // console.log(hideChecked);
    ToggleHideCheckedItems($(this).is(':checked'));
  });
}

// 3: Listen for clicking on Check/Uncheck.
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    // console.log('`handleItemCheckClicked` ran');
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
  });
}

// 4: Listen for clicking on Delete.
function handleItemDeleteClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // console.log('`handleDeleteItemClicked` ran');
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
  });
}

// 5: Listen for clicking on Edit.
function handleItemEditClicked() {
  $('.js-shopping-list').on('click', '.js-item-edit', event => {
    // console.log('`handleItemEditClicked` ran');
    let itemIndex = getItemIndexFromElement(event.currentTarget);
    editModeListItem(itemIndex);
  });
}
  
// 6: Listen for Submit of Edited item.
function handleEditItemSubmit(itemIndex) {
  // Need the current item name here to support items with spaces.
  $(`.js-edit-item-entry-${itemIndex}`).val(STORE[itemIndex].name);
  // Listen for the edited name.
  $('.js-shopping-list').submit(function(event) {
    event.preventDefault();
    let editText = $(`.js-edit-item-entry-${itemIndex}`).val();
    updateEditedListItem(itemIndex, editText);
  });
}

/********************************************************
Step 4: Main function which calls all the others
********************************************************/

function handleShoppingList() {
  // Top-of-form user functions:
  handleNewItemSubmit();
  handleToggleHideChecked();
  // Inside-a-list-item user functions:
  handleItemCheckClicked();
  handleItemDeleteClicked();
  handleItemEditClicked();
}

// Start the main loop when the web page finishes loading.
$(document).ready(function () {
  $(handleShoppingList);
});