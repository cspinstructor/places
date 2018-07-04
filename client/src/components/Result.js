import React from 'react';
const Result = props => {
  //console.log(props.list.length);

  return (
    <div className="row container-fluid">
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>Name</th>
          </tr>
          {props.list.map(result => {
            return (
              <tr key={result.name}>
                <td>{result.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
