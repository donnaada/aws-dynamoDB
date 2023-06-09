'use strict';

import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'age': Number,
});

const people = dynamoose.model('people', schema);

export const handler = async(event) => {
  const res = {statusCode: null, body: null};

  try {
    let results = await people.scan().exec();
    console.log('results', results);

    res.body = JSON.stringify(results);
    res.statusCode = 200;
    
  }catch (e){
    res.body = JSON.stringify(e || e.message);
    res.statusCode = 500;
  }


  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };



  // // original response
  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify('Hello from Lambda!'),
  // };
  return response;
};
