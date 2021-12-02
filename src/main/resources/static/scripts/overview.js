const shiftsTableBody = document.getElementById("watch-tbody");

fetch(baseURL + "/watchleader")
    .then(response => response.json())
    .then(setShiftLeaderValues)

function setShiftLeaderValues(leader) {
    document.getElementById("watch-leader-name").innerText = leader.name
    document.getElementById("watch-leader-name").innerText = leader.workPhoneNumber;
}


fetch(baseURL + "/watches")
    .then(response => response.json())
    .then(result => {
        result.map(createShiftTableRow)
    })


function createShiftTableRow(shift) {
    const shiftTableRow = document.createElement("tr");
    //matchTableRow.id = matches.id;

    shiftsTableBody.appendChild(shiftTableRow);

    constructShiftTableRow(shiftTableRow, shift);

}

function constructShiftTableRow(shiftTableRow, shift) {

    const carNumberTd = document.createElement("td");
    const shiftTelephoneTd = document.createElement("td");
    const licencePlateTd = document.createElement("td");
    const employeeTd = document.createElement("td");
    const workTelePhoneTd = document.createElement("td");
    const priorityTd = document.createElement("td");
    const caseNumberTd = document.createElement("td");
    const typeTd = document.createElement("td");
    const areaTd = document.createElement("td");
    const commentTd = document.createElement("td");

    carNumberTd.innerText = shift.car.carNumber;
    shiftTelephoneTd.innerText = shift.car.shiftPhoneNumber;
    licencePlateTd.innerText = shift.car.licencePlate;
    employeeTd.innerText = shift.employee.name;
    workTelePhoneTd.innerText = shift.employee.workTelephoneNumber;
    priorityTd.innerText = shift.priority;

    if(shift.case !== null){
        caseNumberTd.innerText = shift.case.caseNumber;
        typeTd.innerText = shift.case.type;
        areaTd.innerText = shift.case.area;
    }else{
        const addCaseButton = document.createElement("button");
        addCaseButton.innerText = "➕";
        addCaseButton.addEventListener("click", () => {
           //TO DO FOR ADD CASE TASK
        });

    }
    commentTd.innerText = shift.comment;


    shiftTableRow.appendChild(carNumberTd);
    shiftTableRow.appendChild(shiftTelephoneTd);
    shiftTableRow.appendChild(licencePlateTd);
    shiftTableRow.appendChild(employeeTd);
    shiftTableRow.appendChild(workTelePhoneTd);
    shiftTableRow.appendChild(priorityTd);
    shiftTableRow.appendChild(caseNumberTd);
    shiftTableRow.appendChild(typeTd);
    shiftTableRow.appendChild(areaTd);
    shiftTableRow.appendChild(commentTd);

}


