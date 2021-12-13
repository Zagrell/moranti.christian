const shiftsTableBody = document.getElementById("shift-tbody");
const newCaseModal = document.getElementById("new-case-modal");
const newCaseSubmit = document.getElementById("new-case-submit");

fetchShifts();

function fetchShifts() {
    fetch(baseURL + "/shifts")
        .then(response => response.json())
        .then(result => {
            shiftsTableBody.innerHTML = "";
            result.map(createShiftTableRow)
            sortTable();
        });
}

fetch(baseURL + "/cases/casetypes")
    .then(response => response.json())
    .then(result => {
        result.forEach(caseType => {
            const caseTypeOption = document.createElement("option");
            caseTypeOption.innerText = caseType.type;
            caseTypeOption.value = caseType.type;
            document.getElementById("new-case-type").appendChild(caseTypeOption);
        })
    });

function createShiftTableRow(shift) {
    const shiftTableRow = document.createElement("tr");

    shiftsTableBody.appendChild(shiftTableRow);
    constructShiftTableRow(shiftTableRow, shift);
}

function constructShiftTableRow(shiftTableRow, shift) {

    console.log(shift);
    const carNumberTd = document.createElement("td");
    const shiftTelephoneTd = document.createElement("td");
    const licencePlateTd = document.createElement("td");
    const employeeTd = document.createElement("td");
    const workTelephoneTd = document.createElement("td");
    const priorityTd = document.createElement("td");
    const caseNumberTd = document.createElement("td");
    const typeTd = document.createElement("td");
    const areaTd = document.createElement("td");
    const commentTd = document.createElement("td");
    const actionsTd = document.createElement("td");

    if (shift.car != undefined) {
        carNumberTd.innerText = shift.car.carNumber;
        shiftTelephoneTd.innerText = shift.car.shiftPhoneNumber;
        licencePlateTd.innerText = shift.car.licencePlate;
    }

    const handymanSelect = document.createElement("select");
    pickHandyman(shift, workTelephoneTd, handymanSelect);
    employeeTd.appendChild(handymanSelect);

    switch (shift.priority) {
        case 101:
            priorityTd.innerText = "Ude";
            break;
        case 102:
            priorityTd.innerText = "Kører ikke";
            break;
        default:
            priorityTd.innerText = shift.priority;
    }


    if (shift.shiftCase != undefined) {

        caseNumberTd.innerText = shift.shiftCase.caseNumber;
        typeTd.innerText = shift.shiftCase.caseType.type;
        areaTd.innerText = shift.shiftCase.area;

        const removeCaseButton = document.createElement("button");
        removeCaseButton.innerText = "Sæt ledig";
        actionsTd.appendChild(removeCaseButton);
        removeCaseButton.addEventListener("click", () => {
            fetch(baseURL + "/shifts/removecase/" + shift.id, {
                method: "PATCH"
            }).then(response => {
                if (response.status === 200) {
                }
                fetchShifts();
            });
        })
    } else {
        const addCaseButton = document.createElement("button");
        addCaseButton.innerText = "➕";
        const submitCaseButton = document.createElement("button");
        submitCaseButton.innerText = "Tildel Sag";

        addCaseButton.addEventListener("click", () => {
            newCaseSubmit.appendChild(submitCaseButton);
            newCaseModal.style.display = "block";
        });
        caseNumberTd.appendChild(addCaseButton);

        submitCaseButton.addEventListener("click", () => {
            const caseToCreate = {
                caseNumber: document.getElementById("new-case-number").value,
                caseType: document.getElementById("new-case-type").value,
                area: document.getElementById("new-case-area").value
            }
            fetch(baseURL + "/shifts/addnewcase/" + shift.id, {
                method: "POST",
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify(caseToCreate)
            }).then(response => {
                if (response.status === 200) {
                    newCaseModal.style.display = "none";
                    newCaseSubmit.innerHTML = "";
                    caseNumberTd.innerText = caseToCreate.caseNumber;
                    typeTd.innerText = caseToCreate.caseType;
                    areaTd.innerText = caseToCreate.area;
                    document.getElementById("new-case-number").value = "";
                    document.getElementById("new-case-area").value = "";
                    fetchShifts();
                } else {
                    console.log("Error med at oprette en case")
                }
            })
        });


    }
    commentTd.innerText = shift.comment;


    shiftTableRow.appendChild(carNumberTd);
    shiftTableRow.appendChild(shiftTelephoneTd);
    shiftTableRow.appendChild(licencePlateTd);
    shiftTableRow.appendChild(employeeTd);
    shiftTableRow.appendChild(workTelephoneTd);
    shiftTableRow.appendChild(priorityTd);
    shiftTableRow.appendChild(caseNumberTd);
    shiftTableRow.appendChild(typeTd);
    shiftTableRow.appendChild(areaTd);
    shiftTableRow.appendChild(commentTd);
    shiftTableRow.appendChild(actionsTd);


}

function pickHandyman(shift, workPhoneNumberTd, handymanSelect) {


    fetch(baseURL + "/employees/handymen")
        .then(response => response.json())
        .then(result => {
            result.forEach(handyman => {
                const handymanOption = document.createElement("option");
                handymanOption.innerText = handyman.employeeName;
                handymanOption.value = handyman.id;

                if (shift.employee != undefined && handymanOption.value == shift.employee.id) {
                    handymanOption.selected = true;
                    workPhoneNumberTd.innerText = handyman.workPhoneNumber;
                }
                handymanSelect.appendChild(handymanOption);
            })

            handymanSelect.addEventListener("change", () => {
                fetch(baseURL + "/shifts/handymanchange/" + shift.id, {
                    method: "PATCH",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify(handymanSelect.value)
                }).then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw("Kan ikke ændre sanitør");
                    }
                }).then(result => {
                    workPhoneNumberTd.innerText = result.employee.workPhoneNumber;
                });
            });
        });
}

window.onclick = function (event) {
    if (event.target === newCaseModal) {
        newCaseModal.style.display = "none";
        newCaseSubmit.innerHTML = "";
    }
}


document.getElementsByClassName("close")[0].onclick = function () {
    newCaseModal.style.display = "none";
    newCaseSubmit.innerHTML = "";
}

// With help from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_number


function sortTable() {

    let table, rows, switching, i, x, y, shouldSwitch, xNum, yNum;
    table = document.getElementById("shift-table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[5];
            y = rows[i + 1].getElementsByTagName("td")[5];
            xNum = isNaN(x.innerText) ? 100 : Number(x.innerText);
            yNum = isNaN(y.innerText) ? 100 : Number(y.innerText);

            console.log(xNum);
            console.log(yNum);
            if (xNum > yNum) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {

            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            console.log("i was here")
            switching = true;
        }
    }
}


