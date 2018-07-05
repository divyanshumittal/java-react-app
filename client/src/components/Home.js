import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOwners } from '../actions/ownerActions';
import { bindActionCreators } from 'redux';

class Home extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div>
        {
          this.props.owners.map((owner) => {
              return (
                  <div className="owner">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>{owner.firstName} {owner.lastName}</div>
                          <Link to={"/addPet/" + owner.id}>Add pet </Link>
                      </div>
                      <div>{owner.address} {owner.city}</div>
                      {owner.pets.length && <span>Pets List:</span>}
                      {
                          owner.pets.map((pet, i) => {
                              return (
                              <span>
                                  <span style={{ paddingLeft: '5px' }}>{pet.name}</span>
                                  {(i !== owner.pets.length - 1) ? <span>,</span> : null}
                              </span>)
                          })
                      }

                  </div>
              );
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        owners: state.owners
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
