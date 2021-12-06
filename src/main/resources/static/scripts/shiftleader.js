fetch(baseURL + "/employees/shiftleader")
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })

function setShiftLeaderValues(leader) {
    document.getElementById("shift-leader-name").innerText = leader.name
    document.getElementById("shift-leader-name").innerText = leader.workPhoneNumber;
}