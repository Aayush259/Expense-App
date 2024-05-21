// Getting DOM elements
const AddButton = document.getElementById('add-button');
const SpentList = document.querySelector('.spent-list');

// Declaring expenseData and totalExpenseAmount variables which will keep track of expense data and total expense amount.
let expenseData;
let totalExpenseAmount;

// Getting expense data from local storage if it is present, else set it to empty array and set totalExpenseAmount to 0.
try {
    expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
    totalExpenseAmount = localStorage.getItem("totalExpense") || 0;
} catch (error) {
    expenseData = [];
    totalExpenseAmount = 0;
    console.log(error);
}

localStorage.setItem("expenseData", JSON.stringify(expenseData));
localStorage.setItem("totalExpense", totalExpenseAmount);

// This function returns the index of that object in expenseData whose id matches with the id passed as argument.
const GetExpenseDataIndex = (id) => {
    return expenseData.findIndex(data => data.id === id);
};

/*
    This function removes the item from screen and local storage.
*/
const RemoveItem = (expenseId) => {
    // Getting expense list item with its id.
    const ExpenseListItem = document.getElementById(expenseId);

    // Getting total amount element.
    const TotalAmountElement = document.getElementById('total');

    // Getting the amount which has to be reduced from total expense amount
    const AmountToReduce = parseInt(ExpenseListItem.querySelector('.amount').textContent);

    // Updating totalExpense Amount
    totalExpenseAmount -= AmountToReduce;

    // Updating the totalExpenseAmount on screen and local storage.
    TotalAmountElement.textContent = totalExpenseAmount;
    localStorage.setItem("totalExpense", totalExpenseAmount);

    // Removing the list item from screen and localStorage.
    ExpenseListItem.remove();

    const index = GetExpenseDataIndex(expenseId);
    if (index !== -1) {
        expenseData.splice(index, 1);
        localStorage.setItem("expenseData", JSON.stringify(expenseData));
    } else {
        console.log("Item not found");
    }
};

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

    // Return updated total amount.
    return TotalAmount.textContent;
};

/*
    The following funciton takes amount and spentOn as argument and create a item list dynamically and add it to DOM.
*/
const AddToHistory = (amount, spentOn, id) => {

    if (expenseData.length === 1) {
        // Getting clear-button.
        const ClearBtn = document.getElementById('clear-button');

        // Displaying Clearn button.
        ClearBtn.classList.remove("none-display");
    }

    // Getting spent list from DOM
    const SpentList = document.querySelector('.spent-list');

    // Dynamically generating HTML code and updating it to DOM
    SpentList.innerHTML += `
    <div class="list-item" id="${id}">
        <p>${spentOn}</p>
        <div>
            <p class="amount">${amount}</p>
            <div id="delete-button">
                <button class="delete" onclick="RemoveItem(${id})">
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
        // Creating new expense object.
        const expense = {
            id: Date.now(),
            amountSpent: AmountSpent.value,
            spentOn: SpentOn.value
        }

        // Pushing expense in expenseData array.
        expenseData.push(expense);

        // Updating local storage.
        localStorage.setItem("expenseData", JSON.stringify(expenseData));

        // Adding total amount and updating it on screen and local storage.
        totalExpenseAmount = AddTotal(AmountSpent.value);
        localStorage.setItem("totalExpense", totalExpenseAmount);

        // Adding expense data on list.
        AddToHistory(AmountSpent.value, SpentOn.value, expense.id);
        AmountSpent.value = '';
        SpentOn.value = '';
    }
};

// This function clears all the data of the app from local storage and updates the screen.
const Clear = () => {
    // Resetting expenseData and totalExpenseAmount.
    expenseData = [];
    totalExpenseAmount = 0;

    // Updating local storage.
    localStorage.setItem("expenseData", JSON.stringify(expenseData));
    localStorage.setItem("totalExpense", totalExpenseAmount);

    // Updating screen.
    document.querySelector('.spent-list').innerHTML = "";
    document.getElementById('total').textContent = 0;
};

// Displaying previous expenseData on screen.
expenseData.forEach((expense) => {
    AddToHistory(expense.amountSpent, expense.spentOn, expense.id);
});

// Displaying totalExpenseAmount.
AddTotal(totalExpenseAmount);

// Adding event listener to add button to add list item and calculates total
AddButton.addEventListener('click', AddFunction);
