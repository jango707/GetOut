import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Fallout.css';
import { InfinityStaged } from 'react-staged';
import 'react-staged/dist/assets/staged.scss';

import cityPic1 from '../pics/city1.jpg'
import cityPic2 from '../pics/city2.jpg'
import cityPic3 from '../pics/city3.jpg'
import cityPic4 from '../pics/city4.jpg'
import cityPic5 from '../pics/city5.jpg'
import cityPic6 from '../pics/city6.jpg'
import cityPic7 from '../pics/city7.jpg'

import amazon1 from '../pics/amazon1.png'
import amazon2 from '../pics/amazon2.png'
import amazon3 from '../pics/amazon3.png'
import amazon4 from '../pics/amazon4.png'
import amazon5 from '../pics/amazon5.png'
import amazon6 from '../pics/amazon6.png'

var _cities = [cityPic1, cityPic2, cityPic3, cityPic4,cityPic5, cityPic6, cityPic7]
var amazon = [amazon1, amazon2, amazon3, amazon4, amazon5, amazon6]

function Fallout(props) {

    const [city, setCity] = React.useState("");
    const [cities, setCities] = React.useState([]);
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
                FindCloseCities(response.data.airport.country.name)
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    function FindCloseCities(country){
        if (country === "United Kingdom"){
            country = "ireland"
        }
        if (country === "United States"){
            country = "canada"
        }
        var dataCities = JSON.stringify({"limit":200,"order":"asc","orderBy":"population","country":country});

        var configCities = {
            method: 'post',
            url: 'https://countriesnow.space/api/v0.1/countries/population/cities/filter',
            headers: { 
                'Content-Type': 'application/json'
        },
        data : dataCities
        };

        axios(configCities)
            .then(function (response) {
                var arr = []
                for(var i = 0; i < response.data.data.length; i++){
                    arr.push(response.data.data[i].city)
                }

                setCities(arr);
            })
            .catch(function (error) {
                console.log(error);
        });

    }

    function onImg(){
        window.open("https://www.amazon.co.uk/Spear-Jackson-Traditional-Childrens-Fork/dp/B004UQNKJ8/ref=sr_1_53?keywords=pitchforks&qid=1638072451&sr=8-53", '_blank').focus();
    }

    return (
        <div className="fallout" ref={myRef}>
            <h1>
                National State of Nuclear Fallout
            </h1>

            <h2>
                You have <b style={{color:'#310202'}}>{parseInt(props.time)}</b> minutes to get to your rental car!
            </h2>

            <p>For your arrival the {props.dateTime.getDate()}th in {city}. Please follow these rules:

                <li>Run Away!</li>
                <li>Seek Shelter</li>
                <li>Defend yourself</li>
            </p>

            <div id="amazon">
                <p>We recommend these rural places close to {city} to escape:</p>
                <InfinityStaged amount={4}>
                    {cities.map((_city,i) => {
                        while(i>3){
                            i-=4
                        }
                        return(
                            <div key={i}>
                                <Card sx={{ maxWidth: 345, margin:'40px' }}>
                                    <img style={{width:"100%", borderRadius:'0px'}} src={_cities[i]} alt="cityPic" />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {_city}
                                        </Typography>
                                        <br />
                                        <Typography variant="body" color="text.primary">
                                        Escape {city} by driving up here!
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                    }
                </InfinityStaged>
            </div>

            <div id="amazon">
                <p>We recommend these articles to self defend yourself:</p>
                <InfinityStaged amount={4}>
                    {amazon.map((element,i) => {
                        return(
                            <img key={i} onClick={onImg} src={element} alt="amazon"/>
                        )
                        
                    })}
                </InfinityStaged>
            </div>

            
        </div>
    );
}

export default Fallout;