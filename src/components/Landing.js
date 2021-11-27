import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './Landing.css'


function Landing() {

    const [airportCode, setAirportCode] = React.useState("");
    const [finalCode, setFinalCode] = React.useState("");
    const [error, setError] = React.useState("");

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
                <TextField
                    id="airport num"
                    label="Airpot IATA number"
                    helperText="Example: MAN"
                    defaultValue=""
                    onChange={onInput}
                />
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
                <Result code={finalCode} setError={setError} setFinalCode={setFinalCode}/>
                :
                ""
            }

        </div>
    );
}

export default Landing;

function Result(props) {

    const code = props.code

    const [lat, setLat] = React.useState("");
    const [long, setLong] = React.useState("");


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
                }else{
                    props.setFinalCode("")
                    props.setError("airport code not valid.")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    

    return(
        <div className="results">
            Airport: <b>{code}</b>
            <p>
                Lat: {lat}
            </p>
            <p>
                Long: {long}
            </p>
        </div>
    )
}
