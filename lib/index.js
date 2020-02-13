const Task = require('./../task');
const request = require('request');
const {curry} = require('./../utils');
const getUserById = curry((url, id) => new Task((reject, resolve) => {
  request(
    `${url}${id}`, 
    { json: true }, 
    (err, res, body) => (err) ? reject(err) : resolve(body))
}));
module.exports = {getUserById}