import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

export const post = (url, data = {}) => {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolve, rejest) => {
    instance.post(url, data).then((response) => {
      resolve(response)
    }, err => {
      rejest(err)
    })
  })
}

export const get = (url, params = {}) => {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolve, rejest) => {
    instance.get(url, { params }).then((response) => {
      resolve(response)
    }, err => {
      rejest(err)
    })
  })
}
