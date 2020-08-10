import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <hr />
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm key={key} index={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button type="button" onClick={this.props.loadSampleFishes}>
          Load sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
