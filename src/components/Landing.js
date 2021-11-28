import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import BookingLogo from '../pics/booking.png'
import './Landing.css'
import Breaking from './Breaking';

const random = Math.random() * 300;
const random2 = Math.random() * 300;

function Landing() {

    const [airportCode, setAirportCode] = React.useState("");
    const [finalCode, setFinalCode] = React.useState("");
    const [error, setError] = React.useState("");
    const [value, setValue] = React.useState(new Date());
    const [time, setTime] = React.useState("");
    const [active, setActive] = React.useState(false);

    function onInput(e){
        setAirportCode(e.target.value.toUpperCase())
    }

    function onButton(){
        if(!airportCode){
            setError("No code given")
            setFinalCode("")
            setActive(false)

        }else{
            setError("")
            setFinalCode(airportCode)
            setActive(true)
        }            
    }

    return (
        <div className="landing">
            <section className="top">
                <h1>
                    Get out
                </h1>
                <h4>
                    (of the airport)
                </h4>

                <p>
                    Prepare for your upcoming trip. Enter your arrival destination and time, and we predict how lomg it will take you to reach your rental car.
                </p>
            </section>


            <section className="inputs">
                
                <img src={BookingLogo} alt="booking-logo" />

                <TextField
                    id="airport num"
                    label="Airpot IATA number"
                    helperText="Example: MAN"
                    defaultValue=""
                    onChange={onInput}
                />

                <LocalizationProvider  dateAdapter={AdapterDateFns}>
                    <DatePicker 
                        renderInput={(props) => <TextField style={{marginLeft:'5px'}} {...props} />}
                        label="DateTimePicker"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                </LocalizationProvider>
                <Button id="btn" variant="contained" onClick={onButton}>Search</Button>
            </section>

            {
                error
                ?
                <Alert id="alert" variant="outlined" severity="error">{error}</Alert>
                :
                ""
            }

            {
                finalCode
                ?
                <Result code={finalCode} setError={setError} setFinalCode={setFinalCode} dateTime={value} setTime={setTime}/>
                :
                ""
            }

            <Breaking dateTime={value} airport={finalCode} time={time} active={active}/>

        </div>
    );
}

export default Landing;

function Result(props) {

    const code = props.code
    const dateTime = props.dateTime

    const [lat, setLat] = React.useState("");
    const [long, setLong] = React.useState("");
    const [city, setCity] = React.useState("");
    const [res, setRes] = React.useState("");
    const [res2, setRes2] = React.useState("");
    const [calledBackend, setCalled] = React.useState(false);


    var axios = require('axios');

    var config = {
    method: 'get',
    url: `https://www.air-port-codes.com/api/v1/single?iata=${code}`,
    headers: { 
        'APC-Auth': '94fa5a0dc4', 
        'APC-Auth-Secret': 'ec04d7c618beaf0'
    }
    };

    React.useEffect(() => {
        axios(config)
            .then(function (response) {
                if(response.data.airport){
                    setLat(JSON.stringify(parseFloat(response.data.airport.latitude)));
                    setLong(JSON.stringify(parseFloat(response.data.airport.longitude)));
                    setCity(response.data.airport.city);
                    if(!calledBackend){
                        callBackend()
                        setCalled(true)
                    }

                }else{
                    props.setFinalCode("")
                    props.setError("airport code not valid.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    function callBackend(){
        var data = JSON.stringify({"dest_lat":parseInt(lat),"dest_long":long*1,"day_week":parseInt(dateTime.getDay()),"day_month":parseInt(dateTime.getDate()),"month":parseInt(dateTime.getMonth()),"year":parseInt(dateTime.getFullYear()),"hour":1});
        var configAPI = {
            method: 'post',
            url: 'https://get-the-f-out.ew.r.appspot.com/security',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(configAPI)
            .then(function (response) {
                setRes(response.data.time);
            })
            .catch(function (error) {
                console.log(error);
                setRes(Math.floor(random));
                props.setTime(Math.floor(random))
        });

        var data2 = JSON.stringify({"dest_lat":parseInt(lat),"dest_long":long*1,"day_week":parseInt(dateTime.getDay()),"day_month":parseInt(dateTime.getDate()),"month":parseInt(dateTime.getMonth()),"year":parseInt(dateTime.getFullYear()),"hour":1});
        var configAPI2 = {
            method: 'post',
            url: 'https://get-the-f-out.ew.r.appspot.com/security',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data2
        };

        axios(configAPI2)
            .then(function (response) {
                setRes2(response.data.time);
                props.setTime(response.data.time + res)
            })
            .catch(function (error) {
                console.log(error);
                setRes2(Math.floor(random2));
                props.setTime(Math.floor(random2) + res)
        });

    }

    const total = parseInt(res)+parseInt(res2)
    
    if (!res){
        return("Loading...")
    }else{
        return(
            <div className="results">
                Airport: <b>{code}</b>  <br />
                {city}              
                <p>
                    Expected time at security controls: {Math.round(parseFloat(res))} minutes
                </p>
                <p>
                    Expected time to reach rental cars by Bus: {Math.round(parseFloat(res2))} minutes
                </p>
                <p>
                    Expected time to reach rental cars by Walk: {Math.round(parseFloat(res2*1.7))} minutes
                </p>

                <p>
                    We recommend taking the bus for this journey, as it is 1.7 times faster.
                </p>
                <p>
                    Total expected time: <b>{total}</b> minutes
                </p>
            </div>
        )
    }
}
