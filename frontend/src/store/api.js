import axios from 'axios'
import qs from 'qs'

function refineUrl(url) {
  if (url.endsWith('//')) {
    return url.slice(0, -1)
  }
  return url
}

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
      axios.get(refineUrl(url), args)
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
      axios.post(refineUrl(url), qs.stringify(args))
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
      axios.delete(refineUrl(url), args)
        .then(response => {
          callback(resolve, response.data)
        })
        .catch(error => {
          errback(reject, error)
        })
    })
  }
}
