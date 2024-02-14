const AddButton = document.getElementById('add-button');

const AddTotal = (amount) => {

    amount = parseInt(amount);

    const TotalAmount = document.getElementById('total');

    const PreviousAmount = parseInt(TotalAmount.textContent);

    TotalAmount.textContent = amount + PreviousAmount;

};

const AddToHistory = (amount, spentOn) => {

    const SpentList = document.querySelector('.spent-list');

    SpentList.innerHTML += `<div class="list-item">
    <p>${spentOn}</p>
    <div>

        <p>${amount}</p>

        <div id="delete-button">

            <button>

                <img src="./images/delete.png" alt="Delete Button" height="23">

            </button>

        </div>

    </div>
</div>`

};

const AddFunction = () => {

    const AmountSpent = document.getElementById('amount-spent').value;

    const SpentOn = document.getElementById('spent-on').value;

    if (AmountSpent === '' || SpentOn === '') {
        return;
    }
    else {
        AddTotal(AmountSpent);
        AddToHistory(AmountSpent, SpentOn);
    }

};

AddButton.addEventListener('click', AddFunction);