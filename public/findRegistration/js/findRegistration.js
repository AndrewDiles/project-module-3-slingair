// 4512c65b-49b1-4747-abb4-c434263cc55d   
// above is a working id

const flight = document.getElementById('flight');
const flightNum = document.getElementById('flightNum');
const seat = document.getElementById('seat');
const name = document.getElementById('name');
const email = document.getElementById('email');
const idNum = document.getElementById('id');
const failedid = document.getElementById('failedid');
const bookButton = document.getElementById('book-button');

let idQuery = window.location.search.substring(4);

idNum.style.fontSize = '16px';

const goToMakeReservation = (event) => {
    window.location.href = '/seat-select';
    // window.location.href = '/seat-select/confirmed.html';
}

const toggleInformation = function () {
    // console.log(flight.value);
    if (!flight.value) return;
    let id = flight.value;
    // console.log(id);
    fetch(`/confirmation/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data.info.statusCode);
        if (data.info.statusCode === 400) {
            flightNum.innerText = '';
            seat.innerText = '';
            name.innerText = '';
            email.innerText = '';
            idNum.innerText = '';
            bookButton.style.display = 'none';
            failedid.style.display = 'block';
            setTimeout(()=> {failedid.style.display = 'none';bookButton.style.display = 'block';}, 2000);
        }
        // console.log('Here is some data:', data.info.flight);
        else {
            flightNum.innerText = data.info.flight;
            seat.innerText = data.info.seat;
            name.innerText = `${data.info.givenName} ${data.info.surname}`;
            email.innerText = data.info.email;
            idNum.innerText = id;
        }
    })
}

flight.addEventListener('blur', toggleInformation);

if (idQuery) {
    flight.value = idQuery;
    toggleInformation();
}