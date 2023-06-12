'use strict';

import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'age': Number,
});

const people = dynamoose.model('people', schema);

export const handler = async(event) => {
  const response = {
    statusCode: null,
    body: null,
  };

  try {
    let results;

    let paramId = event.pathParameters.id;
    console.log(paramId);

    results = await people.delete({id: paramId});
    console.log(results);

    response.body = JSON.stringify({message:'Record Deleted Successfully', results});
    response.statusCode = 200;

  }catch (e){
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }



  // // original response
  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify('Hello from Lambda!'),
  // };
  return response;
};
