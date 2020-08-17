import React from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object,
  };

  // creating refs
  myInput = React.createRef();

  // create a property of the component to bind this to the component instance
  // declare property and then make it an arrow function
  goToStore = (event) => {
    // 1. prevent default page refresh
    event.preventDefault();
    // 2. get the input value
    const storeName = this.myInput.current.value;
    console.log(storeName);
    // 3. Change the page to /store/whatever-has-been-entered
    // We use the props of the component push to push the state of it
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please select a store</h2>
        <input type="text" required placeholder="enter store name" ref={this.myInput} defaultValue={getFunName()} />
        <button type="submit">Visit store →</button>
      </form>
    );
  }
}

export default StorePicker;
