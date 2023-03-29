import React from "react";



function Cards(props){
const  {cardInfo, num} = props 
let randomNum = Math.floor(Math.random() * 360)

    return(
        <>
        <img src={cardInfo} style={{'z-index': num, position: 'absolute', top: '100px', transform: `rotate(${randomNum}deg)`}}></img>
        </>
    )
}



export default Cards