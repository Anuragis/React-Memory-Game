import React, {Component} from 'react';
import Card from './Card';


function createArray(x,y){
    return Array.apply(null, Array(x)).map(function(e){
        return Array(y);
    });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const gameStates = {
                    WFTFC: "WAITING_FOR_THE_FIRST_CARD", 
                    WFTSC: "WAITING_FOR_THE_SECOND_CARD",
                    WRONG: "WRONG",
                    FINISHED: "FINISHED"
                }

class Layout extends Component{
    constructor (props){
        super(props);
        
        var cards = createArray(props.height, props.width);
        var numbers = [];
        this.state = {
            cards : cards,
            gameState: gameStates.WFTFC,
            firstCard : null,
            secondCard : null,
            finished:false,
            unflippedCards:6*6,
            height:6,
            width:6,
            bestScore:0,
            currentScore:0

        }
        for(var oneDIndex = 0; oneDIndex<this.state.height*this.state.width;oneDIndex++){
            numbers.push(Math.floor(oneDIndex/2)+1);
        }

        shuffle(numbers);
        for(var row=0; row<this.state.height; row++){
            for(var col=0; col<this.state.width; col++){
                cards[row][col] = {cardValue: numbers[row*this.state.width+col], flipped : false, rowIndex:row, columnIndex:col}
            }
        }
    }

    cardClicked(card){
        console.log("Flipped", this.state.unflippedCards);
        if(!card.flipped){
            
            switch(this.state.gameState){
                
                case gameStates.WFTFC:
                    this.state.cards[card.rowIndex][card.columnIndex].flipped= true
                    this.setState({
                        cards: this.state.cards,
                        firstCard: card,
                        gameState: gameStates.WFTSC,
                        unflippedCards: this.state.unflippedCards-1
                    });
                    break;
                case gameStates.WFTSC:
                    this.state.cards[card.rowIndex][card.columnIndex].flipped= true
                    
                    if(this.state.firstCard.cardValue == card.cardValue){
                        this.state.currentScore =  this.state.currentScore +1;
                            if(this.state.currentScore>this.state.bestScore){
                                this.state.bestScore = this.state.currentScore;
                            }
                            this.setState({
                                cards: this.state.cards,
                                gameState: gameStates.WFTFC,
                                unflippedCards: this.state.unflippedCards-1,
                                currentScore:this.state.currentScore,
                                bestScore : this.state.bestScore
                            });

                           

                    }else{
                        this.setState({
                            gameState: gameStates.WRONG,
                            cards: this.state.cards,
                            secondCard : card,
                            unflippedCards: this.state.unflippedCards - 1
                        });
                    }
                    break;
                case gameStates.WRONG:
                    this.state.cards[this.state.firstCard.rowIndex][this.state.firstCard.columnIndex].flipped= false;
                    this.state.cards[this.state.secondCard.rowIndex][this.state.secondCard.columnIndex].flipped= false;
                    this.state.cards[card.rowIndex][card.columnIndex].flipped = true;
                    this.setState({
                        cards: this.state.cards,
                        gameState: gameStates.WFTSC,
                        firstCard: card,
                        unflippedCards: this.state.unflippedCards+ 1
                    });
                    break;
            }

   
           
        }
    }


    componentWillReceiveProps(props) {
        var cards = createArray(props.height, props.width);
        var numbers = [];
        for(var oneDIndex = 0; oneDIndex<props.height*props.width;oneDIndex++){
            numbers.push(Math.floor(oneDIndex/2)+1);
        }

        shuffle(numbers);
        for(var row=0; row<props.height; row++){
            for(var col=0; col<props.width; col++){
                cards[row][col] = {cardValue: numbers[row*props.width+col], flipped : false, rowIndex:row, columnIndex:col}
            }
        }

        this.setState({...this.state,
            height : props.height,
            cards : cards,
            width : props.width

        });
        console.log("Height",props.height);
      }

      handleReset(){
        var cards = createArray(this.state.height, this.state.width);
        var numbers = [];
        for(var oneDIndex = 0; oneDIndex<this.state.height*this.state.width;oneDIndex++){
            numbers.push(Math.floor(oneDIndex/2)+1);
        }

        shuffle(numbers);
        for(var row=0; row<this.state.height; row++){
            for(var col=0; col<this.state.width; col++){
                cards[row][col] = {cardValue: numbers[row*this.state.width+col], flipped : false, rowIndex:row, columnIndex:col}
            }
        }
        this.setState({
            cards: cards,
            unflippedCards: this.state.height*this.state.width,
            currentScore:0
        });
      }
   
    render (){

        var cardsRendered = null;
        console.log("State dsass", this.state.height);
            console.log("State", this.state.unflippedCards);
            console.log("cards", this.state.cards);
            if(this.state.unflippedCards == 0){
                cardsRendered=  <tr>You Won!!!</tr>
            }else{
                cardsRendered= this.state.cards.map((rowOfCards, rowIndex)=>
                <tr>
                    {rowOfCards.map((card, indexOfCardInRow)=>
                            <td onClick = {()=>this.cardClicked(card)}>
                                <Card card = {card}/>
                            </td>)
                    }     
                </tr>);
            }
        
 

        
        return (<div>
                    <table>
                        <tbody>{cardsRendered}</tbody>
                    </table>
                    <button type="submit" className = "btn" onClick = {()=>this.handleReset()}>Reset</button>
                    <br></br>
                    <br></br>
                    <div><b>Best Score: {this.state.bestScore}</b></div>
                    <div><b>Current Score: {this.state.currentScore}</b></div> 
                </div>
            )
        
    }
}

export default Layout;