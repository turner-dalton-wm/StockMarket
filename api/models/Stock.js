/**
 * Stock.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'integer',
      required: true
    },
    lastDate: {
      type: 'string',
      required: true
    },
    history: {
      type: 'array',
      required: true
    }
  }
};

