const employeesTableBody = document.getElementById("employees-tbody");
const newEmployeeModal = document.getElementById("new-employee-modal");
const newEmployeeSubmit = document.getElementById("new-employee-submit");

fetch(baseURL + "/employees")
    .then(response => response.json())
    .then(result => {
        result.map(createEmployeeTableRow);
    });

function createEmployeeTableRow(employee) {
    const employeeTableRow = document.createElement("tr");
    employeesTableBody.appendChild(employeeTableRow);

    constructEmployeeTableRow(employeeTableRow, employee);

}

function constructEmployeeTableRow(employeeTableRow, employee) {
    //TD
    const workPhoneNumberTd = document.createElement("td");
    const employeeNameTd = document.createElement("td");
    const responsibilityTd = document.createElement("td");
    const actionTd = document.createElement("td");

    //BTN
    const updateEmployeeButton = document.createElement("button");
    const acceptUpdateButton = document.createElement("button");
    const deleteEmployeeButton = document.createElement("button");

    actionTd.appendChild(updateEmployeeButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteEmployeeButton);

    //TD val.
    workPhoneNumberTd.innerText = employee.workPhoneNumber;
    employeeNameTd.innerText = employee.name;
    responsibilityTd.innerText = employee.responsibility;

    //BTNS
    updateEmployeeButton.innerText = "Rediger";
    acceptUpdateButton.innerText = "Gem";
    acceptUpdateButton.style.display = "none";
    deleteEmployeeButton.innerText = "Slet";

    //Update btn EL
    updateEmployeeButton.addEventListener("click", () => {
        const workPhoneNumberInput = document.createElement("input");
        const nameInput = document.createElement("input");
        const responsibilitySelect = document.createElement("select");

        //Arbejds tlf sætter val
        workPhoneNumberInput.value = workPhoneNumberTd.innerText;
        workPhoneNumberTd.innerText = "";

        //Navn sætter val
        nameInput.value = employeeNameTd.innerText;
        employeeNameTd.innerText = "";

        //Ansvarsområde sætter val
        const responsibilityOptionDriver = document.createElement("option");
        responsibilityOptionDriver.innerText = "Sanitør";
        responsibilityOptionDriver.value = "sanitør"
        const responsibilityOptionShiftLeader = document.createElement("option");
        responsibilityOptionShiftLeader.innerText = "Vagtleder";
        responsibilityOptionShiftLeader.value = "vagtleder";
        const responsibilityOptionFoal = document.createElement("option");
        responsibilityOptionFoal.innerText = "Føl";
        responsibilityOptionFoal.value = "føl";

        responsibilitySelect.appendChild(responsibilityOptionDriver);
        responsibilitySelect.appendChild(responsibilityOptionShiftLeader);
        responsibilitySelect.appendChild(responsibilityOptionFoal);
        responsibilitySelect.value = responsibilityTd.innerText;
        responsibilityTd.innerText = "";

        //Tables appendes
        workPhoneNumberTd.appendChild(workPhoneNumberInput);
        employeeNameTd.appendChild(nameInput);
        responsibilityTd.appendChild(responsibilitySelect);

        updateEmployeeButton.style.display = "none";
        acceptUpdateButton.style.display = "";
    });

    //Accepter opdatering
    acceptUpdateButton.addEventListener("click", () => {

        const employeeToUpdate = {
            workPhoneNumber: workPhoneNumberTd.firstChild.value,
            employeeName: employeeNameTd.firstChild.value,
            responsibility: responsibilityTd.firstChild.value
        };

        fetch(baseURL + "/employees/" + employee.id, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(employeeToUpdate)
        }).then(response => {
            if (response.status === 200) {
                //Fjerner redigerbare felter
                workPhoneNumberTd.innerHTML = "";
                employeeNameTd.innerHTML = "";
                responsibilityTd.innerHTML = "";

                //Sætter inner text til de opdateret values
                workPhoneNumberTd.innerText = employeeToUpdate.workPhoneNumber;
                employeeNameTd.innerText = employeeToUpdate.employeeName;
                responsibilityTd.innerText = employeeToUpdate.responsibility;

                //Display på btns
                updateEmployeeButton.style.display = "";
                acceptUpdateButton.style.display = "none";

            }
        })
    });

    // Slet knap e.l.
    deleteEmployeeButton.addEventListener("click", () => {
        fetch(baseURL + "/employees/" + employee.id, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                employeeTableRow.remove();
            } else {
                console.log(response.status);
            }
        })
    });

    //Append TR
    employeeTableRow.appendChild(workPhoneNumberTd);
    employeeTableRow.appendChild(employeeNameTd);
    employeeTableRow.appendChild(responsibilityTd);
}

function createEmployee() {
    const employeeToCreate = {
        workPhoneNumber: document.getElementById("new-employee-work-phone").value,
        employeeName: document.getElementById("new-employee-name").value,
        responsibility: document.getElementById("new-employee-responsibility").value,
    }
    fetch(baseURL + "/employees", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(employeeToCreate)
    }).then(response => {
        if (response.status === 200) {
            newEmployeeModal.style.display = "none";
            createEmployeeTableRow(employeeToCreate);
        } else {
            console.log("Error med at oprette ansat")
        }
    });
}

newEmployeeSubmit.addEventListener("click", () => createEmployee());

document.getElementById("new-employee-button").onclick = function () {
    newEmployeeModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target === newEmployeeModal) {
        newEmployeeModal.style.display = "none";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newEmployeeModal.style.display = "none";
}