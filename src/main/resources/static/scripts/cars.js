const carTbody = document.getElementById("car-tbody");

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

    //Table data values
    carNumberTd.innerText = car.carNumber;
    shiftPhoneNumberTd.innerText = car.shiftPhoneNumber;
    licencePlateTd.innerText = car.licencePlate;
    typeTd.innerText = car.type;

    //Buttans
    updateCarButton.innerText = "Rediger";
    deleteCarButton.innerText = "Slet";

    updateCarButton.addEventListener("click", () => updateCar(car));
    deleteCarButton.addEventListener("click", () => deleteCar(car.id));
}

function updateCar(car) {
}

function deleteCar(carId) {
    fetch(baseURL + "/cars/" + carId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(carId).remove();
        } else {
            console.log(response.status);
        }
    })
}
