import React, { Component } from 'react'
import SearchBar from './SearchBar/SearchBar';

class Landing extends Component {
  render() {
    return (
      <div>
       <h1>This is Landing page</h1>
            <SearchBar />
      </div>
    )
  }
}
export default Landing;