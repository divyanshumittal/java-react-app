import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOwners } from '../actions';
import { bindActionCreators } from 'redux';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    console.log('props', this.props);
    return (
      <div className="App">
        <div>
        hi
          {
            this.props.ownersList && this.props.ownersList.map((owner) => {
                return (
                    <div className="owner">
                        <div>{owner.firstName} {owner.lastName}</div>
                        {owner.pets.length && <div>Pets List:</div>}
                        {
                            owner.pets.map((pet) => {
                                return <div>{pet.name}</div>
                            })
                        }
                        <Link to={"/addPet/" + owner.id}>Add pet </Link>
                    </div>
                );
            })
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    // state has ownersReducer and testReducer, ownersReducer = array of 10 users, testReducers = {}
    // if I do ownersList: state.ownersReducer then this.props.ownersList = {} in render()
    console.log('state', state);
    return {
        ownersList: state.owners
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(getOwners())
    };
};

Home.defaultProps = {
  ownersList: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
