// send HTTP request

import http from './http-common';

const create = data => {
  return http.post('/product', data);
};

const getByName = name => {
  return http.get(`/product/${name}`);
};

const getAll = () => {
  return http.get('/product');
};

const update = (id, data) => {
  return http.put(`/product/${id}`, data);
};

const remove = id => {
  return http.delete(`/product/${id}`);
};

const removeAll = () => {
  return http.delete(`/product`);
};

const UserService = {
  create,
  getByName,
  getAll,
  update,
  remove,
  removeAll,
};

export default UserService;
