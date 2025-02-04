import request from './request';

/**
 * Simple RESTful resource class
 */
class Resource {
  constructor(uri, baseUrl = '', gateWay = null, version = null) {
    this.uri = uri;
    this.additonalUri = '';
    this.BaseUrl = baseUrl;
    this.gateway = gateWay;
    this.version = version;
  }

  /**
   * void set additional url
   * @param {string} url - path url.
   */
  setAdditionUri(url = '') {
    this.additonalUri = url;
  }

  /**
   * void set base url
   * @param {string} url - path url.
   */
  setBaseUrl(url = '') {
    this.BaseUrl = url;
  }

  /**
   * void set path gateway
   * @param {string} path - gateway path.
   */
  setGateway(path = '') {
    this.gateway = path;
  }

  /**
   * void set version
   * @param {string} path - gateway path.
   */
  setVersion(version = null) {
    if (version !== null) {
      this.version = version;
    }
  }

  /**
   * get resource list
   * @param {object} query - object for query param
   */
  list(query) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        this.additonalUri,
      method: 'get',
      baseURL: this.BaseUrl,
      params: query,
    });
  }

  /**
   * get detail resource
   * @param {string|number} id - path variable
   * @param {object} query - object for query param
   */
  get(id, query = null) {

    const url =     '/' +
    (this.gateway === null ? '' : this.gateway + '/') +
    (this.version === null ? '' : this.version + '/') +
    this.uri +
    this.additonalUri +
    (id ? '/' + id : '')
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        this.additonalUri +
        (id ? '/' + id : ''),
      params: query,
      baseURL: this.BaseUrl,
      method: 'get',
    });
  }

  /**
   * post data
   * @param {object} resource - data to post
   */
  create(resource) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        this.additonalUri,
      method: 'post',
      baseURL: this.BaseUrl,
      data: resource,
    });
  }

  /**
   * update data
   * @param {string|number} id - path variable
   * @param {object} resource - data to update
   * @param {object} query - object for query param
   */
  update(id, resource, query = null) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        this.additonalUri +
        '/' +
        id,
      method: 'put',
      baseURL: this.BaseUrl,
      params: query,
      data: resource,
    });
  }

  /**
   * patch data
   * @param {string|number} id - path variable
   * @param {object} resource - data to update
   * @param {object} query - object for query param
   */
  patch(id, resource, query = null) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        this.additonalUri +
        '/' +
        id,
      method: 'patch',
      baseURL: this.BaseUrl,
      params: query,
      data: resource,
    });
  }

  /**
   * delete data
   * @param {string|number} id - path variable
   * @param {object} query - object for query param
   */
  destroy(id, query = null) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        '/' +
        id,
      method: 'delete',
      baseURL: this.BaseUrl,
      params: query,
    });
  }

  stream(callbackDownload = () => {}) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri,
      method: 'post',
      baseURL: this.BaseUrl,
      onDownloadProgress: callbackDownload,
    });
  }

  upload(query, payload) {
    const filePromise = new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = async () => {
        try {
          const response = await request({
            url:
              '/' +
              (this.gateway === null ? '' : this.gateway + '/') +
              (this.version === null ? '' : this.version + '/') +
              this.uri +
              this.additonalUri,
            method: 'post',
            baseURL: this.BaseUrl,
            data: {
              data: fr.result,
              name: payload.name,
              type: payload.type,
            },
            params: query,
          });
          resolve(response);
        } catch (err) {
          reject(err);
        }
      };
      fr.onerror = (error) => {
        reject(error);
      };
      fr.readAsText(payload);
    });
    return filePromise;
  }

  download(payload) {
    return request({
      url:
        '/' +
        (this.gateway === null ? '' : this.gateway + '/') +
        (this.version === null ? '' : this.version + '/') +
        this.uri +
        this.additonalUri,
      method: 'post',
      baseURL: this.BaseUrl,
      data: payload,
      responseType: 'blob',
    });
  }

  mockHttpRequest(response, timeout, isRejected) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          if (isRejected) {
            reject(response);
          } else {
            resolve(response);
          }
        },
        timeout ? timeout : 1000
      );
    });
  }
}

export default Resource;
