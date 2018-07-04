import React, { Component } from 'react';
import axios from 'axios';

class Historical extends Component {
  constructor() {
    super();
    this.state = {
      addr: '',
      name: '',
      placetype: '',
      errors: {},
      result: []
    };
  }

  componentWillMount() {
    axios
      .get('/historical')
      .then(result => {
        this.setState({ result: result.data });
      })
      .catch(error => {
        console.log('Error get historical: ', error);
      });
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Historical Searches</h1>
          <p>Previous search results</p>
        </div>
        <div className="row container-fluid">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
              {this.state.result.map(result => {
                return (
                  <tr key={result.name}>
                    <td>{result.name}</td>
                    <td>{result.address}</td>
                    <td>
                      <img src={result.photo_reference} width="100px" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Historical;
