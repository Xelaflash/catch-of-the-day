import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please select a store</h2>
        <input type="text" required placeholder="enter store name" value={getFunName()} />
        <button type="submit">Visit store →</button>
      </form>
    );
  }
}

export default StorePicker;
