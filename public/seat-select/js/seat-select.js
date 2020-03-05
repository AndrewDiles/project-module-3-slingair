const body = document.querySelector('body');
const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const firstName = document.getElementById('givenName');
const lastName = document.getElementById('surname');
const email = document.getElementById('email');
const seatNumber = document.getElementById('seat-number');
const failedFlightNumber = document.getElementById('failedFlightNumber');
const flightsSelect = document.getElementById('flightsFound');
const flightsFound = document.getElementById('flightsFound');

let selection = '';
let flightNumber = '';

const goToFindReservation = (event) => {
    window.location.href = '/findRegistration/findRegistration.html';
    // window.location.href = '/seat-select/confirmed.html';
}

const handleAskServerForFlights = (event) => {
    // console.log(flightsFound.value);
    // renderSeats(flightsFound.value);
    flightNumber = flightsFound.value;
    while (seatsDiv.firstElementChild != null) {
        seatsDiv.removeChild(seatsDiv.firstElementChild);
    }
    // console.log(seatsDiv.firstElementChild);
    fetch(`${flightNumber}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        res.json()
        .then(data => {
            // console.log(data);
            if (data.status === '200'){
                renderSeats(data.flightInfo);
                console.log(seatsDiv.firstElementChild);
                // seatsDiv.childNodes = null;
                // console.log(seatsDiv);
                return;
            }
            else {
                failedFlightNumber.innerText = 'Error';
                failedFlightNumber.style.display = 'block';
                setTimeout(()=>{
                    failedFlightNumber.style.display = 'none';
                    flightInput.addEventListener('blur', toggleFormContent);
                }, 2000);
                return;
            }
        })
    })
}

const getPotentialFlights = () => {

    fetch('/grabPotentialFlights', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        res.json()
        .then(data => {
            // console.log('LET DATA BEGIN');
            // console.log(data.flights.flights);
            // console.log('LET DATA END');
            data.flights.flights.forEach((puck)=>{
                let option = document.createElement("option");
                option.innerText = puck;
                option.value = puck;
                flightsSelect.appendChild(option);
            })
            // if (data.status === 304){
            //     failedFlightNumber.innerText = 'Invalid flight number, please try agian [Number should look like: SA###]';
            //     failedFlightNumber.style.display = 'block';
            //     setTimeout(()=>{
            //         failedFlightNumber.style.display = 'none';
            //         flightInput.addEventListener('blur', toggleFormContent);
            //     }, 2000);
            //     return;
            // }
            // else if (data.status === '200'){
            //     renderSeats(data.flightInfo);
            //     flightInput.addEventListener('blur', toggleFormContent);
            //     return;
            // }
            // else {
            //     failedFlightNumber.innerText = 'Error';
            //     failedFlightNumber.style.display = 'block';
            //     setTimeout(()=>{
            //         failedFlightNumber.style.display = 'none';
            //         flightInput.addEventListener('blur', toggleFormContent);
            //     }, 2000);
            //     return;
            // }
        })
    })
}
getPotentialFlights();

const renderSeats = (x) => {
    // console.log(x);
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            let seatTest = x.find(element => element.id === seatNumber);
            if (seatTest.isAvailable) {seat.innerHTML = seatAvailable;}
            else seat.innerHTML = seatOccupied;
            row.appendChild(seat);
        }
    }
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;      // Andrew: this enables capacity to confirm
        }
    });
}
// Prr Scott Server
// const testFlightNumberValidity = function(x) {
//     if(x.length != 5) return false;
//     if(x[0] === 'S' && x[1] === 'A' && x[2] > -1 && x[2] < 10 && x[3] > -1 && x[3] < 10 && x[4] > -1 && x[4] < 10) return true;
//     else return false
// }

// const toggleFormContent = (event) => {
//     flightInput.removeEventListener('blur', toggleFormContent);
//     flightNumber = flightInput.value;
//     console.log('toggleFormContent: ', flightNumber);
//     if (!testFlightNumberValidity(flightNumber)) {
//         failedFlightNumber.style.display = 'block';
//         setTimeout(()=>{
//             failedFlightNumber.style.display = 'none';
//             flightInput.addEventListener('blur', toggleFormContent);
//         }, 2000);
//         return;
//     }

//     fetch(`${flightNumber}`, {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             "Content-Type": "application/json"
//         },
//     })
//     .then(res => {
//         res.json()
//         .then(data => {
//             // console.log(data);
//             if (data.status === 304){
//                 failedFlightNumber.innerText = 'Invalid flight number, please try agian [Number should look like: SA###]';
//                 failedFlightNumber.style.display = 'block';
//                 setTimeout(()=>{
//                     failedFlightNumber.style.display = 'none';
//                     flightInput.addEventListener('blur', toggleFormContent);
//                 }, 2000);
//                 return;
//             }
//             else if (data.status === '200'){
//                 renderSeats(data.flightInfo);
//                 flightInput.addEventListener('blur', toggleFormContent);
//                 return;
//             }
//             else {
//                 failedFlightNumber.innerText = 'Error';
//                 failedFlightNumber.style.display = 'block';
//                 setTimeout(()=>{
//                     failedFlightNumber.style.display = 'none';
//                     flightInput.addEventListener('blur', toggleFormContent);
//                 }, 2000);
//                 return;
//             }
//         })
//     })
// }

const handleConfirmSeat = (event) => {
    event.preventDefault();
    confirmButton.click(false);
    
    
    const data = {
        flight: flightNumber,
        seat: seatNumber.innerText[1]+seatNumber.innerText[2],
        givenName: firstName.value,
        surname: lastName.value,
        email: email.value,
    }
    fetch('/confirmed', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
    // fetch('https://journeyedu.herokuapp.com/slingair/users', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Accept': 'application/json',
    //         "Content-Type": "application/json"
    //     }
    // })
    .then(res => {
        res.json()
        .then(data => {
            // console.log(data);
            // console.log(data.status);
            if (data.status === '200'){
                // console.log('YOU GETTING THERE');
                // let queryString = "?flight=" + flightNumber + "&seat=" + seatNumber.innerText + "&name=" + firstName.value + ' ' + lastName.value + "&email=" + email.value;
                // console.log(queryString);
                // window.location.href = '/seat-select/confirmed.html' + queryString;
                let angryBird = document.createElement('img');
                angryBird.style.zIndex = '10';
                angryBird.style.position = 'absolute';
                angryBird.src = "angryBirds.gif";
                angryBird.style.left = '0px';
                angryBird.style.top = '0px';
                body.appendChild(angryBird);
                angryBird.style.height = '1vh';
                angryBird.style.width = '1vw';
                setInterval(()=>{
                    angryBird.style.height = `${parseInt(angryBird.style.height)+1}vh`;
                    angryBird.style.width = `${parseInt(angryBird.style.height)+1}vw`;
                }, 20);
                setTimeout(()=>{window.location.href = '/seat-select/confirmed.html?id=' + data.id;}, 2000);
                
                // res.render('/confirmed', {
                // object being sent
                // object being sent
                // });
            }
        })
    })
    
}

// Pre Scott server
// flightInput.addEventListener('blur', toggleFormContent);