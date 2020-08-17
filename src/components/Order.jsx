import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { formatPrice } from '../helpers';

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func,
  };

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const qty = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 },
    };

    // Make sure this fish is loaded before we continue
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>;
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition classNames="count" key={qty} timeout={{ enter: 500, exit: 500 }}>
                <span>{qty}</span>
              </CSSTransition>
            </TransitionGroup>
            <span id="kg">kgs</span>
          </span>
          <strong id="fishName">{fish.name}</strong>
          {formatPrice(qty * fish.price)}
          <button type="button" onClick={() => this.props.deleteFishFromOrder(key)}>
            &times;
          </button>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const qty = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + qty * fish.price;
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <hr />
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total :<strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}
export default Order;
