const employeesTableBody = document.getElementById("employees-tbody");

fetch(baseURL + "/employees")
    .then(response => response.json())
    .then(result => {
        result.map(createEmployeeTableRow)
    })

function createEmployeeTableRow(employee) {
    const employeeTableRow = document.createElement("tr");

    employeeTableRow.appendChild(employeeTableRow);

    constructEmployeeTableRow(employeeTableRow, employee);

}

function constructEmployeeTableRow(employeeTableRow, employee) {
    
}