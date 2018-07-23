import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from './Inventory';
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  // lifecycle method event app loaded into the page
  componentDidMount() {
    const { params } = this.props.match;
    // reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  componentDidUpdate(){
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  addFish = (fish) => {
    // Take copy of exisiting state
    const fishes = {...this.state.fishes};
    // Add the new fish to fishes
    // date now adds a unique num at the end (current millisecond)
    fishes[`fish${Date.now()}`] = fish;
    // Set new fishes obj to state
    this.setState({
      // as both the same it could just be fishes on one line
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = key => {
    const fishes = {...this.state.fishes};
    // because of firebase it needs to be updated to null
    fishes[key] = null;
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})
  };

  addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  removeFromOrder = key => {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="Fresh Seasfood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
              key={key}
              // cannot access the key so need to introduce another prop with key
              index={key}
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder}
              />
              ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          // or because these are all from state you can just spread
          // {...this.state}
          // but don't do this because you can add stuff to state in future
          // and they might be useless here
          removeFromOrder={this.removeFromOrder}
          />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
      )
    }
  }

export default App;