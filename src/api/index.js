import axios from 'axios'
let base = '';

export const reqLogin = params => {
  return axios
    .post(`${base}/login`, params)
    .then(res => res.data)
}

export const getStudentList = () => {
  return axios.get(`${base}/student/list`);
}

export const getStudentListPage = params => {
  return axios.get(`${base}/student/listpage`, {params: params});
}

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

export const addHomework = params => {
  return axios.get(`${base}/homework/add`, {params: params});
}

export const getNoticeList = () => {
  return axios.get(`${base}/notice/list`);
}

export const getNoticeListPage = params => {
  return axios.get(`${base}/notice/listpage`, {params: params});
}

export const editNotice = params => {
  return axios.get(`${base}/notice/edit`, {params: params});
}

export const removeNotice = params => {
  return axios.get(`${base}/notice/remove`, {params: params});
}

export const addNotice = params => {
  return axios.get(`${base}/notice/add`, {params: params});
}