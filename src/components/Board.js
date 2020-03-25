import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
   

    render() {
        return (
            <div>
                <div style={{display: "flex"}}>
                    <Square value={this.props.squareList[0]} onClick={()=>this.props.onClick(0)}/>
                    <Square value={this.props.squareList[1]} onClick={()=>this.props.onClick(1)}/>
                    <Square value={this.props.squareList[2]} onClick={()=>this.props.onClick(2)}/>
                </div>
                <div style={{display: "flex"}}>
                    <Square value={this.props.squareList[3]} onClick={()=>this.props.onClick(3)}/>
                    <Square value={this.props.squareList[4]} onClick={()=>this.props.onClick(4)}/>
                    <Square value={this.props.squareList[5]} onClick={()=>this.props.onClick(5)}/>
                </div>
                <div style={{display: "flex"}}>
                    <Square value={this.props.squareList[6]} onClick={()=>this.props.onClick(6)}/>
                    <Square value={this.props.squareList[7]} onClick={()=>this.props.onClick(7)}/>
                    <Square value={this.props.squareList[8]} onClick={()=>this.props.onClick(8)}/>
                </div>
            </div>
        )
    }
}
