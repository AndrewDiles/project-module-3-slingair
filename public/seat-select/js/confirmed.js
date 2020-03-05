const flight = document.getElementById('flight');
const flightNum = document.getElementById('flightNum');
const seat = document.getElementById('seat');
const name = document.getElementById('name');
const email = document.getElementById('email');
const idNum = document.getElementById('id');

// console.log(window.location.search);
let id = window.location.search.substring(4);

idNum.style.fontSize = '16px';
idNum.innerText = id;
console.log(id);

const goToFindReservation = (event) => {
    window.location.href = '/findRegistration/findRegistration.html';
    // window.location.href = '/seat-select/confirmed.html';
}

const goToMakeReservation = (event) => {
    window.location.href = '/seat-select';
    // window.location.href = '/seat-select/confirmed.html';
}

const runOnLoad = function () {
    fetch(`/confirmation/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log('Here is some data:', data);
        flightNum.innerText = data.info.flight;
        seat.innerText = data.info.seat;
        name.innerText = `${data.info.givenName} ${data.info.surname}`;
        email.innerText = data.info.email;
    })
}
runOnLoad();