const baseURL = "http://localhost:8080";


const navBar = document.getElementById("nav-bar");

navBar.innerHTML = `

<div class="middle">
    <a href="../html/overview.html">
        <p><b>Overblik</b></p>
    </a>
    <a href="../html/cars.html">
        <p><b>Biler</b></p>
    </a>
    <a href="../html/employees.html">
        <p><b>Ansatte</b></p>
    </a>
    <div id="week-number"></div>
</div>

`;


let currentDate = new Date();
let oneJan = new Date(currentDate.getFullYear(), 0, 1);
let numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
let result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7) - 1;
document.getElementById("week-number").innerText = "Uge: " + result.toString();


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