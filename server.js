'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request-promise');

const {flights} = require('./test-data/flightSeating.js');
const {reservations} = require('./test-data/reservations.js');

const PORT = process.env.PORT || 8000;

const handleFindSeats = async (req, res) => {

    let number = req.params.flightNumber;
    // console.log(`Flight number: ${number}`);
    // let flight = flights[number];  OLD when using test data

    const getSeatData = async () => {
        try {
            let seatData = {
                uri: `https://journeyedu.herokuapp.com/slingair/flights/${number}`,
                headers: {
                    "Accept": "application/json"
                },
                json: true
            };
            let data = await request(seatData);
            // console.log(data);
            // console.log(data[number]);
            
            return data[number];
        } catch(reject) {console.log(reject); return reject;}
    }
    
    let info = await getSeatData();

    res.send({
        status: '200',
        flightInfo: info
    });

    // fetch(`https://journeyedu.herokuapp.com/slingair/flights/${number}`, {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         "Content-Type": "application/json"
    //     },
    // })
    // .then(res => {
    //     res.json()
    //     .then(data => {
    //         console.log(data);
    //         if (flight === undefined) {
    //             // send back error code
    //             console.log('not in database')
    //             res.send({
    //                 status: '304' // flight not found
    //             });
    //             return;
    //         }
    //         else{
    //             console.log(`sending: ${flight}`);
    //             res.send({
    //                 status: '200',
    //                 flightInfo: flight
    //             });
    //         }
    //     })
    // })
}

// const handleConfirm = async (req, res) => {

//     let reservation = {
//         flight: req.body.flight,
//         seat: req.body.seat,
//         givenName: req.body.givenName,
//         surname: req.body.surname,
//         email: req.body.email
//     }
//     const makeReservation = reservation => {
//         let seatData = {
//             method: "POST",
//             // uri: `https://journeyedu.herokuapp.com/slingair/users`,
//             body: JSON.stringify(reservation),
//             headers: {
//                 'Content-Type': "application/json",
//                 "Accept": "application/json"
//             }
//         };
//         // let data = await request(seatData);
//         // console.log(data);
//         // console.log(data[number]);
        
//         // return data[number];
//         return fetch(`https://journeyedu.herokuapp.com/slingair/users`, seatData)
//             .then(res=> res.json())
//             .then(res => console.log(res))
//     }
    
//     let sent = await makeReservation(reservation);
//     console.log('INFO BELOW HERE -------------------------');
//     console.log(sent);

//     res.send({
//         status: '200',
//         // id: '88a33c23-3332-4ef2-bd71-be7a6430485f',
//     });
// }

const handleConfirm = async (req, res) => {
    // console.log(req.body);

    // OLD from using test data
    // reservations.push({
    //     id: 'numberToCome',
    //     flight: req.body.flight,
    //     seat: req.body.seat,
    //     givenName: req.body.givenName,
    //     surname: req.body.surname,
    //     email: req.body.email
    // });
    // console.log(reservations[reservations.length-1]);
    let reservation = {
        flight: req.body.flight,
        seat: req.body.seat,
        givenName: req.body.givenName,
        surname: req.body.surname,
        email: req.body.email
    }
    console.log(reservation);
    const makeReservation = async () => {
        try {
            let seatData = {
                method: "POST",
                uri: `https://journeyedu.herokuapp.com/slingair/users`,
                // body: JSON.stringify(reservation),
                body: reservation,
                headers: {
                    "Accept": "application/json"
                },
                json: true
            };
            let data = await request(seatData);
            console.log('LOOK BELOW HERE');
            console.log(data.status);
            // console.log(data[number]);
            return data;
            // return fetch(`https://journeyedu.herokuapp.com/slingair/users`, seatData)
        } catch(reject) {console.log(reject); return reject;}
    }
    let sent = await makeReservation();
    // console.log('INFO BELOW HERE -------------------------');
    // console.log(sent);
    console.log(sent.reservation.id);

    res.send({
        status: '200',
        id: sent.reservation.id,
    });
}


// Pre Scott Server: 
// const handleGetData = async (req, res) => {
//     let requestid = req.params.id;
//     let found = false;

//     const getInfoFromId = async () => {
//         try {
//             let seatData = {
//                 uri: `https://journeyedu.herokuapp.com/slingair/flights/${number}`,
//                 headers: {
//                     "Accept": "application/json"
//                 },
//                 json: true
//             };
//             let data = await request(seatData);
//             // console.log(data);
//             // console.log(data[number]);
            
            
//             return data[number];
//         } catch(reject) {console.log(reject); return reject;}
//     }
    
//     let info = await getInfoFromId();

//     res.send({
//         status: '200',
//         info: info
//     });
//     // reservations.forEach((element)=> {
//     //     if (element.id === requestid) {
//     //         found = true;
//     //         let nameToSend = `${element.givenName} ${element.surname}`;
//     //         console.log(element);
//     //         res.send({
//     //             status: '200',
//     //             flight: element.flight,
//     //             seat: element.seat,
//     //             name: nameToSend,
//     //             email: element.email
//     //         });
//     //     }
//     // })
//     if (found) return;
//     else {
//         console.log('find failed');
//         res.send({
//             status: '304' // id not found
//         });
//     }
// }


const handleGetData = async (req, res) => {
    let requestid = req.params.id;
    console.log("requestid is:", requestid);

    const getInfoFromId = async () => {
        try {
            let dataRequest = {
                uri: `https://journeyedu.herokuapp.com/slingair/users/${requestid}`,
                headers: {
                    "Accept": "application/json"
                },
                json: true
            };
            let data = await request(dataRequest);
            console.log("data.data looks like: ", data.data);
            // console.log(data[number]);
            
            return data.data;
        } catch(reject) {console.log(reject); return reject;}
    }
    
    let info = await getInfoFromId();
    // console.log('testing status:', info.status);
    // console.log(info.status===200);
    console.log('testing info.data:', info);
    // if (info.status === 200) {
        res.send({
            status: '200',
            info: info
        });
    // }
    // else {
    //     //error
    // }
}


const handleFlights = async (req, res) => {
    // let found = false;
    const getFlightsFromApi = async () => {
        try {
            let flightData = {
                uri: `https://journeyedu.herokuapp.com/slingair/flights`,
                headers: {
                    "Accept": "application/json"
                },
                json: true
            };
            let data = await request(flightData);
            // console.log(data);
            // console.log(data.flightInfo);
            return data;
        } catch(reject) {console.log(reject); return reject;}
    }
    
    let info = await getFlightsFromApi();
    // console.log(`sending: ${info}`);
    res.send({
        status: '200',
        flights: info
    });
    // reservations.forEach((element)=> {
    //     if (element.id === requestid) {
    //         found = true;
    //         let nameToSend = `${element.givenName} ${element.surname}`;
    //         console.log(element);
    //         res.send({
    //             status: '200',
    //             flight: element.flight,
    //             seat: element.seat,
    //             name: nameToSend,
    //             email: element.email
    //         });
    //     }
    // })
    // if (found) return;
    // else {
    //     console.log('find failed');
    //     res.send({
    //         status: '304' // id not found
    //     });
    // }
}

const handleGetUsers = async (req, res) => {
    let allUsers = [];
    let done = false;
    let i = 0;
    while (!done){
        const getUsers = async () => {
            try {
                let dataRequest = {
                    uri: `https://journeyedu.herokuapp.com/slingair/users?limit=25&start=${i}`,
                    headers: {
                        "Accept": "application/json"
                    },
                    json: true
                };
                let data = await request(dataRequest);
                console.log("data.data looks like: ", data);
                i += 25;
                // if (data.length<25) done = true;   put this in once you know what the data looks like
                // done = true;
                return data;
            } catch(reject) {console.log(reject); return reject;}
        }
        let info = await getUsers();
        // console.log(info.length<25);
        if (info.length<25) done = true;
        allUsers.push(info);
    }
    
    console.log('testing data:', allUsers);
    // if (info.status === 200) {
        res.send({
            status: '200',
            users: allUsers
        });
    // }
    // else {
    //     //error
    // }
}

express()
    .use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    })
	.use(morgan('dev'))
	.use(express.static('public'))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    
    // endpoints

    .get('/grabUsers', handleGetUsers)
    .get('/grabPotentialFlights', handleFlights)
    .post('/confirmed', handleConfirm)
    .get('/confirmation/:id', handleGetData)
    .get('/seat-select/:flightNumber', handleFindSeats)
    .get('/master/:flightNumber', handleFindSeats)
    // .get('/seat-select/:firstName/:lastName/:email/', handle)

    .use((req, res) => res.send('Not Found'))
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));