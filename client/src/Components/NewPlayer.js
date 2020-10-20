import React from 'react';


export const PlayerItem = (props) => (

        <div className="player__items">
            <svg height="100" width="100">
                <circle cx="50" cy="50" r="35" stroke-width="3" stroke={props.stroke} fill={props.colour} />
            </svg>

            <h3 >{props.name} | {props.score}</h3>
        </div>

)

export default NewPlayer;
