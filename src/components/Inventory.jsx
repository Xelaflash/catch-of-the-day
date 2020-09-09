import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    loadSampleFishes: PropTypes.func,
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    // 1. look for the current store in firebase DB
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our owner
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. set the state to inventory component to reflect current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = () => {
    // const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    const authProvider = new firebase.auth.FacebookAuthProvider();
    // console.log(provider);
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  // logout = async () => {
  //   console.log('loggin out');
  //   await firebase.auth().signOut();
  //   this.setState({ uid: null });
  // };

  logout = async () => {
    await firebaseApp.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const logout = (
      <button type="button" onClick={this.logout}>
        Log out!
      </button>
    );
    // check if they are logged inventory
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // check if they are owner of the store.owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>You are not the store owner</p>
          {logout}
        </div>
      );
    }
    // 3. They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button type="button" onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
