import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  myInput = React.createRef();
  static propTypes = {
    history: PropTypes.object
  };
  
  // ES6 for binding
  // constructor() {
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }

  // instead of constructor we declare a prop
  // set to an arrow function. Prop is bound to instance
  goToStore = (e) => {
    // 1. stop form from submitting
    e.preventDefault();
    // 2. get text from input
    const storeName = this.myInput.current.value;
    // 3. change url with the input
    this.props.history.push(`/store/${storeName}`);
  }

  render() {
    // using parantheses - with a space after!!! -
    // after return so that we can hit
    // enter after return. Otherwise JS would just put
    // a ; at the end of return and break everything
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;