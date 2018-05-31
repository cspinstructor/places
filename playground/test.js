const add = (x,y) => {
  return x + y;
}

//console.log(add(2,3));

var origObj = {
  table : [
    {
      name: 'inti college 1',
      rubbish: 'rubbish 1',
      photo_reference: 111,
    },
    {
      name: 'inti college 2',
      rubbish: 'rubbish 2',
      photo_reference: 222,
    },
    {
      name: 'inti college 3',
      rubbish: 'rubbish 3',
      photo_reference: 333,
    },
  ],
};

var placesObj = {
  table : [],
}

const extractData = (allResults) => {
  //extract name and photo_reference and save to new object
  const length = allResults.table.length;
  for (var i=0; i<length; i++) {
    placesObj.table.push({
      name: allResults.table[i].name,
      photo_reference: allResults.table[i].photo_reference,
    });
  }

  for (var i=0; i<placesObj.table.length; i++) {
    console.log(placesObj.table[i].name);
    console.log(placesObj.table[i].photo_reference);
  }

};

extractData(origObj);
