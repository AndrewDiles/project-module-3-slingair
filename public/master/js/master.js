const body = document.querySelector('body');
const masterContiner = document.getElementById('master-container');


const handleGoToReservation = (event) => {
    if (!event.target.childNodes[1]) return;
    window.location.href = `/findRegistration/findRegistration.html?id=${event.target.childNodes[1].childNodes[1].innerText}`;
}

const getAllUsers = async () => {
    fetch('/grabUsers', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        res.json()
        .then(data => {
            // console.log(data.users[0]);
            data.users[0].forEach((element)=>{
                // console.log(element.flight);
                // console.log(element.seat);
                if (element.flight) {
                    const target = document.getElementById(`${element.flight}${element.seat}`);
                    // console.log(target);
                    // console.log('child element count:', target.childElementCount);
                    if (target.childElementCount != 0) return;
                    // const infoDiv = document.getElementById(`${element.flight}${element.seat}Div`)
                    // console.log('infoDiv', infoDiv);
                    // let userDiv = document.createElement('div');

                    const seatDiv = document.createElement('div');
                    seatDiv.id = `${element.flight}${element.flight}Div`;
                    seatDiv.style.width = '200px';
                    seatDiv.style.height = '400px';
                    // seatDiv.style.position = 'absolute';
                    seatDiv.style.background = 'white';
                    // console.log(seat.style.top);
                    // seatDiv.style.top = seat.style.top;
                    // console.log(seat.style.top);
                    seatDiv.innerText = `${element.flight}${element.flight}`;
                    // seatDiv.style.opacity = '1';
                    seatDiv.style.display = 'none';
                    target.appendChild(seatDiv);
                    target.addEventListener('mouseover', toggleReservationVisibility);


                    let id = document.createElement('p');
                    id.innerText = element.id;
                    // console.log('id:', id);
                    seatDiv.appendChild(id);
                    let email = document.createElement('p');
                    email.innerText = element.email;
                    // console.log('email', email);
                    seatDiv.appendChild(email);
                    target.classList.add('mouseEffects');
                }
            })
            // console.log(masterContiner.childNodes);
        })
    })
}

// creates the seats for a given array of seat availabilities
const renderSeats = (puck, x) => {
    // console.log('rendering seats');
    // console.log(x);
    document.querySelector(`.${puck}`).style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        const seatsDiv = document.getElementById(`seats-section-${puck}`);
        // console.log(seatsDiv);
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li')
            const seatOccupied = `<li><label class="seat"><span onclick="handleGoToReservation(event)" id="${puck}${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><name="seat" value="${seatNumber}" /><span onclick="handleGoToReservation(event)" id="${puck}${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            let seatTest = x.find(element => element.id === seatNumber);
            if (seatTest.isAvailable) {
                seat.innerHTML = seatAvailable;
            }
            else {
                seat.innerHTML = seatOccupied;
                seat.classList.add('occupied');

                // const seatDiv = document.createElement('div');
                // seatDiv.id = `${puck}${seatNumber}Div`;
                // seatDiv.style.width = '200px';
                // seatDiv.style.height = '400px';
                // seatDiv.style.position = 'absolute';
                // seatDiv.style.background = 'white';
                // console.log(seat.style.top);
                // seatDiv.style.top = seat.style.top;
                // seatDiv.innerText = `${puck}${seatNumber}`;
                // seatDiv.style.display = 'none';  
                // seat.appendChild(seatDiv);
                // seat.addEventListener('mouseover', toggleReservationVisibility);

            }
            row.appendChild(seat);
            
        }
    }
    getAllUsers();
}

// gets a list of seat avail for a given flight number
const handleAskServerForFlights = (puck) => {
    fetch(`${puck}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        res.json()
        .then(data => {
            // console.log(data, "data");
            if (data.status === '200'){
                renderSeats(puck, data.flightInfo);
                // console.log(seatsDiv.firstElementChild);
                // seatsDiv.childNodes = null;
                // console.log(seatsDiv);
                return;
            }
        })
    })
}

// gets a list of all available flights
const getPotentialFlights = async () => {

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
            // console.log(data.flights.flights);   // this is working
            data.flights.flights.forEach((puck)=>{
                let flightDiv = document.createElement("div");
                flightDiv.classList.add(`${puck}`);
                
                masterContiner.appendChild(flightDiv);
                let flighth2 = document.createElement("h2");
                flighth2.innerText = puck;
                flighth2.value = puck;
                flightDiv.appendChild(flighth2);
                let spacingDiv = document.createElement("div");
                spacingDiv.classList.add('spacing');
                flightDiv.appendChild(spacingDiv);
                let planeDiv = document.createElement("div");
                planeDiv.classList.add(`seats-section`);  // was removed
                planeDiv.id = `seats-section-${puck}`;
                // console.log(planeDiv);
                flightDiv.appendChild(planeDiv);
                let spacingDiv2 = document.createElement("div");
                spacingDiv2.classList.add('spacing');
                flightDiv.appendChild(spacingDiv2);
                handleAskServerForFlights(puck);
            })
        })
    })
    
}
getPotentialFlights();


toggleReservationVisibility = function (event) {
    console.log(event.target);
    console.log(event.target.id);
    const info = document.getElementById(`${event.target.id}Div`);
    if (!info) return;
    info.style.background = 'red';
    event.target.style.background = 'red';
    event.target.style.cursor = 'pointer';
    info.style.display = 'block';
}