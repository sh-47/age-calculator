
const birthdate = document.getElementById("birthdate");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");
const error = document.getElementById("error");

birthdate.max = getLocalDate();

function getLocalDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

calculateBtn.addEventListener("click", function () {
    error.textContent = "";
    result.style.display = "none";

    if (!birthdate.value) {
        error.textContent = "Please select your date of birth.";
        return;
    }

    const [year, month, day] = birthdate.value
        .split("-")
        .map(Number);

    const dob = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dob > today) {
        error.textContent = "Date of birth cannot be in the future.";
        return;
    }

    let years = today.getFullYear() - year;
    let months = today.getMonth() - (month - 1);
    let days = today.getDate() - day;

    if (days < 0) {
        months--;

        const previousMonthDays = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        ).getDate();

        days += previousMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("years").textContent = years;
    document.getElementById("months").textContent = months;
    document.getElementById("days").textContent = days;

    document.getElementById("message").textContent =
        `You are ${years} years, ${months} months and ${days} days old!`;

    result.style.display = "block";
});
