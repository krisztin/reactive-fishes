## About <!-- omit in toc -->

Building a React.js app from start to finish. Working with create-react-app, react Components, JSX, maintaining state, communication between components, real time web socket data with Firebase, React Router 4 and much more.

## TBD <!-- omit in toc -->

* Authentication
* Animations
* CI set up?
* Automatic deploy to netlify

# Notes <!-- omit in toc -->

## Table of contents <!-- omit in toc -->
- [Random notes](#random-notes)
  - [helper functions](#helper-functions)
- [Components / Classes](#components--classes)
  - [Rendering a component](#rendering-a-component)
  - [Components in their own folder](#components-in-their-own-folder)
- [JSX](#jsx)
- [CSS in React, the schools](#css-in-react-the-schools)
- [Passing data into component with props](#passing-data-into-component-with-props)
- [stateless functional components](#stateless-functional-components)
- [Routing with React router](#routing-with-react-router)
- [events, refs and this binding](#events-refs-and-this-binding)
  - [refs](#refs)
  - [binding](#binding)
  - [Events](#events)
- [State](#state)
  - [Updating state](#updating-state)
  - [Loading data into state](#loading-data-into-state)
  - [Displaying state with JSX](#displaying-state-with-jsx)

## Random notes

* No need to import specific parts of React i.e. `import { Component } from 'react'` just go with the whole thing `import React from 'react'`

* `<input>` cannot pass `value` in there. It has to be `defaultValue={}`

Example using a helper function
```js
import { helperFunction1 } from 'functionlocation';

<input defaultValue={helperFunction1()} />

```

### helper functions

Little functions that don't need to be a component can be added in a `helpers.js` file

## Components / Classes

Every component is its own class.

Name classes Capitalised i.e. `StorePicker`

Every class needs at least one method inside (`render`)

### Rendering a component

Single component rendered to the page.

`index.js`
```js
import React from 'react';
import { render } from 'react-dom';

class StorePicker extends React.Component {
  render() {
    return (
      <h1>Your html goes here</h1>
    );
  }
}

render(<StorePicker />, document.querySelector('.whereDoYouWantIt'))
```

### Components in their own folder

When you have multiple components they should be placed in a `component` folder.

`StorePicker.js`
```js
import React from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <h1>Your html goes here</h1>
    );
  }
}

export default StorePicker;
```

`index.js`
```js
import React from 'react';
import { render } from 'react-dom';
import StorePicker from './components/StorePicker';

render(<StorePicker />, document.querySelector('.whereDoYouWantIt'))
```

## JSX

* use className instead of class
* hit space after return and add some () this way the ASI (automatic semicolon insertion) won't fire and add `return;`
* cannot return sibling elements

```js
    return (
      <h1></h1>
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
      </form>
    )
    // This won't work!
```

_Do this instead in React 16.2+_

```js
    return (
      <React.Fragment>
      <h1></h1>
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
      </form>
      </React.Fragment>
    )
    // This should work
```

* Comments are in {}

```js
    return (
      <form className="store-selector">
        { /* This is a JSX comment that also cannot be sibling */}
        <h2>Please Enter A Store</h2>
      </form>
    )
```

## CSS in React, the schools

* Component specific: when you import the css file that's specific to the component

* Regular: when you have a css file already and just link it as usual in the `<head>`

* Stick it in: simply import the complete css file in `index.js`


## Passing data into component with props

`<ComponentName propname="string" propname={56}>`

Anything other than a string needs to be wrapped in {}

Then you can access it inside the component

`this.props.propname`

## stateless functional components

If a component only has a render() method convert it into a stateless functional component. You will need to pass in the props as an argument.

```js
function ComponentName(props) {
  return (
    // change
    this.props.propname
    // to
    props.propname
  );
}
```

ES6
```js
const ComponentName = (props) => {
  return (
    props.propname
  );
}
```

Implicit return
```js
const ComponentName = (props) => (
  props.propname
);
```

Destructure

```js
const ComponentName = ({ propname }) => (
  change
  props.propname
  to
  propname
);
```

## Routing with React router

Use React Router or Next.js

`router.js`

```js
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Components from '';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomeComponentName} />
      <Route path="/path/:pageIdname" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
```

`index.js`

```js
import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/style.css";

render(<Router />, document.querySelector(".whereItShouldGo"));
```

## events, refs and this binding

```js
// DO NOT DO THIS
// this runs the function when the component mounts
<button onClick={this.handleClick()}></button>
```

```js
handleClick() {
  dostuff
}
<button onClick={this.handleClick}></button>
```

### refs

Ref allows us to reference a DOM node on the page.

_How it aged:_

```js
// deprecated
<input
  type="text"
  ref="myInput"
  />

<input
  type="text"
  ref={(myInput) => this.myInput = myInput}
  />

// current way
myInput = React.createRef();

<input
  type="text"
  ref={this.myInput}
  />

```

### binding

Components that extend the React.Component are not bound by default. This means you cannot reference them in their own methods ("functions" that you call on them i.e. goToStore below)

_Plain ES6_

```js
constructor() {
  super(); // runs component that we are extending first then our component
  this.goToStore = this.goToStore.bind(this);
}
myInput = React.createRef();

goToStore(event) {
  // now you can use as it won't be undefined
  this.myInput
}

```

Instead of a method we declare a property (goToStore) set with an arrow function

```js
myInput = React.createRef();

goToStore = event => {
  // now you can use as it won't be undefined
  this.myInput
}

<form onSubmit={this.goToStore}>

```

### Events

Pushstate allows us to change URL without refreshing the page or losing anything in memory as it re-renders the component only.

`StorePicker.js`

```js
  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. get the text from that input
    const storeName = this.myInput.value.value;
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };
```
We are getting this data from React Router, as `StorePicker.js` is in `Router.js` we can simply go with `this.props.history.push`

## State

State is essentially an object that stores all the data that that component and some of its children may need.

_Initial state_

```js
constructor() {
  super();
  this.state = {
  }
}

// OR go with a property

state = {
// start with [] {} or '' whatever the set state is going to be
}

```

`state` mostly lives in `App.js` you will need to add all methods that change `state` here and then pass it down through the components as data cannot be passed up, only down. You pass down a method with props.

```js
//App level
methodName = (stateObject) => {

}
<Component1 methodName={this.methodName}/>
//Going deeper - this.props as it now lives in the props
<Component2 methodName={this.props.methodName}/>
// It can now be called in the component
this.props.methodName()
```

### Updating state
Can only be done with the update state API. You never want to reach into state and modify it (mutation) directly.

*Take a copy of the existing state* `const name = {...this.state.stateName}`

```js
addFish = fish => {
  // copy state
  const fishes = {...this.state.fishes}
  // add new item with date.now adding a unique ID at the end
  fishes[`fish${Date.now()}`] = fish; // this is the object we passed in from the AddFishForm
  // setstate - overwrites state
  this.setState({
    fishes: fishes // if prop and value are the same it could be just: fishes
  })
}
```

### Loading data into state

Whole `js` file

```js
import sampleFishes from './whereyoustoreit';

loadSampleFished = () => {
  this.setState({ fishes: sampleFishes })
}

```

Adding a single item on to the `order`

```js
addToOrder = key => {
  const order = {...this.state.order};
  order[key] = order[key] + 1 || 1;
  this.setState({ order });
}
```
However this means you'll need access to the `key` which you can do by setting up another prop with the value {key}

`key={key} index{key}`

*Button event*
```js
handleClick = () => {
  this.props.addToOrder(this.props.key);
}
<button onClick={this.handleClick}></button>

// inline if it's just a one off
<button onClick={() => this.props.addToOrder(this.props.key)}></button>

```

### Displaying state with JSX

State is an object that you cannot `map` over so you first have to

1. `{Object.keys(this.state.fishes)}`
2. Now you can `map`

```js

{Object.keys(this.state.fishes).map(key =>
  <p>stuff</p>
 )}

```
To make React react faster it needs unique identifiers for pieces of components that get updated.

```js

{Object.keys(this.state.fishes).map(key =>
  <componentName key={key} />
 )}

```

Passing down data by adding in a prop named whatever (e.g. `details` as below)

```js

{Object.keys(this.state.fishes).map(key =>
  <componentName key={key} details={this.state.fishes[key]}/>
 )}

```

Using state in Components

```js
// props.propName.objectkey
<img src={this.props.details.image} />

// you can E6 destructuring it
const { image, name, other, stuff } = this.props.details

<img src={image} />

```


random
`event.currentTarget.reset()` - to reset a form