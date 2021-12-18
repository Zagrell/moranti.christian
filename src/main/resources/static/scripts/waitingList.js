const waitingListTbody = document.getElementById("waitingList-tbody");
const newWaitingListModal = document.getElementById("new-waiting-case-modal");
const newWaitingListSubmit = document.getElementById("new-waiting-case-submit");
let caseTypes;

fetch(baseURL + "/waitinglist")
    .then(response => response.json())
    .then(waitingList => {
        waitingList.cases.map(createWaitingListTableRow);
    });

fetch(baseURL + "/caseTypes")
    .then(response => response.json())
    .then(result => {
        caseTypes = result;
        result.forEach(caseType => {
            const caseTypeOption = document.createElement("option");
            caseTypeOption.innerText = caseType.type;
            caseTypeOption.value = caseType.id;
            document.getElementById("new-waiting-case-type").appendChild(caseTypeOption);
        })
    });

function createWaitingListTableRow(waitingList) {
    const tableRow = document.createElement("tr");
    waitingListTbody.appendChild(tableRow);

    constructWaitingListTableRow(tableRow, waitingList);
}

function constructWaitingListTableRow(tableRow, waitingCase) {

    const caseNumberTd = document.createElement("td");
    const caseTypeTd = document.createElement("td");
    const caseAreaTd = document.createElement("td");
    const actionTd = document.createElement("td");


    const updateCaseButton = document.createElement("button");
    updateCaseButton.className = "button1";
    const acceptUpdateButton = document.createElement("button");
    acceptUpdateButton.className = "button1";
    const deleteCaseButton = document.createElement("button");
    deleteCaseButton.className = "button1";

    actionTd.appendChild(updateCaseButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteCaseButton);

    caseNumberTd.innerText = waitingCase.caseNumber;
    caseTypeTd.innerText = waitingCase.caseType.type;
    caseAreaTd.innerText = waitingCase.area;

    updateCaseButton.innerText = "Rediger";
    acceptUpdateButton.innerText = "Gem";
    acceptUpdateButton.style.display = "none";
    deleteCaseButton.innerText = "Slet";

    updateCaseButton.addEventListener("click", () => {
        const caseNumberInput = document.createElement("input");
        const caseTypeInput = document.createElement("select");
        caseTypeInput.className = "box minimal";
        const caseAreaInput = document.createElement("input");

        caseNumberInput.type = "number";
        caseNumberInput.value = Number(caseNumberTd.innerText);
        caseNumberTd.innerText = "";

        caseTypes.forEach(caseType => {
            const caseTypeOption = document.createElement("option");
            caseTypeOption.innerText = caseType.type;
            caseTypeOption.value = caseType.id;
            if (caseTypeOption.value == waitingCase.caseType.id)
                caseTypeOption.selected = true;
            caseTypeInput.appendChild(caseTypeOption);
        })
        caseTypeTd.innerText = "";

        caseAreaInput.type = "number";
        caseAreaInput.value = Number(caseAreaTd.innerText);
        caseAreaTd.innerText = "";

        caseNumberTd.appendChild(caseNumberInput);
        caseTypeTd.appendChild(caseTypeInput);
        caseAreaTd.appendChild(caseAreaInput);

        updateCaseButton.style.display = "none";
        acceptUpdateButton.style.display = "";
    });

    acceptUpdateButton.addEventListener("click", () => {

        const caseToUpdate = {
            caseNumber: Number(caseNumberTd.firstChild.value),
            caseType: {id: caseTypeTd.firstChild.value},
            area: caseAreaTd.firstChild.value
        };

        fetch(baseURL + "/waitinglist/updatecase/" + waitingCase.caseNumber, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(caseToUpdate)
        }).then(response => {
            if (response.status === 200) {


                caseNumberTd.innerHTML = caseToUpdate.caseNumber.toString();
                caseTypeTd.innerHTML = caseTypeTd.firstChild.options[caseTypeTd.firstChild.selectedIndex].text;
                caseAreaTd.innerHTML = caseToUpdate.area.toString();

                updateCaseButton.style.display = "";
                acceptUpdateButton.style.display = "none";

                waitingCase.caseNumber = caseToUpdate.caseNumber;
            }
        })
    });

    deleteCaseButton.addEventListener("click", () => {
        fetch(baseURL + "/waitinglist/removecase/" + waitingCase.caseNumber, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                tableRow.remove();
            } else {
                console.log(response.status);
            }
        })
    });

    tableRow.appendChild(caseNumberTd);
    tableRow.appendChild(caseTypeTd);
    tableRow.appendChild(caseAreaTd);
    tableRow.appendChild(actionTd);
}

function createCase() {
    const caseTypeSelect = document.getElementById("new-waiting-case-type");
    const caseToCreate = {
        caseNumber: Number(document.getElementById("new-waiting-case-number").value),
        caseType: {
            id: caseTypeSelect.value,
        },
        area: document.getElementById("new-waiting-case-area").value
    }

    fetch(baseURL + "/waitinglist/addcase", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(caseToCreate)
    }).then(response => {
        if (response.status === 200) {
            newWaitingListModal.style.display = "none";
            document.getElementById("new-waiting-case-number").value = "";
            document.getElementById("new-waiting-case-type").value = "";
            document.getElementById("new-waiting-case-area").value = "";
            return response.json();
        } else {
            throw "Error med at oprette en case";
        }
    }).then(caseCreated => {
        createWaitingListTableRow(caseCreated);
    })
}

newWaitingListSubmit.addEventListener("click", () => createCase());

document.getElementById("new-waiting-case-button").onclick = function () {
    newWaitingListModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target === newWaitingListModal) {
        newWaitingListModal.style.display = "none";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newWaitingListModal.style.display = "none";
}
