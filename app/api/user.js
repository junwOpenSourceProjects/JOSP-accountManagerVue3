import request from '~/utils/request'

export function getUserPage(params) {
  return request({ url: '/user/page', method: 'get', params })
}

export function getUser(id) {
  return request({ url: `/user/${id}`, method: 'get' })
}

export function createUser(data) {
  return request({ url: '/user', method: 'post', data })
}

export function updateUser(data) {
  return request({ url: '/user', method: 'put', data })
}

export function deleteUser(id) {
  return request({ url: `/user/${id}`, method: 'delete' })
}
