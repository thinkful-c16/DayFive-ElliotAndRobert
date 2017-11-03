function renderShoppingList() {
    // render the shopping list in the DOM
    console.log('`renderShoppingList` ran');
  }
  
  
  function handleNewItemSubmit() {
    // listen for users adding a new shopping list item, then add
    // to list and render list 
    console.log('`handleNewItemSubmit` ran');
  }
  
  
  function handleItemCheckClicked() {
    // listen for users checking/unchecking list items, and
    // render them checked/unchecked accordingly
    console.log('`handleItemCheckClicked` ran');
  }
  
  
  function handleDeleteItemClicked() {
    // Listen for when users want to delete an item and 
    // delete it
    console.log('`handleDeleteItemClicked` ran')
  }
  
  function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
  }
  
  $(handleShoppingList);
  