import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import './Landing.css'


function Landing() {

    const [airportCode, setAirportCode] = React.useState("");
    const [finalCode, setFinalCode] = React.useState("");
    const [Error, setError] = React.useState("");

    function onInput(e){
        setAirportCode(e.target.value)
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
                Error
                ?
                <Alert id="alert" variant="outlined" severity="error">Code empty</Alert>
                :
                ""
            }

            {
                finalCode
                ?
                <Result code={finalCode}/>
                :
                ""
            }

        </div>
    );
}

export default Landing;

function Result(props) {

    const code = props.code

    return(
        <div className="results">
            Airport: <b>{code}</b>
        </div>
    )
}
