import axios from 'axios'
import React, {Component} from "react";

import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import { Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import config from '../config'



class EditForm extends Component {
  
  state={
    measurement: [],
    selectedDate: new Date(),
    value: 50,
  }

  
  componentDidMount = () =>{
    let id = this.props.match.params.id
    axios.get(`${config.API_URL}/api/measurement/${id}`)
      .then((response) => {
        this.setState({ 
          measurement: response.data,
          selectedDate: response.data.date,
          value: response.data.weight
        })
      })
      .catch(() => {
        console.log('Detail fetch failed')
      })
  }
  
  handleSliderChange = (event, newValue) => {
    this.setState({
      value:newValue,
    })
  };
  
  handleInputChange = (event) => {
  let newInput = event.target.value === '' ? '' : Number(event.target.value);
  this.setState({
    value: newInput,
  })
  };
  
  handleBlur = () => {
  if (this.state.value < 0) {
    this.setState({
      value: 0,
    });
  } else if (this.state.value > 200) {
    this.setState({
      value: 200,
    });
  }
  };

  render(){
    const { measurement, selectedDate, value } = this.state

    const { onEdit, onDelete } = this.props
    measurement.date= selectedDate;
    measurement.weight = value;

    const paperStyle={margin:35, width: 350, display:'flex', justifyContent:'center'}    
    const divStyle={ height:'450px', maxWidth:'250', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center', flexWrap:'wrap'}
    const buttonStyle={display:'flex', gap:'20px'};
    return (
     <Paper style={paperStyle} elevation={16}>
      <div style={divStyle}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          disabled
          name="date"
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={this.handleDateChange}
          disableFuture
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />
      </MuiPickersUtilsProvider>
      <Grid container spacing={2} justifyContent='center' alignItems="center">
        <Grid style={{maxWidth:208 }}  item xs>
        <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={this.handleSliderChange}
            aria-labelledby="input-slider"
            max={200}
            />
          </Grid>
          <Grid item>
          <Input style={{width:42}}
            name='weight'
            value={this.state.value}
            margin="dense"
            onChange={this.handleInputChange}
            onBlur={this.handleBlur}
            inputProps={{
              step: 1,
              min: 45,
              max: 200,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            />
          </Grid>
          </Grid>
          <div>
            <div style={buttonStyle}>
              <Button variant="contained" color="primary" onClick={ () => onEdit(measurement)}>Edit</Button>
              <Button variant="contained" color="secondary" onClick={ () => onDelete(measurement)}>Delete</Button>
            </div>
          </div>
    </div>
     </Paper>
    )
}}

export default EditForm
