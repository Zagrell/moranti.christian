fetch(baseURL + "/employees/shiftleader")
    .then(response => response.json())
    .then(result => {
        setShiftLeaderValues(result);
    })

function setShiftLeaderValues(leader) {
    document.getElementById("shift-leader-name").innerText ="vagtleder: " + leader.employeeName;
    document.getElementById("shift-leader-phoneNumber").innerText ="telefon: " + leader.workPhoneNumber;
}