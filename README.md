## About

Building a React.js app from start to finish. Working with create-react-app, react Components, JSX, maintaining state, communication between components, real time web socket data with Firebase, React Router 4 and much more.

## TBD

* Authentication
* Animations
* CI set up?
* Automatic deploy to netlify

# Notes

No need to import specific parts of React i.e. `import { Component } from 'react'` just go with the whole thing `import React from 'react'`

## Components / Classes

Every component is its own class.

Name classes Capitalised i.e. `StorePicker`

Every class needs at least one method inside (`render`)

### Rendering a component

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

Do this instead in React 16.2+

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

## CSS in React

Component specific: when you import the css file that's specific to the component
Regular: when you have a css file already and just link it as usual in the `<head>`
Stick it in: simply import the complete css file in `index.js`