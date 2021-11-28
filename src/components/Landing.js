import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import BookingLogo from '../pics/booking.png'
import './Landing.css'
import Breaking from './Breaking';


function Landing() {

    const [airportCode, setAirportCode] = React.useState("");
    const [finalCode, setFinalCode] = React.useState("");
    const [error, setError] = React.useState("");
    const [value, setValue] = React.useState(new Date());

    function onInput(e){
        setAirportCode(e.target.value.toUpperCase())
    }

    function onButton(){
        if(!airportCode){
            setError("No code given")
            setFinalCode("")

        }else{
            setError("")
            setFinalCode(airportCode)
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
                    <DateTimePicker 
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
                <Result code={finalCode} setError={setError} setFinalCode={setFinalCode} dateTime={value}/>
                :
                ""
            }

            <Breaking dateTime={value} airport={finalCode}/>

        </div>
    );
}

export default Landing;

function Result(props) {

    const code = props.code
    const dateTime = props.dateTime

    console.log(dateTime)

    const [lat, setLat] = React.useState("");
    const [long, setLong] = React.useState("");
    const [res, setRes] = React.useState("");


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
                    callBackend()
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
        var data = JSON.stringify({"dest_lat":40.369801,"dest_long":-73.7789,"day_week":3,"day_month":6,"month":2,"year":2019,"hour":1});

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
            setRes(JSON.stringify(response.data.time));
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    
    if (!res){
        return("Loading...")
    }else{
        return(
            <div className="results">
                Airport: <b>{code}</b>
                <p>
                    Lat: {lat}
                </p>
                <p>
                    Long: {long}
                </p>
                <p>
                    RES: {res}
                </p>
                <p>
                    Day: {dateTime.getDay()}
                </p>
                <p>
                    Date: {dateTime.getDate()}
                </p>
                <p>
                    Month: {dateTime.getMonth()}
                </p>
                <p>
                    Year: {dateTime.getFullYear()}
                </p>
                <p>
                    Hour: {dateTime.getHours()}
                </p>
            </div>
        )
    }
}
