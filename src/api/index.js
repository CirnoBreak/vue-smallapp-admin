import axios from 'axios'
let base = '';

export const reqLogin = params => {
  return axios
    .post(`${base}/login`, params)
    .then(res => res.data)
}

export const getUserList = () => {
  return axios.get(`${base}/user/list`);
}

export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, {params: params});
}

export const removeUser = params => {
  return axios.get(`${base}/user/remove`, {params: params});
}

export const batchRemoveUser = params => {
  return axios.get(`${base}/user/batchremove`, {params: params});
}

export const editUser = params => {
  return axios.get(`${base}/user/edit`, {params: params});
}

export const addUser = params => {
  return axios.get(`${base}/user/add`, {params: params});
};

export const getHomeworkList = () => {
  return axios.get(`${base}/homework/list`);
}

export const getHomeworkListPage = params => {
  return axios.get(`${base}/homework/listpage`, {params: params});
}

export const editHomework = params => {
  return axios.get(`${base}/homework/edit`, {params: params});
}

export const removeHomework = params => {
  return axios.get(`${base}/homework/remove`, {params: params});
}