import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };

  // when a render() gets a bit too long but
  // doesn't make sense to make another component as it won't
  // get reused just make another render function
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';

    // Make sure the fish is loaded before we continue (due to localstorage)
    if (!fish) return null;
    
    // fish.name for sold out and 'fish' when the fish actually gets
    // completely removed from the inventory/'DB' so we don't have its name
    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>x</button>
      </li>
    );
  };

  render() {
    const orderIDs = Object.keys(this.props.order);
    const total = orderIDs.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      // in case status changes during order they should not
      // be charged
      const isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * fish.price);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIDs.map(this.renderOrder)}
        </ul>
          <div className="total">
          Total: <strong>{formatPrice(total)}</strong>
          </div>
      </div>
    )
  }
}

export default Order;