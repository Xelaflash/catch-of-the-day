import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object,
  };

  componentDidMount() {
    const { params } = this.props.match;
    // first reinstate local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(localStorageRef);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    // console.log(this.state.order);
    // setItem take a key value pair. here key == storeName & value == the order state
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
  }

  // clean memory of firebase when we lea a store
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // custom function to update state ==> add fish in inventory component
  addFish = (fish) => {
    // to update a state
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. set new fishes object to state
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updateFish) => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. update state
    fishes[key] = updateFish;
    // 3. set that change into state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. update state, we set the fishes to null in order for firebase to be also updates
    fishes[key] = null;
    // 3. set that change into state
    this.setState({ fishes });
  };

  // another custom function to update state (here load fishes in inventory component)
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key) => {
    // take copy of state
    const order = { ...this.state.order };
    // either add or update the qty in our order
    order[key] = order[key] + 1 || 1;
    // call setState to update our state object
    this.setState({
      order,
    });
  };

  deleteFishFromOrder = (key) => {
    // take copy of state
    const order = { ...this.state.order };
    // either remove or update the qty in our order
    delete order[key];
    // call setState to update our state object
    this.setState({
      order,
    });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} deleteFishFromOrder={this.deleteFishFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
