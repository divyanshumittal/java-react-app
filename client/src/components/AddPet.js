import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import ScheduleVisit from './ScheduleVisit';

const ADD_PET_API = "/petOwners/pet/add";
const PET_TYPES_API = "/petOwners/petTypes";

class AddPet extends Component {

  constructor(props) {
    super(props);
    this.state = {
        petTypes: [],
        showAddForm: false,
        selectedDate: moment(),
        selectedPetType: '',
    };
    this.addPet = this.addPet.bind(this);
    this.showAddPetForm = this.showAddPetForm.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.petTypeChange = this.petTypeChange.bind(this);
  }

  componentDidMount() {
    fetch(PET_TYPES_API)
      .then(response => response.json())
      .then(data => {
        this.setState({
            owner: this.props.owners.find(owner => owner.id == this.props.match.params.ownerId ),
            petTypes: data,
            selectedPetType: data[0].name,
        });
      });
  }

  handleDateChange(date) {
    this.setState({
      selectedDate: date
    });
  }

  showAddPetForm() {
    this.setState({
       showAddForm: true,
    });
  }

  petTypeChange(event) {
    this.setState({selectedPetType: event.target.value});
  }

  addPet() {
    const pet = {
      name: this.input.value,
      type: this.state.petTypes.find(type => type.name === this.state.selectedPetType),
      birthDate: this.state.selectedDate.toDate(),
      owner: this.props.owners.find(owner => owner.id == this.props.match.params.ownerId ),
      visits: [],
    };
    fetch(ADD_PET_API, { body: JSON.stringify(pet), method: 'POST', headers: { 'user-agent': 'Mozilla/4.0 MDN Example', 'content-type': 'application/json' }, })
      .then(response => response.json())
      .then(ownerObj => {
        this.setState({
            owner: ownerObj,
            showAddForm: false,
        });
      });
  }

  addPetForm() {
    return (
         <div>
             <div className="add-pet-form">
                <div>
                    <div>Name</div>
                    <div>Birthdate</div>
                    <div>Type</div>
                </div>
                <div>
                    <input ref={(input) => this.input = input}/>
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                    <select value={this.state.selectedPetType} onChange={this.petTypeChange}>
                        {
                        this.state.petTypes.map(petType => <option key={petType.id} value={petType.name}> {petType.name} </option>)
                        }
                    </select>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button className="add-btn" onClick={this.addPet}>Add</button>
            </div>
        </div>
    );
  }

  render() {
    const owner = this.state.owner || this.props.owners.find(owner => owner.id == this.props.match.params.ownerId );

    return (
      <div className="add-pet">
        <div><b>Owner Information</b></div>
        <div className="row">
           <div>Name:</div>
           <div>{ owner.firstName} {owner.lastName}</div>
        </div>
        <div className="row">
           <div>Address:</div>
           <div>{ owner.address}</div>
        </div>
        <div className="row">
           <div>City:</div>
           <div>{ owner.city}</div>
        </div>
        <div className="row">
           <div>Telephone:</div>
           <div>{ owner.telephone}</div>
        </div>
        <div>
           <div className="pets-section">Pets:
              <ScheduleVisit owner={owner} />
           </div>
        </div>
        <div style={{ textAlign: 'center' }}>
           {!this.state.showAddForm && <button className="add-btn" onClick={this.showAddPetForm}>Add new pet</button>}
        </div>
        {
          this.state.showAddForm && this.addPetForm()
        }
     </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    owners: state.owners,
    petTypes: state.petTypes,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  }
}

const AddPetComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPet)

export default AddPetComponent;
