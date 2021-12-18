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
    console.log(employee)
    //TD
    const workPhoneNumberTd = document.createElement("td");
    const employeeNameTd = document.createElement("td");
    const responsibilityTd = document.createElement("td");
    const actionTd = document.createElement("td");

    //BTN
    const updateEmployeeButton = document.createElement("button");
    updateEmployeeButton.className = "button1";
    const acceptUpdateButton = document.createElement("button");
    acceptUpdateButton.className = "button1";
    const deleteEmployeeButton = document.createElement("button");
    deleteEmployeeButton.className = "button1";

    actionTd.appendChild(updateEmployeeButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteEmployeeButton);

    //TD val.
    workPhoneNumberTd.innerText = employee.workPhoneNumber;
    employeeNameTd.innerText = employee.employeeName;
    employee.responsibility.forEach(responsibility => {
        if(responsibility === "SANITOR")
            responsibilityTd.append("Sanitør ");
        if(responsibility === "VAGTLEDER")
            responsibilityTd.append("Vagtleder ");
        if(responsibility === "FOL")
            responsibilityTd.append("Føl ");
    });

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

        responsibilitySelect.multiple = true;


        //Arbejds tlf sætter val
        workPhoneNumberInput.value = workPhoneNumberTd.innerText;
        workPhoneNumberTd.innerText = "";

        //Navn sætter val
        nameInput.value = employeeNameTd.innerText;
        employeeNameTd.innerText = "";

        //Ansvarsområde sætter val
        const responsibilityOptionDriver = document.createElement("option");
        responsibilityOptionDriver.innerText = "Sanitør";
        responsibilityOptionDriver.value = "SANITOR"
        const responsibilityOptionShiftLeader = document.createElement("option");
        responsibilityOptionShiftLeader.innerText = "Vagtleder";
        responsibilityOptionShiftLeader.value = "VAGTLEDER";
        const responsibilityOptionFoal = document.createElement("option");
        responsibilityOptionFoal.innerText = "Føl";
        responsibilityOptionFoal.value = "FOL";
        responsibilityOptionFoal.id = "foal" + employee.id;
        responsibilityOptionDriver.id = "driver" + employee.id;
        responsibilityOptionShiftLeader.id = "shift-leader" + employee.id;

        responsibilitySelect.appendChild(responsibilityOptionDriver);
        responsibilitySelect.appendChild(responsibilityOptionShiftLeader);
        responsibilitySelect.appendChild(responsibilityOptionFoal);
        responsibilitySelect.value = responsibilityTd.innerText;
        responsibilityTd.innerText = "";

        //Tables appendes
        employeeNameTd.appendChild(nameInput);
        workPhoneNumberTd.appendChild(workPhoneNumberInput);
        responsibilityTd.appendChild(responsibilitySelect);

        updateEmployeeButton.style.display = "none";
        acceptUpdateButton.style.display = "";
    });

    //Accepter opdatering
    acceptUpdateButton.addEventListener("click", () => {

        const responsibilities = [];
        let counter = 0;
        if(document.getElementById("driver" + employee.id).selected){
            responsibilities[counter] = "SANITOR";
            counter++;
        }
        if(document.getElementById("shift-leader" + employee.id).selected){
            responsibilities[counter] = "VAGTLEDER";
            counter++;
        }
        if(document.getElementById("foal" + employee.id).selected){
            responsibilities[counter] = "FOL";
        }

        const employeeToUpdate = {
            workPhoneNumber: workPhoneNumberTd.firstChild.value,
            employeeName: employeeNameTd.firstChild.value,
            responsibility: responsibilities
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
                if(responsibilities.includes("SANITOR"))
                    responsibilityTd.append("Sanitør ");
                if(responsibilities.includes("VAGTLEDER"))
                    responsibilityTd.append("Vagtleder ");
                if(responsibilities.includes("FOL"))
                    responsibilityTd.append("Føl ");

                //Display på buttons
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

    //Append table row
    employeeTableRow.appendChild(employeeNameTd);
    employeeTableRow.appendChild(workPhoneNumberTd);
    employeeTableRow.appendChild(responsibilityTd);
    employeeTableRow.appendChild(actionTd);
}

function createEmployee() {
    const responsibilities = []
    let counter = 0;
    if (document.getElementById("new-employee-sanitary").checked) {
        responsibilities[counter] = "SANITOR";
        counter++;
    }
    if (document.getElementById("new-employee-shift-leader").checked) {
        responsibilities[counter] = "VAGTLEDER";
        counter++;
    }
    if (document.getElementById("new-employee-intern").checked) {
        responsibilities[counter] = "FOL";
    }

    const employeeToCreate = {
        workPhoneNumber: document.getElementById("new-employee-work-phone-number").value,
        employeeName: document.getElementById("new-employee-name").value,
        responsibility: responsibilities
    }
    fetch(baseURL + "/employees", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(employeeToCreate)
    }).then(response => {
        if (response.status === 200) {
            newEmployeeModal.style.display = "none";
            document.getElementById("new-employee-work-phone-number").value = "";
            document.getElementById("new-employee-name").value = "";
            document.getElementById("new-employee-sanitary").checked = false;
            document.getElementById("new-employee-shift-leader").checked = false;
            document.getElementById("new-employee-intern").checked = false;
            return response.json();
        } else {
            console.log("Error med at oprette ansat")
        }
    }).then(result => {
        createEmployeeTableRow(result);
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