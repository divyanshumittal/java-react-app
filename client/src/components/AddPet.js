import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

const API = "/petOwners/all";
//const API = "/petOwners/pet/add?ownerId=2";
const PET_TYPES_API = "/petOwners/petTypes";
class AddPet extends Component {

  constructor(props) {
    super(props);
    this.state = {
        petTypes: [],
    }
    console.log(props.match.params.orderId)
  }

  componentDidMount() {
    fetch(PET_TYPES_API)
      .then(response => response.json())
      .then(data => {
      console.log(data);
//        this.setState({
//            petTypes: data,
//        });
      });
  }

  addPet(owner) {
    console.log(owner);
  }

  render() {
    console.log(this.state)
    return (
      <div className="add-pet">
       Add pet
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
//    petTypes: state.petTypes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {

    }
  }
}

const AddPetComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPet)

export default AddPetComponent;
