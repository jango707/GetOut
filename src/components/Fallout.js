import React from 'react';
import  { Grid } from '@material-ui/core';
import './Fallout.css';
import amazon from '../pics/amazon1.png'
import { InfinityStaged } from 'react-staged';
import 'react-staged/dist/assets/staged.scss';

function Fallout(props) {

    const [city, setCity] = React.useState("");
    const [hasScrolled, setHasScrolled] = React.useState(false);

    const myRef = React.createRef();

    React.useEffect(() => {
        if(!hasScrolled){
            scrollTo(myRef)
        }
      });

    const scrollTo = (ref) => {
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setHasScrolled(true)
        }
    }

    var axios = require('axios');

    var config = {
    method: 'get',
    url: `https://www.air-port-codes.com/api/v1/single?iata=${props.airport}`,
    headers: { 
        'APC-Auth': '94fa5a0dc4', 
        'APC-Auth-Secret': 'ec04d7c618beaf0'
    }
    };

    React.useEffect(() => {
        axios(config)
            .then(function (response) {
                setCity(response.data.airport.city)
            })
            .catch(function (error) {
                console.log(error);
            });
    });


    return (
        <div className="fallout" ref={myRef}>
            <h1>
                National State of Nuclear Fallout
            </h1>

            For your arrival the {props.dateTime.getDate()}th in {city}, Please follow these rules:

            <li>Run Away!</li>
            <li>Seek Shelter</li>
            <li>Defend yourself</li>

            <div id="amazon">
                <p>We recommend these rural places close to {city} to escape:</p>
                <InfinityStaged amount={4}>
                    <img src={amazon} alt="amazon"/>
                    <img src={amazon} alt="amazon"/>
                    <img src={amazon} alt="amazon"/>
                </InfinityStaged>
            </div>

            <div id="amazon">
                <p>We recommend these articles to self defend yourself:</p>
                <InfinityStaged amount={4}>
                    <img src={amazon} alt="amazon"/>
                    <img src={amazon} alt="amazon"/>
                    <img src={amazon} alt="amazon"/>
                </InfinityStaged>
            </div>
            
        </div>
    );
}

export default Fallout;