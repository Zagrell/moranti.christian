const baseURL = "http://localhost:8080";
const navBar = document.getElementById("nav-bar");

navBar.innerHTML = `


    <div id="shift-leader-div">
        <div class="shift-leader-info">
        <ul>
            <li>Vagtleder:</li>
            <li id="shift-leader-name"></li>
        </ul>
        </div>
        <div class="shift-leader-info">
        <ul>
            <li>Telefonnummer:</li>
            <li id="shift-leader-phoneNumber"></li>
        </ul>
        </div>
    </div>
    <div class="middle">
    <a href="../html/overview.html">
        <p><b>Overblik</b></p>
    </a>
    <a href="../html/waitinglist.html">
        <p><b>Venteliste</b></p>
    </a>
    <a href="../html/cars.html">
        <p><b>Biler</b></p>
    </a>
    <a href="../html/employees.html">
        <p><b>Ansatte</b></p>
    </a>
    <a href="../html/caseType.html">
        <p><b>Sagstyper</b></p>
    </a>
    <div id="week-number"></div>
</div>

`;

//Lavet med hjælp fra https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
function getWeekNumber(date) {
    // Copy date so don't modify original
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay()||7));
    // Get first day of year
    let yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1));
    // Calculate full weeks to the nearest Thursday and Return week number
    return  Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}
let result = getWeekNumber(new Date());
document.getElementById("week-number").innerText = "Uge " + result.toString();


function escapeHTML(string) {

    if (!string) {
        return "";
    }
    string = string.replace(`&`, "&amp;");
    string = string.replace(`>`, "&gt;");
    string = string.replace(`<`, "&lt;");
    string = string.replace(`"`, "&quot;");
    string = string.replace(`/`, "&#039;");
    return string;
}