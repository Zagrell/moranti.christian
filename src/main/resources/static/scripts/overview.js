const shiftsTableBody = document.getElementById("shift-tbody");
const graffitiTableBody = document.getElementById("graffiti-tbody");
const foalTableBody = document.getElementById("foal-tbody");
const shiftTable = document.getElementById("shift-table");
const graffitiTable = document.getElementById("graffiti-table");
const foalTable = document.getElementById("foal-table");
const newCaseModal = document.getElementById("new-case-modal");
const newCaseSubmit = document.getElementById("new-case-submit");
const procedureDiv = document.getElementById("procedure-text-div");
const waitingListDropdown = document.getElementById("new-waitlist-case-select");
const waitingListDiv = document.getElementById("new-waitlist-div");
const normal = "normal";
const graffiti = "graffiti";
const fol = "fol";
const sanitorEndPoint = "sanitor";
let waitingList;


fetchShifts();

function fetchShifts() {
    fetch(baseURL + "/shifts")
        .then(response => response.json())
        .then(result => {
            shiftsTableBody.innerHTML = "";
            graffitiTableBody.innerHTML = "";
            foalTableBody.innerHTML = "";
            result.forEach(createShiftTableRow)
            sortTable(shiftTable)
            sortTable(graffitiTable)
            sortTable(foalTable)
        });
}

fetch(baseURL + "/caseTypes")
    .then(response => response.json())
    .then(result => {
        result.forEach(caseType => {
            const caseTypeOption = document.createElement("option");
            caseTypeOption.innerText = caseType.type;
            caseTypeOption.value = caseType.id;
            document.getElementById("new-case-type").appendChild(caseTypeOption);
        })
    });

//Venteliste
fetch(baseURL + "/waitinglist")
    .then(response => response.json())
    .then(result => {
        waitingList = result;
        waitingListNumber(waitingList)
    });

function waitingListNumber(waitingList) {
    if (waitingList.cases.length === 0) {
        document.getElementById("waiting-list-div").innerHTML = `
    <h2>Sager i kø</h2>
    <h1 id="waiting-cases-green">${waitingList.cases.length}</h1>
    `;
    } else {
        document.getElementById("waiting-list-div").innerHTML = `
    <h2 style="color: red">Sager i kø</h2>
    <h1 id="waiting-cases-red">${waitingList.cases.length}</h1>
    `;
    }
}


//Procedure
fetch(baseURL + "/procedure")
    .then(response => response.json())
    .then(result => {
        createProcedure(result)
    });


// Waitinglist cases
function waitListCaseGeneration() {
    fetch(baseURL + "/waitinglist")
        .then(response => response.json())
        .then(result => {
            if (result.cases != null && result.cases.length) {
                waitingList = result;
                waitingListDiv.style.display = "block";
                waitingListDropdown.innerHTML = "";
                let defaultOption;
                defaultOption = document.createElement("option");
                defaultOption.value = "default";
                defaultOption.defaultSelected = "true";
                defaultOption.disabled = "true";
                defaultOption.innerText = "Vælg en sag i vent";
                waitingListDropdown.appendChild(defaultOption);
                result.cases.forEach(waitingCase => {
                    const caseOption = document.createElement("option");
                    caseOption.value = waitingCase.caseNumber;
                    caseOption.innerText = waitingCase.caseNumber + " | " + waitingCase.caseType.type + " | " + waitingCase.area;
                    waitingListDropdown.appendChild(caseOption);
                })
            }
        })
}

waitingListDropdown.addEventListener("change", () => {
    const waitingCase = waitingList.cases.find(waitingCase => waitingCase.caseNumber === Number(waitingListDropdown.value))

    document.getElementById("new-case-number").value = waitingCase.caseNumber;
    document.getElementById("new-case-type").value = waitingCase.caseType.id;
    document.getElementById("new-case-area").value = waitingCase.area;

    if (waitingListDropdown.options[0].value === "default") {
        waitingListDropdown.remove(0);
    }

})

procedureDiv.addEventListener("focusout", () => {
    fetch(baseURL + "/procedure", {
        method: "PUT",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: procedureDiv.innerText
    }).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw("Kan ikke tilføje procedure");
        }
    })
})

function createProcedure(procedure) {
    procedureDiv.innerText = procedure.procedureText;
}

function createShiftTableRow(shift) {
    const shiftTableRow = document.createElement("tr");

    switch (shift.shiftType.toLowerCase()) {
        case normal:
            shiftsTableBody.appendChild(shiftTableRow);
            constructShiftTableRow(shiftTableRow, shift);
            break;
        case graffiti:
            graffitiTableBody.appendChild(shiftTableRow);
            constructShiftTableRow(shiftTableRow, shift);
            break;
        case fol:
            foalTableBody.appendChild(shiftTableRow);
            constructShiftTableRow(shiftTableRow, shift);
            break;
        default:
            throw("Kan ikke oprette tablerow");
    }
}

function constructShiftTableRow(shiftTableRow, shift) {

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

    //Definere en bil
    const carSelect = document.createElement("select");
    carSelect.className = "box minimal";
    pickCar(shift, shiftTelephoneTd, licencePlateTd, carSelect);
    carNumberTd.appendChild(carSelect);


    //Valg af sanitører
    const handymanSelect = document.createElement("select");
    handymanSelect.className = "box minimal";
    if (shift.shiftType == fol) {
        pickHandyman(shift, workTelephoneTd, handymanSelect, fol);
    } else {
        pickHandyman(shift, workTelephoneTd, handymanSelect, sanitorEndPoint);
    }
    employeeTd.appendChild(handymanSelect);

    //Prioriteter
    const prioP = document.createElement("p");
    switch (shift.priority) {
        case 101:
            prioP.innerText = "Ude";
            shiftTableRow.style.backgroundColor = "#8c1f1f";
            break;
        case 102:
            prioP.innerText = "Kører ikke";
            break;
        default:
            prioP.innerText = shift.priority;
    }
    priorityTd.appendChild(prioP);

    //Tilføj sag og sæt ledig
    if (shift.shiftCase != undefined) {

        caseNumberTd.innerText = shift.shiftCase.caseNumber;
        typeTd.innerText = shift.shiftCase.caseType.type;
        areaTd.innerText = shift.shiftCase.area;

        const removeCaseButton = document.createElement("button");
        removeCaseButton.className = "button1";
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
        addCaseButton.className = "button1";
        addCaseButton.innerText = "➕";
        const submitCaseButton = document.createElement("button");
        submitCaseButton.className = "button1";
        submitCaseButton.innerText = "Tildel Sag";
        const increasePrioButton = document.createElement("button");
        increasePrioButton.innerText = "🔽";
        increasePrioButton.className = "small-button"
        const decreasePrioButton = document.createElement("button");
        decreasePrioButton.innerText = "🔼";
        decreasePrioButton.className = "small-button"
        const editPrioDiv = document.createElement("div");
        editPrioDiv.style.display = "flex";
        editPrioDiv.style.flexDirection = "column";
        editPrioDiv.style.justifyContent = "center";
        editPrioDiv.appendChild(decreasePrioButton);
        editPrioDiv.appendChild(increasePrioButton);
        priorityTd.appendChild(editPrioDiv);
        priorityTd.style.display = "flex";
        priorityTd.style.justifyContent = "space-evenly";

        increasePrioButton.addEventListener("click", () => {
            fetch(baseURL+"/shifts/increasePrio/" + shift.id, {
                method : "PATCH"
            })
                .then(response => response.json())
                .then(result => {
                    if(result){
                        fetchShifts();
                    }
                })
        })

        decreasePrioButton.addEventListener("click", () => {
            fetch(baseURL+"/shifts/decreasePrio/" + shift.id, {
                method : "PATCH"
            })
                .then(response => response.json())
                .then(result => {
                    if(result){
                        fetchShifts();
                    }
                })
        })


        addCaseButton.addEventListener("click", () => {
            waitListCaseGeneration();
            newCaseSubmit.appendChild(submitCaseButton);
            newCaseModal.style.display = "block";
        });
        caseNumberTd.appendChild(addCaseButton);

        submitCaseButton.addEventListener("click", () => {
            const caseToCreate = {
                caseNumber: document.getElementById("new-case-number").value,
                caseType: {id: document.getElementById("new-case-type").value},
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
                    typeTd.innerText = caseToCreate.caseType.type;
                    areaTd.innerText = caseToCreate.area;
                    document.getElementById("new-case-number").value = "";
                    document.getElementById("new-case-area").value = "";
                    waitingList.cases = waitingList.cases.filter(waitingCase => waitingCase.caseNumber != caseToCreate.caseNumber);
                    waitingListNumber(waitingList);
                    fetchShifts();
                } else {
                    console.log("Error med at oprette en case")
                }
            })
        });
    }

    //Bemærkninger
    commentTd.innerHTML = `
        <div id="comment-div-${shift.id}" contenteditable="true">${shift.comment}</div>
    `;
    commentTd.addEventListener("focusout", () => {
        fetch(baseURL + "/shifts/comment/" + shift.id, {
            method: "PATCH",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: document.getElementById("comment-div-" + shift.id).innerText
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw("Kan ikke tilføje bemærkning");
            }
        })
    });

    //Slet vagt
    const deleteShiftButton = document.createElement("button");
    deleteShiftButton.className = "button1";
    deleteShiftButton.innerText = "❌";

    deleteShiftButton.addEventListener("click", () => {
        if (confirm("er du sikker på at du vil slette denne vagt?")) {
            fetch(baseURL + "/shifts/" + shift.id, {
                method: "DELETE"
            }).then(response => {
                if (response.status === 200) {
                    fetchShifts();
                }
            });

        }
    });
    actionsTd.appendChild(deleteShiftButton);

    //Append alt
    if (shift.shiftType.toLowerCase() == normal || shift.shiftType.toLowerCase() == graffiti) {
        shiftTableRow.appendChild(carNumberTd);
        shiftTableRow.appendChild(shiftTelephoneTd);
        shiftTableRow.appendChild(licencePlateTd);
    }
    shiftTableRow.appendChild(employeeTd);
    shiftTableRow.appendChild(workTelephoneTd);
    shiftTableRow.appendChild(priorityTd);
    shiftTableRow.appendChild(caseNumberTd);
    shiftTableRow.appendChild(typeTd);
    shiftTableRow.appendChild(areaTd);
    shiftTableRow.appendChild(commentTd);
    shiftTableRow.appendChild(actionsTd);

}

function pickCar(shift, shiftTelephoneTd, licencePlateTd, carSelect) {
    fetch(baseURL + "/cars")
        .then(response => response.json())
        .then(result => {
            let defaultOption;
            if (shift.car == undefined) {
                defaultOption = document.createElement("option");
                defaultOption.defaultSelected = "true";
                defaultOption.disabled = "true";
                defaultOption.innerText = "-";
                carSelect.appendChild(defaultOption);
            }
            result = result.filter(car => car.type.toLowerCase() == shift.shiftType.toLowerCase())
            result.forEach(car => {
                const carOption = document.createElement("option");
                carOption.innerText = car.carNumber;
                carOption.value = car.carNumber;

                if (shift.car != undefined && carOption.value == shift.car.carNumber) {
                    carOption.selected = true;
                    shiftTelephoneTd.innerText = shift.car.shiftPhoneNumber;
                    licencePlateTd.innerText = shift.car.licencePlate;
                }

                carSelect.appendChild(carOption);
            });

            carSelect.addEventListener("change", () => {

                fetch(baseURL + "/shifts/carchange/" + shift.id, {
                    method: "PATCH",
                    headers: {"Content-type": "application/json; charset=UTF-8"},
                    body: carSelect.value
                })
                    .then(response => {
                        if (response.status === 200) {
                            if (defaultOption != null) {
                                carSelect.remove(defaultOption);
                                defaultOption = null;
                            }
                            return response.json();
                        } else {
                            throw "Kan ikke ændre bil";
                        }
                    }).then(result => {
                    shiftTelephoneTd.innerText = result.car.shiftPhoneNumber;
                    licencePlateTd.innerText = result.car.licencePlate;
                });
            });
        });
}

function pickHandyman(shift, workPhoneNumberTd, handymanSelect, endPoint) {

    fetch(baseURL + "/employees/" + endPoint)
        .then(response => response.json())
        .then(result => {
            let defaultOption;
            if (shift.employee == undefined) {
                defaultOption = document.createElement("option");
                defaultOption.defaultSelected = "true";
                defaultOption.disabled = "true";
                defaultOption.innerText = "-";
                handymanSelect.appendChild(defaultOption);
            }
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
                        handymanSelect.removeChild(defaultOption);
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
        document.getElementById("new-case-number").value = "";
        document.getElementById("new-case-area").value = "";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newCaseModal.style.display = "none";
    newCaseSubmit.innerHTML = "";
    document.getElementById("new-case-number").value = "";
    document.getElementById("new-case-area").value = "";
}

// With help from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sort_table_number
function sortTable(tableToSort) {

    let table, rows, switching, i, x, y, shouldSwitch, xNum, yNum;
    table = tableToSort;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[5];
            y = rows[i + 1].getElementsByTagName("td")[5];
            xNum = isNaN(x.firstChild.innerText) ? 100 : Number(x.firstChild.innerText);
            yNum = isNaN(y.firstChild.innerText) ? 100 : Number(y.firstChild.innerText);
            if (xNum > yNum) {
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

document.getElementById("add-shift-button").addEventListener("click", () => {
    fetch(baseURL + "/shifts", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: normal
    }).then(response => {
        if (response.status === 200)
            fetchShifts();
    })
})

document.getElementById("add-graffiti-button").addEventListener("click", () => {
    fetch(baseURL + "/shifts", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: graffiti
    }).then(response => {
        if (response.status === 200) {
            fetchShifts();
        }
    })
})

document.getElementById("add-intern-button").addEventListener("click", () => {
    fetch(baseURL + "/shifts", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: fol
    }).then(response => {
        if (response.status === 200) {
            fetchShifts();
        }
    })
})
