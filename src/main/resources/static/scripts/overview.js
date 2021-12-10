const shiftsTableBody = document.getElementById("shift-tbody");
const newCaseModal = document.getElementById("new-case-modal");

fetch(baseURL + "/shifts")
    .then(response => response.json())
    .then(result => {
        result.map(createShiftTableRow)
        sortTable();
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

    if (shift.car != undefined) {
        carNumberTd.innerText = shift.car.carNumber;
        shiftTelephoneTd.innerText = shift.car.shiftPhoneNumber;
        licencePlateTd.innerText = shift.car.licencePlate;
    }

    if (shift.employee != undefined) {
        employeeTd.innerText = shift.employee.name;
        workTelephoneTd.innerText = shift.employee.workPhoneNumber;
    }

    priorityTd.innerText = shift.priority;

    if(shift.case != undefined){
        caseNumberTd.innerText = shift.case.caseNumber;
        typeTd.innerText = shift.case.caseType;
        areaTd.innerText = shift.case.area;
    } else {
        const addCaseButton = document.createElement("button");
        addCaseButton.innerText = "➕";
        addCaseButton.addEventListener("click", () => {
           newCaseModal.style.display = "block";
        });
        caseNumberTd.appendChild(addCaseButton);

        document.getElementById("new-case-submit")
            .addEventListener("click", () => {
                const caseToCreate = {
                    caseNumber: document.getElementById("new-case-number").value,
                    caseType: document.getElementById("new-case-type").value,
                    area: document.getElementById("new-case-area").value
                }
                fetch(baseURL + "/cases", {
                    method: "POST",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: JSON.stringify(caseToCreate)
                }).then(response => {
                    if (response.status === 200) {
                        newCaseModal.style.display = "none";
                        caseNumberTd.innerText = caseToCreate.caseNumber;
                        typeTd.innerText = caseToCreate.caseType;
                        areaTd.innerText = caseToCreate.area;
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


}

window.onclick = function (event) {
    if (event.target === newCaseModal) {
        newCaseModal.style.display = "none";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newCaseModal.style.display = "none";
}

// With help from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_number

function sortTable() {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("shift-table");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[5];
            y = rows[i + 1].getElementsByTagName("td")[5];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


