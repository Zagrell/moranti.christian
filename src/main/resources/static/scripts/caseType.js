const caseTypeTbody = document.getElementById("casetype-tbody");
const newCaseTypeModal = document.getElementById("new-casetype-modal");
const newCaseTypeSubmit = document.getElementById("new-casetype-submit");

fetch(baseURL + "/caseTypes")
    .then(response => response.json())
    .then(caseTypes => {
        caseTypes.forEach(createCaseTypeTableRow);
    });

function createCaseTypeTableRow(caseType) {
    const tableRow = document.createElement("tr")
    caseTypeTbody.appendChild(tableRow);

    constructCaseTypeTableRow(tableRow, caseType);
}

function constructCaseTypeTableRow(tableRow, caseType) {
    const caseTypeTd = document.createElement("td");
    const actionTd = document.createElement("td");

    const updateCaseTypeButton = document.createElement("button");
    updateCaseTypeButton.className = "button1";
    const acceptUpdateButton = document.createElement("button");
    acceptUpdateButton.className = "button1";
    const deleteCaseTypeButton = document.createElement("button");
    deleteCaseTypeButton.className = "button1";

    caseTypeTd.innerText = caseType.type;

    updateCaseTypeButton.innerText = "Rediger";
    acceptUpdateButton.innerText = "Gem";
    acceptUpdateButton.style.display = "none";
    deleteCaseTypeButton.innerText = "Slet";

    actionTd.appendChild(updateCaseTypeButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteCaseTypeButton);

    tableRow.appendChild(caseTypeTd);
    tableRow.appendChild(actionTd);

    updateCaseTypeButton.addEventListener("click", () => {
        const caseTypeInput = document.createElement("input");

        caseTypeInput.value = caseTypeTd.innerText;
        caseTypeTd.innerText = "";

        caseTypeTd.appendChild(caseTypeInput);

        updateCaseTypeButton.style.display = "none";
        acceptUpdateButton.style.display = "";
    });

    acceptUpdateButton.addEventListener("click", () => {

        const caseTypeToUpdate = {
            type: caseTypeTd.firstChild.value
        };

        fetch(baseURL + "/caseTypes/" + caseType.id, {
            method: "PATCH",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(caseTypeToUpdate)
        }).then(response => {
            if(response.status === 200) {
                caseTypeTd.innerHTML = "";

                caseTypeTd.innerText = caseTypeToUpdate.type;

                updateCaseTypeButton.style.display = "";
                acceptUpdateButton.style.display = "none";

            }
        })
    });

    deleteCaseTypeButton.addEventListener("click", () => {
        fetch(baseURL + "/caseTypes/" + caseType.id, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                tableRow.remove();
            } else {
                console.log(response.status);
            }
        })
    })



}

function createCaseType() {
    const caseTypeToCreate = {
        type: document.getElementById("new-casetype").value
    }

    fetch(baseURL + "/caseTypes", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(caseTypeToCreate)
    }).then(response => {
        if (response.status === 200) {
            newCaseTypeModal.style.display = "none";
            document.getElementById("new-casetype").value = "";
            return response.json()
        } else {
            console.log("Error med at oprette en sagstype")
        }
    }).then(result => {
        caseTypeToCreate.id = result.id;
        createCaseTypeTableRow(caseTypeToCreate);
    });
}

newCaseTypeSubmit.addEventListener("click", () => createCaseType());

document.getElementById("new-casetype-button").onclick = function () {
    console.log("Ostechim")
    newCaseTypeModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target === newCaseTypeModal) {
        newCaseTypeModal.style.display = "none"
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newCaseTypeModal.style.display = "none";
}