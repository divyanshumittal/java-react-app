import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVets } from '../actions/vetActions';

const ADD_VET_API = "/vets/add";

class AddVet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vets: [],
    }
    this.addVet = this.addVet.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
        vets: newProps.vets,
    });
  }

  addVet() {
    const vet = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        speciality: {
            name: this.speciality.value
        }
     };
    fetch(ADD_VET_API, { body: JSON.stringify(vet), method: 'POST', headers: { 'user-agent': 'Mozilla/4.0 MDN Example', 'content-type': 'application/json' }, })
      .then(response => response.json())
      .then(vet => {
      console.log(vet);
        this.setState({
          vets: this.state.vets.concat(vet),
        });
    });
  }

  render() {
    const { vets } = this.state;
    return (
    <div>
        {
            vets.map((vet) => {
              return <div>{vet.firstName} {vet.lastName} </div>;
            })
         }
         <div className="add-vet">
            <div><b>Add Vet</b></div>
            <div className="add-vet-form">
                <div>
                    <div>First name</div>
                    <div>Last name</div>
                    <div>Type</div>
                </div>
                <div>
                    <input ref={(input) => this.firstName = input}/>
                    <input ref={(input) => this.lastName = input}/>
                    <input ref={(input) => this.speciality = input}/>
                </div>
             </div>
           <div style={{ textAlign: 'center' }}>
              <button className="add-btn" onClick={this.addVet}>Add</button>
           </div>
         </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vets: state.vets,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(getVets())
  };
}

const AddVetComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVet)

export default AddVetComponent;
