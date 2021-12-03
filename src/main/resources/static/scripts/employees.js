const employeesTableBody = document.getElementById("employees-tbody");
const employeeFormParentDiv = document.getElementById("create-employee-from");

fetch(baseURL + "/employees")
    .then(response => response.json())
    .then(result => {
        result.map(createEmployeeTableRow);
    });

function createEmployeeTableRow(employee) {
    const employeeTableRow = document.createElement("tr");
    employeeTableRow.id = employee.id;

    employeesTableBody.appendChild(employeeTableRow);

    constructEmployeeTableRow(employeeTableRow, employee);

}

function constructEmployeeTableRow(employeeTableRow, employee) {

    employeeTableRow.innerHTML = `
        <td>
            <a href="../html/employees.html?id=${employee.id}">
                <p class="row-employee-name">${escapeHTML(employee.name)}</p>
            </a>
        </td>   
        <td>
            <p class="row-employee-workPhoneNumber">${escapeHTML(employee.workPhoneNumber)}</p>
        </td>    
        <td>
            <p class="row-employee-workPhoneNumber">${escapeHTML(employee.type)}</p>
        </td>
        <td>
            <button onclick="deleteEmployee(${employee.id})">❌</button>
        </td>    
    `;

    document.getElementById(`update-btn-${employee.id}`)
        .addEventListener("click", () => updateEmployee)

}

const createEmployeeForm = `<div>
    <label>Navn</label>
    <input id="create-employee-name" placeholder="Name">    
    <label>Arbejdstelefon</label>
    <input id="create-employee-workPhoneNumber" placeholder="Arbejdstelefon">    
    <label>Ansvarsområde</label>
    <input id="create-employee-type" placeholder="Ansvarsområde">
    <button onclick="createEmployee()">Tilføj ny ansat</button>    
</div>`;

function showEmployeeForm() {
    employeeFormParentDiv.innerHTML = createEmployeeForm;
}


function createEmployee() {
    const employeeToCreate = {
        name: document.getElementById("create-employee-name").value,
        workPhoneNumber: document.getElementById("create-employee-workPhoneNumber").value,
        type: document.getElementById("create-employee-type").value
    };

    fetch(baseURL + "/employees", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(employeeToCreate)
    }).then(response => response.json())
        .then(employee => {
            createEmployeeTableRow(employee);
        }).catch(error => console.log(error));
}

function updateEmployee (employee) {
    const tableRowToUpdate = document.getElementById(employee.id);

    tableRowToUpdate.innerHTML = `
        <td>
            <input id="update-employee-name-${employee.id}" value="${escapeHTML(employee.name)}">
        </td>   
        <td>
            <input id="update-employee-workPhoneNumber-${employee.id}" value="${escapeHTML(employee.workPhoneNumber)}">
        </td>     
        <td>
            <input id="update-employee-type-${employee.id}" value="${escapeHTML(employee.type)}">
        </td>
        <td>
            <button id="cancel-update-${employee.id}">✖</button>
            <button onclick="updateEmployeeInBackend(${employee.id})">✅</button>
        </td>
           
        <td>
            <button onclick="deleteEmployee(${employee.id})">❌</button>
        </td>    
    
    `
}

function updateEmployeeInBackend (employeeId) {
    const tableRowToUpdate = document.getElementById(employeeId);

    const employeeToUpdate = {
        id: employeeId,
        name: document.getElementById(`update-employee-name-${employeeId}`).value,
        workPhoneNumber: document.getElementById(`update-employee-workPhoneNumber-${employeeId}`).value,
        type: document.getElementById(`update-employee-type-${employeeId}`).value
    };

    fetch(baseURL + "/employees/" + employeeId, {
        method: "PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(employeeToUpdate)
    }).then(response => {
        if (response.status === 200) {
            constructEmployeeTableRow(tableRowToUpdate, employeeToUpdate);
        }
    });
}

function deleteEmployee(employeeId) {
    fetch(baseURL + "/employees/" + employeeId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 20) {
            document.getElementById(employeeId).remove()
        } else {
            console.log(response.status);
        }
    })
}

document.getElementById("create-employee-from");