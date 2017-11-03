/* global $ */

function generateItem(itemName) {
  return `
    <li>
      <span class="js-shopping-item shopping-item">${itemName}</span>
      <div class="shopping-item-controls">
        <button class="js-shopping-item-toggle shopping-item-toggle">
          <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
          <span class="button-label">delete</span>
        </button>
      </div>
    </li>
  `;
}

function handleItemSubmit() {
  $('#js-shopping-list-form').on('submit', function(event) {
    event.preventDefault();
    const itemName = $('.js-shopping-list-entry').val();
    const itemElement = generateItem(itemName);
    $('.js-shopping-list').append(itemElement);
    itemName = $('.js-shopping-list-entry').val('');
  });
}

function handleToggleItem() {
  $('.js-shopping-list').on('click', '.js-shopping-item-toggle', function(event) {
    $(this).closest('li').find('span.js-shopping-item').toggleClass('shopping-item__checked');
  });
}




function main() {
  handleItemSubmit();
  handleToggleItem();
}

$(main);

