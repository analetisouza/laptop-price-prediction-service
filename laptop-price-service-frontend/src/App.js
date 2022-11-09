import React from 'react';
import './App.css';
import axios from 'axios';

class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      brand:  '',
      os: '',
      screen_size: 0, 
      weight: 0,
      memory: 0,
      disk_type: '',
      disk_size: 0,
      cpu_brand: '',
      cpu_model: '',
      cpu_clock: 0,
      gpu_brand: '',
      gpu_model: '',
      prediction: 0
    }
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  handleSubmit = event => {
    event.preventDefault()

    let form = {
      brand:  this.state.brand,
      os: this.state.os,
      screen_size: this.state.screen_size, 
      weight: this.state.weight,
      memory: this.state.memory,
      disk_type: this.state.disk_type,
      disk_size: this.state.disk_size,
      cpu_brand: this.state.cpu_brand,
      cpu_model: this.state.cpu_model,
      cpu_clock: this.state.cpu_clock,
      gpu_brand: this.state.gpu_brand,
      gpu_model: this.state.gpu_model
    }
    
    var formData = new FormData()
    for (var key in form){
      formData.append(key, form[key])
    }

    axios.post('https://laptop-prediction-service-api-5p4xwgs3.ue.gateway.dev', formData)
        .then(response => this.setState({ prediction: response.data, currentStep: 5}));

  }

  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 4? 5: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep < 4){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;

}
  
  render() {    
    return (
      <React.Fragment>
      <h1>Hi! Let's find out the price of your laptop?</h1>

      <form onSubmit={this.handleSubmit}>

        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          brand={this.state.brand}
          os={this.state.os}
          screen_size={this.state.screen_size}
          weight={this.state.weight}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          memory={this.state.memory}
          disk_type={this.state.disk_type}
          disk_size={this.state.disk_size}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          cpu_brand={this.state.cpu_brand}
          cpu_model={this.state.cpu_model}
          cpu_clock={this.state.cpu_clock}
        />
        <Step4 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          gpu_brand={this.state.gpu_brand}
          gpu_model={this.state.gpu_model}
        />
       { <ResultScreen 
          currentStep={this.state.currentStep}
          prediction={this.state.prediction} 
          handleChange={this.handleChange}
        />  }

        {this.previousButton()}
        {this.nextButton()}
        {// {this.resultScreen()}
  }
      </form>
      </React.Fragment>
    );
  }
}

function ResultScreen(props){
  let currentStep = props.currentStep;
  let prediction = props.prediction;
  if (currentStep === 5){
    return (
    <div>
    <h2>Your laptop price is €{prediction}</h2>
    </div>)
  }
  return null;
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <p>Basic Infomation </p> 
      <label htmlFor="brand">Laptop Brand</label>
      <input
        className="form-control"
        id="brand"
        name="brand"
        type="text"
        value={props.brand}
        onChange={props.handleChange}
        />

      <label htmlFor="os">Operational System</label>
      <input
        className="form-control"
        id="os"
        name="os"
        type="text"
        value={props.os}
        onChange={props.handleChange}
        />

      <label htmlFor="screen_size">Screen Size (in)</label>
      <input
        className="form-control"
        id="screen_size"
        name="screen_size"
        type="number"
        value={props.screen_size}
        onChange={props.handleChange}
        />

      <label htmlFor="weight">Weight (kg)</label>
      <input
        className="form-control"
        id="weight"
        name="weight"
        type="number"
        value={props.weight}
        onChange={props.handleChange}
        />
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group">
      <p>Storage Infromation </p> 
      <label htmlFor="memory">RAM Capacity (GB)</label>
      <input
        className="form-control"
        id="memory"
        name="memory"
        type="number"
        value={props.memory}
        onChange={props.handleChange}
        />

      <label htmlFor="disk_type">Disk Type</label>
      <input
        className="form-control"
        id="disk_type"
        name="disk_type"
        type="text"
        value={props.disk_type}
        onChange={props.handleChange}
        />
      <div id="gambiarra">
      <label htmlFor="disk_size">Disk Capacity (GB)</label>
      <input
        className="form-control"
        id="disk_size"
        name="disk_size"
        type="number"
        value={props.disk_size}
        onChange={props.handleChange}
        />
    </div>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    <div className="form-group">
      <p>Processor Information</p> 
      <label htmlFor="cpu_brand">Processor Brand</label>
      <input
        className="form-control"
        id="cpu_brand"
        name="cpu_brand"
        type="text"
        value={props.cpu_brand}
        onChange={props.handleChange}
        /> 
        
      <label htmlFor="cpu_model">Processor Model</label>
      <input
        className="form-control"
        id="cpu_model"
        name="cpu_model"
        type="text"
        value={props.cpu_model}
        onChange={props.handleChange}
        /> 
                
      <label htmlFor="cpu_model">Processor Clock (GHz)</label>
      <input
        className="form-control"
        id="cpu_clock"
        name="cpu_clock"
        type="number"
        value={props.cpu_clock}
        onChange={props.handleChange}
        />           
    </div>
  );
  }

  function Step4(props) {
    if (props.currentStep !== 4) {
      return null
    } 
    return(
      <React.Fragment> 
      <div className="form-group">
      <p>Graphics Card Information</p> 
      <label htmlFor="gpu_brand">Graphics Card Brand</label>
      <input
        className="form-control"
        id="gpu_brand"
        name="gpu_brand"
        type="text"
        value={props.gpu_brand}
        onChange={props.handleChange}
        /> 
      
      <div id="gambiarra">
      <label htmlFor="gpu_model">Graphics Card Model</label>
      <input
        className="form-control"
        id="gpu_model"
        name="gpu_model"
        type="text"
        value={props.gpu_model}
        onChange={props.handleChange}
        />    
      </div>
      </div>  
          <button className="btn btn-success btn-block">Send</button>
      </React.Fragment>   
    );
    }

  /*function Step5(props) { 
    if (props.currentStep !== 5) {
      return null
    } 
    return(
      <React.Fragment> 
      <div className="form-control">
      <p>Your laptop price is</p> 
      </div>
      </React.Fragment> 
  );
  }*/

export default MasterForm;
