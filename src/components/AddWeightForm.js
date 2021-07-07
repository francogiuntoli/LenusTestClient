import React from 'react';
import {Link} from 'react-router-dom'
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


const useStyles = makeStyles((theme) => ({
  root: {
    margin:35,
    width: 350,
    display:'flex',
    justifyContent:'center',
  },
  input: {
    width: 42,
  },
  container: {
    height:'400px', maxWidth:'250', display:'flex', flexDirection:'column', justifyContent:'space-around', alignItems:'center', flexWrap:'wrap'
  },
}));

export default function AddForm(props) {
  const { onAdd } = props
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(new Date);
  const [value, setValue] = React.useState(50);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 200) {
      setValue(200);
    }
  };

  return (


  <Paper className={classes.root} elevation={16}>
      <form className={classes.container} onSubmit={onAdd} noValidate>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
          name="date"
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          label="Pick a Date"
          value={selectedDate}
          onChange={handleDateChange}
          disableFuture
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs>
        <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
          <Input
            name='weight'
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
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
      <Button variant='contained' color='secondary' type='submit'>Submit</Button>


      <Button variant='outlined' color='primary' component={Link} to='/'>Back</Button>
      
      </form>
      </Paper>

  );
}




