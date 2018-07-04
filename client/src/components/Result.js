import React from 'react';

const Result = props => {
  //console.log(props.list.length);

  return (
    <div>
      <ul>
        <th>Name</th>
        {props.list.map(result => {
          return <li>{result.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Result;
