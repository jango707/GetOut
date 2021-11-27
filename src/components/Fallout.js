import React from 'react';
import './Fallout.css';

function Fallout() {
    const myRef = React.createRef();

    React.useEffect(() => {
        scrollTo(myRef)
      });

    const scrollTo = (ref) => {
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }


    return (
        <div className="fallout" ref={myRef}>
            <h1>FALLOUT TIMEEEE
            </h1>
        </div>
    );
}

export default Fallout;