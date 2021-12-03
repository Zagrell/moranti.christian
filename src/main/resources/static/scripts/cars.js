const carTbody = document.getElementById("car-tbody");
const newCarModal = document.getElementById("new-car-modal");
const newCarSubmit = document.getElementById("new-car-submit");


fetch(baseURL + "/cars")
    .then(response => response.json())
    .then(cars => {
        cars.map(createCarTableRow);
    });

function createCarTableRow(car) {
    const tableRow = document.createElement("tr");
    carTbody.appendChild(tableRow);

    constructCarTableRow(tableRow, car);
}


function constructCarTableRow(tableRow, car) {
    //Table data
    const carNumberTd = document.createElement("td");
    const shiftPhoneNumberTd = document.createElement("td");
    const licencePlateTd = document.createElement("td");
    const typeTd = document.createElement("td");
    const actionTd = document.createElement("td");

    //Button consts
    const updateCarButton = document.createElement("button");
    const deleteCarButton = document.createElement("button");
    actionTd.appendChild(updateCarButton);
    actionTd.appendChild(deleteCarButton);

    //Table data values
    carNumberTd.innerText = car.carNumber;
    shiftPhoneNumberTd.innerText = car.shiftPhoneNumber;
    licencePlateTd.innerText = car.licencePlate;
    typeTd.innerText = car.type;

    //Buttans
    updateCarButton.innerText = "Rediger";
    deleteCarButton.innerText = "Slet";

    updateCarButton.addEventListener("click", () => updateCar(car));
    deleteCarButton.addEventListener("click", () => {
        fetch(baseURL + "/cars/" + car.carNumber, {
            method: "DELETE"
        }).then(response => {
            if (response.status === 200) {
                tableRow.remove();
            } else {
                console.log(response.status);
            }
        })
    });


    tableRow.appendChild(carNumberTd);
    tableRow.appendChild(shiftPhoneNumberTd);
    tableRow.appendChild(licencePlateTd);
    tableRow.appendChild(typeTd);
    tableRow.appendChild(actionTd);
}

function createCar() {
    const carToCreate = {
        carNumber: Number(document.getElementById("new-car-number").value),
        licencePlate: document.getElementById("new-car-licence").value,
        shiftPhoneNumber: document.getElementById("new-car-phone").value,
        type: document.getElementById("new-car-type").value
    }

    fetch(baseURL + "/cars", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(carToCreate)
    }).then(response => {
        if (response.status === 200) {
            newCarModal.style.display = "none";
            createCarTableRow(carToCreate);
        } else {
            //Todo skal fange en error
            console.log("Error fuck dig")
        }
    })
}

function updateCar(car) {
}



newCarSubmit.addEventListener("click", () => createCar());

document.getElementById("new-car-button").onclick = function () {
    newCarModal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target === newCarModal) {
        newCarModal.style.display = "none";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newCarModal.style.display = "none";
}
