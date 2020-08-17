import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    loadSampleFishes: PropTypes.func,
    addFish: PropTypes.func,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
  };

  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <hr />
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
          Load sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
