import React,{Component} from "react";
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import WeightTable from './components/WeightTable'
import AddWeightForm from './components/AddWeightForm'
import EditForm from './components/EditForm'
import axios from 'axios'
import config from './config';
import Graph from "./components/Graph";



class App extends Component {

  state = {
    measurement: [],
    error:null,
  }


  componentDidMount(){
    axios.get(`${config.API_URL}/api/measurement`)
      .then((result) => {
        this.setState({ measurement: result.data})
      })
      .catch((err) => {
        this.setState({
          error: err.data
        })
      })
  }
  

  handleSubmit = (event) => {
    event.preventDefault()
    let date = event.target.date.value
    let weight = event.target.weight.value
    axios.post(`${config.API_URL}/api/create`, {date, weight})
    .then((response) => {
      this.setState({
          measurement: [response.data, ...this.state.measurement ]
      }, () => {
        this.props.history.push('/')
      })
    }).catch((err) => {
      this.setState({
        error: err.data
      });
    })
 }

 handleDelete=(measurement)=>{
  //delete from the DB
  //delete from state
  axios.delete(`http://localhost:5005/api/measurement/${measurement._id}`)
  .then((result) => {
    let filteredMeasurement = this.state.measurement.filter((e)=>{
      return e._id !== measurement._id
    })
    this.setState({
      measurement: filteredMeasurement
    },()=>{
      this.props.history.push('/')
    })
  }).catch((err) => {
    console.log(err)
  });



}

 handleEditMeasurement = (trackMeasure) => {
   console.log(trackMeasure)
  axios.patch(`${config.API_URL}/api/measurement/${trackMeasure._id}` ,{date: trackMeasure.date,
    weight: trackMeasure.weight,     
  })
  .then(() => {
    let newMeasurement = this.state.measurement.map((singleMeasurement) => {
      if (trackMeasure._id === singleMeasurement._id) {
        singleMeasurement.date = trackMeasure.date
        singleMeasurement.weight = trackMeasure.weight
      }
      return singleMeasurement
    })
    console.log(newMeasurement)
    this.setState({
      measurement: newMeasurement
    }, () => {
      this.props.history.push('/')
    })
  })
  .catch((err) => {
    this.state.error = err.data
  })

}
  render(){
    const { measurement } = this.state
    return (
        <div style={{display:'flex', justifyContent:'center'}}>

        <Switch>
          <Route exact path="/" render={() => {
            return <WeightTable measurement={measurement} /> }} />
          <Route path="/create" render={() => {
            return <AddWeightForm onAdd={this.handleSubmit} />
          }} />
          <Route path="/measurement/:id" render={(routeProps) => {
            return <EditForm onDelete={this.handleDelete} onEdit={this.handleEditMeasurement} {...routeProps}/>
          }} />
          <Route path="/graph" render={(routeProps) => {
            return <Graph measurement={measurement}{...routeProps} />
          }} />
        </Switch>
        </div>
    
  );
  }
}

export default withRouter(App);
