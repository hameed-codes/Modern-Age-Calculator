// DOM Elements
const birthdate = document.querySelector("#birthdate");
const calBtn = document.querySelector("#cal-btn");
const resultMonth = document.querySelector("#months");
const resultYear = document.querySelector("#years");
const resultDay = document.querySelector("#days");

function calculateAge() {
    if (!birthdate.value) {
        birthdate.style.borderColor = "rgba(255, 0, 0, 0.5)";
        setTimeout(() => {
            birthdate.style.borderColor = "rgba(255, 255, 255, 0.2)";
        }, 1000);
        return;
    }

    const today = new Date();
    const birthdateObj = new Date(birthdate.value);
    
    if (birthdateObj > today) {
        alert("Please select a date in the past!");
        return;
    }

    let year = today.getFullYear() - birthdateObj.getFullYear();
    let month = today.getMonth() - birthdateObj.getMonth();
    let day = today.getDate() - birthdateObj.getDate();

    if (day < 0) {
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        day += previousMonth.getDate();
        month--;
    }

    if (month < 0) {
        year--;
        month += 12;
    }

    animateValue(resultYear, parseInt(resultYear.innerText) || 0, year, 500);
    animateValue(resultMonth, parseInt(resultMonth.innerText) || 0, month, 500);
    animateValue(resultDay, parseInt(resultDay.innerText) || 0, day, 500);
}

// Number counting animation
function animateValue(element, start, end, duration) {
    if (start === end) return;
    const range = end - start;
    const minTimer = 50;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;
  
    function run() {
        let now = new Date().getTime();
        let remaining = Math.max((endTime - now) / duration, 0);
        let value = Math.round(end - (remaining * range));
        element.innerText = value;
        if (value == end) {
            clearInterval(timer);
        }
    }
    
    timer = setInterval(run, stepTime);
    run();
}

// Event Listeners
calBtn.addEventListener("click", calculateAge);

// Allow Enter key to calculate
birthdate.addEventListener("keypress", (e) => {
    if (e.key === "Enter") calculateAge();
});
