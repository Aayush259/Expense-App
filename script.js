// Getting DOM elements
const AddButton = document.getElementById('add-button');
const SpentList = document.querySelector('.spent-list');

/*
    The following function takes the amount as argument and adds to the total amount and display it.
*/
const AddTotal = (amount) => {

    // Typecasting the amount to integer
    amount = parseInt(amount);

    // Getting totalAmount element from DOM
    const TotalAmount = document.getElementById('total');

    // TypeCasting the totalAmount to integer and stores it in previous amount constant variable
    const PreviousAmount = parseInt(TotalAmount.textContent);

    // Updating the total amount value and display it on screen
    TotalAmount.textContent = amount + PreviousAmount;
};

/*
    The following funciton takes amount and spentOn as argument and create a item list dynamically and add it to DOM.
*/
const AddToHistory = (amount, spentOn) => {

    // Getting spent list from DOM
    const SpentList = document.querySelector('.spent-list');

    // Dynamically generating HTML code and updating it to DOM
    SpentList.innerHTML += `
    <div class="list-item">
        <p>${spentOn}</p>
        <div>
            <p class="amount">${amount}</p>
            <div id="delete-button">
                <button class="delete">
                    <img src="./images/delete.png" alt="Delete Button" height="23">
                </button>
            </div>
        </div>
    </div>`

};

/*
    This function calls AddTotal and AddToHistory functions based on certain conditions.
*/
const AddFunction = () => {

    // Getting Amouht Spent
    const AmountSpent = document.getElementById('amount-spent');

    // Getting SpentOn
    const SpentOn = document.getElementById('spent-on');

    // If any one of the input elements is empty then do nothing otherwise call AddTotal and AddToHistory functions
    if (AmountSpent.value === '' || SpentOn.value === '') {
        return;
    }
    else {
        AddTotal(AmountSpent.value);
        AddToHistory(AmountSpent.value, SpentOn.value);
        AmountSpent.value = '';
        SpentOn.value = '';
    }
};

// Adding event listener to add button to add list item and calculates total
AddButton.addEventListener('click', AddFunction);

/*
    Adding Event Listener to the SpentList.
    When user clicks on delete button then the list item will be removed form the list and the amount will also be reduced respectively.
*/
SpentList.addEventListener('click', (event) => {

    // If the clicked element is delete button  then reduce the amount of the list item from total whose delete button is clicked and remove that list-item.
    if (event.target.classList.contains('delete') || event.target.parentElement.classList.contains('delete')) {

        const ReducedAmount = parseInt(event.target.closest('.list-item').querySelector('.amount').textContent);
        const TotalAmount = document.getElementById('total');
        const CurrentAmount = parseInt(TotalAmount.textContent);
        TotalAmount.textContent = CurrentAmount - ReducedAmount;
        event.target.closest('.list-item').remove();
    }
});