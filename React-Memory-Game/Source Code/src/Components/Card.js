import React, {Component} from 'react';
import '../App.css'
class Card extends Component {
    render(){
        return <div className = "card">
                    <span>    
                        {this.props.card.flipped ? this.props.card.cardValue: "?"} 
                    </span>
                </div>
    }
}



export default Card;
