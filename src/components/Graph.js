import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';


function BarGroup(props) {
  let barPadding = 2
  let barColour = '#f50057'
  let widthScale = d => d * 10

  let width = widthScale(props.d.weight*0.5)
  let yMid = props.barHeight * 0.5
  
  return <g className="bar-group">
    <text className="name-label" x="-83" y={yMid} alignmentBaseline="middle" >{props.d.date}</text>
    <text className="value-label" x={width+10} y={yMid} alignmentBaseline="middle" >{props.d.weight}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
  </g>
}


export default class Graph extends Component {
  render() {
    const { measurement } = this.props
    
    const graphPaper= {margin:35, minWidth:'810px'}
    const divCenter = {display:'flex', justifyContent:'center'}
    let barHeight = 30
    let barGroups = measurement.slice(0,10).map((d, i) => 
      <g transform={`translate(0, ${i * barHeight})`}>
      <BarGroup d={d} barHeight={barHeight} />
      </g>)                         
      
    return <div>
    <Paper style={graphPaper} elevation={16}>    
    <svg width="800" height="450" >
      <g className="container">
        <text className="title" x="10" y="30">Your Measurements</text>
        <g className="chart" transform="translate(100,60)">
          {barGroups}
        </g>
      </g>
    </svg>


</Paper>


<Button style={{marginLeft:'45%'}} variant='contained' color='primary' component={Link} to="/">Back</Button>

    </div>
      
  }
  

}
