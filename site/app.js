let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = '#FFFFFF';
tg.MainButton.color = '#2cab37';

let balance = 0;
let incomePerSecond = 0;

document.addEventListener("DOMContentLoaded", function() {
    openTab(event, 'clicker');
});
updateIncomePerSecond()

function openTab(event, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";

    // Удаляем обработчик клика перед добавлением нового
    document.getElementById('appleContainer').removeEventListener('click', clickHandler);

    if (tabName === "clicker") {
        document.getElementById('appleContainer').addEventListener('click', clickHandler);
    }
}

function clickHandler(event) {
    let balance = parseInt(document.getElementById('balance').textContent);
    balance += 1;
    document.getElementById('balance').textContent = balance;

    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text');
    floatingText.textContent = '+1';
    floatingText.style.left = `${event.clientX - this.getBoundingClientRect().left}px`;
    floatingText.style.top = `${event.clientY - this.getBoundingClientRect().top}px`;

    this.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 1000);
}

// Объект, содержащий информацию о фермах
let farms = {
    smallFarm: { price: 500, income: 1 },
    mediumFarm: { price: 1000, income: 2 }
    // Добавьте другие фермы по аналогии
};

// Функция для покупки фермы
function buyFarm(price, income) {
    let balance = parseInt(document.getElementById('balance').textContent);
    if (balance >= price) {
        balance -= price;
        document.getElementById('balance').textContent = balance;

        // Увеличиваем доход и обновляем его отображение
        let currentIncome = parseInt(document.getElementById('income').textContent);
        currentIncome += income;
        document.getElementById('income').textContent = currentIncome;

        alert("Ферма куплена успешно! Теперь ваш доход увеличен на " + income + " яблока в секунду.");
    } else {
        alert("У вас недостаточно яблок для покупки фермы.");
    }
}
function updateIncomePerSecond() {
    setInterval(function() {
        let balance = parseInt(document.getElementById('balance').textContent);
        balance += incomePerSecond; // увеличиваем баланс на доход в секунду
        document.getElementById('balance').textContent = balance;
    }, 1000); // вызываем каждую секунду (1000 миллисекунд)
}
