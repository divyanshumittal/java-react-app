import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { getVets } from '../actions/vetActions';

const GET_ALL_VISITS = "/petOwners/pet/allVisits";
const ADD_VISIT_API = "/petOwners/pet/addVisit";
const CANCEL_VISIT_API = "/petOwners/pet/cancelVisit";

class ScheduleVisit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedDate: moment(),
        scheduleVisitFor: '',
        visits: [],
        error: false,
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.vetChange = this.vetChange.bind(this);
    this.showScheduleVisitForm = this.showScheduleVisitForm.bind(this);
    this.cancelVisit = this.cancelVisit.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
    fetch(GET_ALL_VISITS, { method: 'GET', headers: { 'user-agent': 'Mozilla/4.0 MDN Example', 'content-type': 'application/json' }, })
      .then(response => response.json())
      .then(data => {
        this.setState({
          visits: data,
        });
      });
  }

  handleDateChange(date) {
    this.setState({
      selectedDate: date,
    });
  }

  showScheduleVisitForm(pet) {
    this.setState({
       scheduleVisitFor: pet.name,
    });
  }

  scheduleVisitForm(pet, vets) {
    return (
         <div>
             <div className="add-pet-form">
                <div>
                    <div>Vet</div>
                    <div>Date</div>
                    <div>Description</div>
                </div>
                <div>
                    <select value={this.state.selectedVet} onChange={this.vetChange}>
                    {
                      vets.map(vet => <option key={vet.id} value={vet.firstName}> {vet.firstName} {vet.lastName} </option>)
                    }
                    </select>
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleDateChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        dateFormat="LLL"
                        timeCaption="time"
                    />
                    <input ref={(input) => this.visitDescriptionInput = input}/>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <button className="add-btn" onClick={() => this.scheduleVisit(pet)}>Schedule</button>
            </div>
            {this.state.error && <div style={{ color: 'red', textAlign: 'center' }}>Error</div>}
        </div>
    );
  }

  scheduleVisit(pet) {
    const { selectedDate } = this.state;
    const visit = {
        date: this.state.selectedDate.toDate(),
        description: this.visitDescriptionInput.value,
        petId: pet.id,
    };
    if (selectedDate.weekday() === 6 || selectedDate.weekday() === 7 ||
            selectedDate.hour() < 8 || selectedDate.hour() > 17 || !this.visitDescriptionInput.value) {
        this.setState({
            error: true,
        })
        return;
    }
    fetch(ADD_VISIT_API, { body: JSON.stringify(visit), method: 'POST', headers: { 'user-agent': 'Mozilla/4.0 MDN Example', 'content-type': 'application/json' }, })
      .then(response => response.json())
      .then(visit => {
        this.setState({
            error: false,
            visits: [...this.state.visits, visit],
            scheduleVisitFor: '',
        });
      });
  }

  vetChange(event) {
    this.setState({selectedVet: event.target.value});
  }

  cancelVisit(visit) {
   fetch(CANCEL_VISIT_API, { body: JSON.stringify(visit), method: 'DELETE', headers: { 'user-agent': 'Mozilla/4.0 MDN Example', 'content-type': 'application/json' }, })
      .then(response => response.json())
      .then(() => {
        this.state.visits.splice(this.state.visits.indexOf(visit), 1)
        this.setState({
            visits: this.state.visits,
        });
      });
  }

  render() {
    const { owner, vets } = this.props;

    return (
      <div>
      {
         owner.pets.map((pet, i) => {
           return (
           <div style={{ border: '1px solid black', padding: 10 }}>
             <span style={{ padding: '5px 0' }}>{pet.name}</span>
             {this.state.scheduleVisitFor !== pet.name && <span style={{ paddingLeft: '50px' }} ><button onClick={() => this.showScheduleVisitForm(pet)}>Schedule visit</button></span>}
             {
                 this.state.scheduleVisitFor === pet.name && this.scheduleVisitForm(pet, vets)
             }
             <div style={{ padding: '5px 0'}}>
                 <span>Scheduled visits: </span>
                 {
                     this.state.visits.filter(visit => visit.petId === pet.id).length ?
                         this.state.visits.filter(visit => visit.petId === pet.id).map(visit => {
                             return <div>
                                       {moment(visit.date).format('YYYY-MM-DD HH:mm:ss')}
                                       <button onClick={() => this.cancelVisit(visit)}>Cancel</button>
                                    </div>;
                         }) : 'None'
                 }
             </div>
           </div>)
         })
      }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    vets: state.vets,
    owner: ownProps.owner,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => dispatch(getVets())
  }
}

const ScheduleVisitComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleVisit)

export default ScheduleVisitComponent;
