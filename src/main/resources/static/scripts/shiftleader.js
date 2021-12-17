const shiftLeaderName = document.getElementById("shift-leader-name");
const leaderSelect = document.createElement("select");
leaderSelect.className = "box minimal";
const leaderPhone = document.getElementById("shift-leader-phoneNumber");
let shiftLeader;

fetch(baseURL + "/employees/shiftleader")
    .then(response => response.json())
    .then(result => {
        shiftLeader = result;
        pickShiftLeader();
    })


function pickShiftLeader() {

    fetch(baseURL + "/employees/shiftleaders")
        .then(response => response.json())
        .then(result => {
            result.forEach(leader => {
                const leaderOption = document.createElement("option");
                leaderOption.innerText = leader.employeeName;
                leaderOption.value = leader.id;

                console.log(shiftLeader.id + " value" + leaderOption.value);
                if (leaderOption.value == shiftLeader.id) {
                    leaderOption.selected = true;
                    leaderPhone.innerText = leader.workPhoneNumber;
                }
                leaderSelect.appendChild(leaderOption);
                shiftLeaderName.innerText = "";
                shiftLeaderName.appendChild(leaderSelect);
                shiftLeaderName.removeEventListener("click", pickShiftLeader);
            })
        })
}

leaderSelect.addEventListener("change", () => {
        fetch(baseURL + "/employees/shiftleader/" + leaderSelect.value, {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw("Kan ikke ændre vagtleder");
            }
        }).then(result => {
            leaderPhone.innerText = result.workPhoneNumber;
        });
});