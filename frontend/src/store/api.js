import axios from 'axios'
import qs from 'qs'

export default {
  get({
    url,
    args = {}
  } = {}, {
    callback = (resolve, data) => {
      resolve(data)
    },
    errback = (reject, error) => {
      reject(error)
    }
  } = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, args)
        .then(response => {
          callback(resolve, response.data)
        })
        .catch(error => {
          errback(reject, error)
        })
    })
  },
  post({
    url,
    args = {}
  }, {
    callback = (resolve, data) => {
      resolve(data)
    },
    errback = (reject, error) => {
      reject(error)
    }
  } = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(args))
        .then(response => {
          callback(resolve, response.data)
        })
        .catch(error => {
          errback(reject, error)
        })
    })
  },
  delete({
    url,
    args = {}
  }, {
    callback = (resolve, data) => {
      resolve(data)
    },
    errback = (reject, error) => {
      reject(error)
    }
  } = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, args)
        .then(response => {
          callback(resolve, response.data)
        })
        .catch(error => {
          errback(reject, error)
        })
    })
  }
}
