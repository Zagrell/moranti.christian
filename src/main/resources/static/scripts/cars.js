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
    updateCarButton.className = "button1";
    const acceptUpdateButton = document.createElement("button");
    acceptUpdateButton.className = "button1";
    const deleteCarButton = document.createElement("button");
    deleteCarButton.className = "button1";

    actionTd.appendChild(updateCarButton);
    actionTd.appendChild(acceptUpdateButton);
    actionTd.appendChild(deleteCarButton);


    //Table data values
    carNumberTd.innerText = car.carNumber;
    shiftPhoneNumberTd.innerText = car.shiftPhoneNumber;
    licencePlateTd.innerText = car.licencePlate;
    typeTd.innerText = car.type.substring(0, 1).toUpperCase() +
        car.type.substring(1, car.type.length);

    //Buttans
    updateCarButton.innerText = "Rediger";
    acceptUpdateButton.innerText = "Gem";
    acceptUpdateButton.style.display = "none";
    deleteCarButton.innerText = "Slet";

    //Update button event listner
    updateCarButton.addEventListener("click", () => {
        const carNumberInput = document.createElement("input");
        const shiftPhoneNumberInput = document.createElement("input");
        const licencePlateInput = document.createElement("input");
        const typeSelect = document.createElement("select");
        typeSelect.className = "box minimal";

        //CarNumber feltet sættet value for inputtet, og resettet innertext tomt
        carNumberInput.type = "number";
        carNumberInput.value = Number(carNumberTd.innerText);
        carNumberTd.innerText = "";

        //shiftPhoneNumber feltet sættet value for inputtet, og resettet innertext tomt
        shiftPhoneNumberInput.value = shiftPhoneNumberTd.innerText;
        shiftPhoneNumberTd.innerText = "";

        //LicencePlate feltet sættet value for inputtet, og resettet innertext tomt
        licencePlateInput.value = licencePlateTd.innerText;
        licencePlateTd.innerText = "";

        //Type feltet sættet value for inputtet, og resettet innertext tomt
        const typeOptionNormal = document.createElement("option");
        typeOptionNormal.innerText = "Normal";
        typeOptionNormal.value = "Normal";
        const typeOptionGraffiti = document.createElement("option");
        typeOptionGraffiti.innerText = "Graffiti";
        typeOptionGraffiti.value = "Graffiti";

        typeSelect.appendChild(typeOptionNormal);
        typeSelect.appendChild(typeOptionGraffiti);
        typeSelect.value = typeTd.innerText;
        typeTd.innerText = "";

        //Alle table data appendes
        carNumberTd.appendChild(carNumberInput);
        shiftPhoneNumberTd.appendChild(shiftPhoneNumberInput);
        licencePlateTd.appendChild(licencePlateInput);
        typeTd.appendChild(typeSelect);

        updateCarButton.style.display = "none";
        acceptUpdateButton.style.display = "";
    });

    //Accept update
    acceptUpdateButton.addEventListener("click", () => {

        const carToUpdate = {
            carNumber: Number(carNumberTd.firstChild.value),
            licencePlate: licencePlateTd.firstChild.value,
            shiftPhoneNumber: shiftPhoneNumberTd.firstChild.value,
            type: typeTd.firstChild.value
        };

        fetch(baseURL + "/cars/" + car.carNumber, {
            method: "PUT",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify(carToUpdate)
        }).then(response => {
            if (response.status === 200) {
                //Fjerne alle redigerbar felter
                carNumberTd.innerHTML = "";
                shiftPhoneNumberTd.innerHTML = "";
                licencePlateTd.innerHTML = "";
                typeTd.innerHTML = "";

                //Sætter inner text til de updateret values
                carNumberTd.innerText = carToUpdate.carNumber.toString();
                shiftPhoneNumberTd.innerText = carToUpdate.shiftPhoneNumber;
                licencePlateTd.innerText = carToUpdate.licencePlate;
                typeTd.innerText = carToUpdate.type;

                //Sætter display på buttons
                updateCarButton.style.display = "";
                acceptUpdateButton.style.display = "none";

                //Car Number opdateres så den kan slettes i samme ombæring som når den ændres
                car.carNumber = carToUpdate.carNumber;
            }
        })
    });

    //Delete button event listner
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


    //Append tablerow
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
            document.getElementById("new-car-number").value = "";
            document.getElementById("new-car-licence").value = "";
            document.getElementById("new-car-phone").value = "";
            createCarTableRow(carToCreate);
        } else {
            //Todo skal fange en error
            console.log("Error med at oprette en bil")
        }
    });
}

newCarSubmit.addEventListener("click", () => createCar());

document.getElementById("new-car-button").onclick = function () {
    newCarModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target === newCarModal) {
        newCarModal.style.display = "none";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    newCarModal.style.display = "none";
}
