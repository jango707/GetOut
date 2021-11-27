import React from 'react';
import { Shake } from 'reshake'
import FalloutVideo from '../pics/fallout.mp4'
import './Breaking.css'
import Fallout from './Fallout';

function Breaking() {

    const [shake, setShake] = React.useState(false);
    const [isShaking, setIsShaking] = React.useState(true);

    const [fallout, setFallout] = React.useState(false);

    
    function onStart(){
        setShake(true)
        startFallout()
        setTimeout(function () {
            endFallout()
         }, 3000);
    }

    function endFallout(){
        setShake(false)
        setIsShaking(false)
        setFallout(true)
    }

    function startFallout(){ 
        setIsShaking(true)
        startTimer()
        setTimeout(function () {
            startFallout(false)
         }, 2000);
    }

    function startTimer(){
        setTimeout(function () {
           setIsShaking(false)
        }, 1000);
    }

    return (
        <div className="breaking">
            {!fallout
            ?
                <button onClick={onStart}>
                    Breaking News
                </button>
            :
                ""
            }
            {
                shake
                ?
                <Shake 
                    h={11}
                    v={22}
                    r={1}
                    dur={360}
                    int={5}
                    max={99}
                    fixed={true}
                    fixedStop={false}
                    freez={false}
                    active={isShaking}>
                    
                    <video width="320" height="240" controls autoPlay={true}>
                        <source src={FalloutVideo} type="video/mp4" />
                    </video>


                </Shake>
                :
                ""
            }

            {
                fallout
                ?
                <Fallout />
                :
                ""
            }
                    
        </div>
    );
}

export default Breaking;