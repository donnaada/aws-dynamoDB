'use strict';

import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
  'id': String,
  'name': String,
  'age': Number,
});

const people = dynamoose.model('people', schema);

export const handler = async (event) => {
  const response = {
    statusCode: null,
    body: null,
  };

  try {
    let paramId = event.pathParameters.id;
    let name = JSON.parse(event.body).name;
    let age = JSON.parse(event.body).age;

    console.log(paramId, name, age);

    let result;

    if (name) {
      result = await people.update({'id': paramId}, {'name':name});

    }

    if (age) {
      result = await people.update({'id': paramId}, {'age':age});
    }


    console.log(result);

    response.body = JSON.stringify({ message:'Record Updated Successfully', result });
    response.statusCode = 200;

  } catch (e) {
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }

  return response;
};
