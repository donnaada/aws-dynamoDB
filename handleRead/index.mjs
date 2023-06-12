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

    if (event.resource === '/people/{id}'){
      let paramId = event.pathParameters.id;
      results = await people.get(paramId);
      response.body = JSON.stringify(results);
    } else {
      results = await people.scan().exec();
      response.body = results;
    }


    response.statusCode = 200;

  }catch (e){
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
