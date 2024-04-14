// Getting DOM elements
const AddButton = document.getElementById('add-button');
const SpentList = document.querySelector('.spent-list');

// Initialzing currentId array with its first index set to `0`.
let currentId = [0];

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

    // Updating the total amount value in local storage.
    localStorage.setItem('TotalAmount', `${TotalAmount.textContent}`);
};

/*
    The following funciton takes amount and spentOn as argument and create a item list dynamically and add it to DOM.
*/
const AddToHistory = (amount, spentOn) => {

    // If the amount and spentOn are null then do nothing and end the function by doing nothing.
    if (amount === null || spentOn === null) {
        return;
    }

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
        // Adding new items for amountSpent and spentOn and storing their values.
        localStorage.setItem(`amountSpent${currentId[currentId.length - 1]}`, `${AmountSpent.value}`);
        localStorage.setItem(`spentOn${currentId[currentId.length - 1]}`, `${SpentOn.value}`);

        // Updating the currentId in local storage.
        localStorage.setItem('currentId', `${currentId.length}`);
        
        // Updating the currentId array by pushing its length in its last index.
        currentId.push(currentId.length);
        AddTotal(AmountSpent.value);
        AddToHistory(AmountSpent.value, SpentOn.value);
        AmountSpent.value = '';
        SpentOn.value = '';
    }
};

/*
    This function returns the child index inside its parent element.
*/
const GetChildIndex = (parent, child) => {
    // Creating an array of children present inside the parent.
    let children = Array.from(parent.children);

    // Returning the index of child element.
    return children.indexOf(child);
}

/*
    If an item `currentId` is present in local storage then the user must have used this app before.
    Display the previous added values and total amount.
*/
if (localStorage.getItem('currentId')) {

    // Getting currentId from local storage.
    currentIdValue = localStorage.getItem('currentId');

    // Using for loop to update the currentId array with the numbers/index of amount and spentOn in the localStorage object.
    for (let i = 0; i <= parseInt(currentIdValue); i++) {
        currentId[i] = i;
    }

    // Getting total amount from local storage and updating this amount on screen.
    const totalAmount = localStorage.getItem('TotalAmount');
    document.getElementById('total').innerText = totalAmount;

    // Adding previously added items by user.
    for (let i = 0; i < currentId.length; i++) {
        AddToHistory(localStorage.getItem(`amountSpent${i}`), localStorage.getItem(`spentOn${i}`));
    }
}

// Adding event listener to add button to add list item and calculates total
AddButton.addEventListener('click', AddFunction);

/*
    Adding Event Listener to the SpentList.
    When user clicks on delete button then the list item will be removed form the list and the amount will also be reduced respectively.
*/
SpentList.addEventListener('click', (event) => {

    // If the clicked element is delete button  then reduce the amount of the list item from total whose delete button is clicked and remove that list-item.
    if (event.target.classList.contains('delete') || event.target.parentElement.classList.contains('delete')) {

        // Getting the index of child which is to be removed and storing it in a variable.
        const RemovingChildIndex = GetChildIndex(SpentList, event.target.closest('.list-item'));

        // Getting the amount which is to be reduced.
        const ReducedAmount = parseInt(event.target.closest('.list-item').querySelector('.amount').textContent);
        const TotalAmount = document.getElementById('total');       // Getting total amount element.
        const CurrentAmount = parseInt(TotalAmount.textContent);    // Getting current amount which is currently displaying on screen.
        TotalAmount.textContent = CurrentAmount - ReducedAmount;    // Updating the total amount on screen.
        localStorage.setItem('TotalAmount', `${CurrentAmount - ReducedAmount}`);    // Updating the total amount in local storage.

        // Removing the amountSpent and spentOn values of the element which is to be deleted from local storage.
        if (RemovingChildIndex === 0) {
            localStorage.removeItem(`amountSpent${RemovingChildIndex}`);
            localStorage.removeItem(`spentOn${RemovingChildIndex}`);
        }

        // Setting the spentOn and amount keys in localStorage object to the previous index from the deleted element index so that the flow of the array does not break.
        for (let i = RemovingChildIndex; i < currentId.length; i++) {

            const Amount = localStorage.getItem(`amountSpent${i+1}`);
            const SpentOn = localStorage.getItem(`spentOn${i+1}`);

            if (Amount !== null) {
                localStorage.setItem(`amountSpent${i}`, `${Amount}`);
                localStorage.setItem(`spentOn${i}`, `${SpentOn}`);
            }
        }

        // Removing the last element from the currentId array.
        currentId.pop(currentId.length);

        // Removing the last amountSpent and spentOn keys from localStorage since they are the copy of their respective previous keys due to the above for loop.
        localStorage.removeItem(`amountSpent${currentId.length - 1}`);
        localStorage.removeItem(`spentOn${currentId.length - 1}`);

        // Updating the currentId in local storage.
        localStorage.setItem('currentId', `${currentId.length}`);

        // Finally removing the list item element from screen.
        event.target.closest('.list-item').remove();
    }
});