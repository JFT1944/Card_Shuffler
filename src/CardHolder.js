// import React from 'react'
import React, { useState, useEffect } from "react";
import Cards from './Cards'
import axios from "axios";



function CardHolder(props){
const [noCard, newCard] = useState([])
const [cardNum, updatedCardNum] = useState([])

function addingNewCard(card){
    newCard((oldDeck) => {

        oldDeck.push(card.data.cards[0])
        console.log(oldDeck)
        return [...oldDeck]
    })
}


useEffect(() => {
    const cardResponse = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then((res) =>{
        console.log(res)
        updatedCardNum(res.data.deck_id)
        console.log(newCard)
    })
}, [])

function chooseACard(){

    let drawnCard = axios.get(`https://deckofcardsapi.com/api/deck/${cardNum}/draw/?count=1`).then((res)=>{
    console.log(res || undefined)   
    if(res.data.error){
        alert('No More Cards!')
        return
    }
    addingNewCard(res) 
    }).catch((e) => {
        console.log(e)
    })
} 
function removeACard(){
    newCard((oldDeck) => {
            oldDeck = []
            return [...oldDeck]
    })
} 
function ReshuffleDeck(){

    removeACard()
    axios.get(`https://deckofcardsapi.com/api/deck/${cardNum}/shuffle/`).then((res) => {

        updatedCardNum(res.data.deck_id)
    })
}


    return(
        <>
        <div>
        <button onClick={(evt) => chooseACard()}>New Card Please</button>
        <button onClick={(evt)=> ReshuffleDeck()}>Reshuffle</button>
        <div style={{display: 'flex', 'justify-content': 'center', 'align-items': 'center', 'flex-direction': 'column-reverse'}}>
        {/* <Cards /> */}
        <h2>{console.log(noCard)}</h2>
        {noCard.map((x, y) => <Cards cardInfo={x.image} num={y}/>)}
        
        </div>
        </div>
        </>
    )
}


export default CardHolder