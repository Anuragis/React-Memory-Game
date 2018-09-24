import React, {Component} from 'react';
import Layout from './Layout';

const card = {cardValue:1, flipped: false}
class DashBoard extends Component{
    constructor (props){
        super(props);
        this.state = {
            height : 6,
            width : 6
        }
        this.clicked=this.clicked.bind(this);
    }
    clicked(event){
        switch(event.target.value){
            case "EASY":
            this.setState({
                height : 6,
                width : 6
            });
            break;

            case "MEDIUM":
            this.setState({
                height : 8,
                width : 8
            });
            break;

            case "HARD":
            this.setState({
                height : 10,
                width : 10
            });
            break;
        }
           
        
    }

    render (){
        return ( 
        <div>
            <Layout width={this.state.width} height={this.state.height}/>
            <br></br>
            <div>
               <b>Difficulty :</b> <select id="currency" name="drp1" className="left-pull" onChange = {this.clicked}>
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                </select>
            </ div>
        </div>
        );
        
    }
}

export default DashBoard;