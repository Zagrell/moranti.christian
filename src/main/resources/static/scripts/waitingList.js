const waitingListTbody = document.getElementById("waitingList-tbody");
const waitingListModal = document.getElementById("new-waiting-case-modal");
const waitingListSubmit = document.getElementById("new-waiting-case-submit");

fetch(baseURL + "/waitinglist")
    .then(response => response.json())
    .then(waitingList => {
        waitingList.cases.map(createWaitingListTableRow);
    });

function createWaintingListTableRow(waitingList) {
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
    const acceptUpdateButton = document.createElement("button");
    const deleteCaseButton = document.createElement("button");

    actionTd.appendChild(updateCaseButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteCaseButton);

    caseNumberTd.innerText = waitingCase.caseNumber;
    caseTypeTd.innerText = waitingCase.caseType;
    caseAreaTd.innerText = waitingCase.area;

    updateCaseButton.innerText = "Rediger";
    acceptUpdateButton.innerText = "Gem";
    acceptUpdateButton.style.display = "none";
    deleteCaseButton.innerText = "Slet";

    updateCaseButton.addEventListener("click", () => {
        const caseNumberInput = document.createElement("input");
        const caseTypeInput = document.createElement("input");
        const caseAreaInput = document.createElement("input");

        caseNumberInput.type = "number";
        caseNumberInput.value = Number(caseNumberTd.innerText);
        caseNumberTd.innerText = "";

        caseTypeInput.value = caseTypeTd.innerText;
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
            caseType: caseTypeTd.firstChild.value,
            area: caseAreaTd.firstChild.value
        };

        fetch(baseURL + "/cases/" + waitingCase.caseNumber, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(caseToUpdate)
        }).then(response => {
            if (response.status === 200) {
                caseNumberTd.innerHTML = "";
                caseTypeTd.innerHTML = "";
                caseAreaTd.innerHTML = "";

                caseNumberTd.innerHTML = caseToUpdate.caseNumber.toString();
                caseTypeTd.innerHTML = caseToUpdate.caseType.toString();
                caseAreaTd.innerHTML = caseToUpdate.area.toString();

                updateCaseButton.style.display = "";
                acceptUpdateButton.style.display = "none";

                waitingCase.caseNumber = caseToUpdate.caseNumber;
            }
        })
    });

    deleteCaseButton.addEventListener("click", () => {
        fetch(baseURL + "/cases/" + waitingCase.caseNumber, {
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
    const carToCreate = {
        caseNumber: Number(document.getElementById("new-waiting-case-number").value),
        caseType: document.getElementById("new-waiting-case-type").value,
        area: document.getElementById("new-waiting-case-area")
    }

    fetch(baseURL + "/waitinglist/addcase", {

    })
}

