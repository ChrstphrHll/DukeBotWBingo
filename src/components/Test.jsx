import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.img = props.img
  }

  componentDidMount() {
    console.log("POG!")
  }

  state = {
        
  }

  test1() {
    return <h1>t</h1>
  }
  test2(){
    return <h2>r</h2>
  }
  render() { 
    return ( null );
  }
}
 
export default Test;