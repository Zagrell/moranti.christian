const baseURL = "http://localhost:8080";


const navBar = document.getElementById("nav-bar");

navBar.innerHTML=`

<a href="../html/overview.html"><img class="logo" src="/logo.png" alt="logo"></a>
<div class="middle">
    <a href="../html/overview.html">
        <p>Overblik</p>
    </a>
    <a href="../html/cars.html">
        <p>Biler</p>
    </a>
    <a href="../html/employees.html">
        <p>Ansatte</p>
    </a>
</div>
<div class="end">

</div>
`;


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