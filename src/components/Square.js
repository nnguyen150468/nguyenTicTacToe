import React, { Component } from 'react'

export default class Square extends Component {
    render() {
        return (
            <button onClick={()=>this.props.onClick()} style={{width: "200px", height:"200px", border:"1px solid black", fontSize:"30px"}}>
                {this.props.value}
            </button>
        )
    }
}
