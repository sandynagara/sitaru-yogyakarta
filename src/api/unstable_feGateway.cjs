const axios = require('axios');
const gatewayList = require('./gatewayList.cjs');

const TOKEN_NAME_CONSTANT = 'LOKASISSID';

let axiosInstance = axios.create({
  timeout: 55000,
  timeoutErrorMessage: 'Request Time-out',
  validateStatus: (n) => n < 500,
});

function setAuthTokenToResp(token, r) {
  if (token) {
    let splitedLongToken = token.match(/.{1,1000}/g);

    splitedLongToken.forEach((v, i) => {
      r.cookie(TOKEN_NAME_CONSTANT + '_' + i, v, {
        httpOnly: true,
        sameSite: true,
      });
    });
  }
}

function removeAuthorizationCookies(req, res) {
  Object.keys(req.cookies).forEach((v) => {
    if (v.includes(TOKEN_NAME_CONSTANT)) {
      res.cookie(v, '', { maxAge: 0 });
    }
  });
}

async function unstable_fegateway(req, res) {
  const reqPath = req.baseUrl.split('/').slice(3).join('/');
  const method = req.method.toUpperCase();

  const gateway = gatewayList(process.env).find(value=>req.baseUrl.includes(value.gateway) )

  const BASE_PATH = gateway?.baseUrl ?? `${process.env.REACT_APP_BASE_URL}/`;
  
  
  const forgeRequestHeaders = {
    ...(reqPath.startsWith('de/') ? {} : req.headers),
    ...{
      host: (new URL(BASE_PATH)).hostname
    }
  };
  
  let forgeResponse = {};

  console.log(`[${req.method}] : ${BASE_PATH + '/' + reqPath}`);

  try {
    // Check request method
    switch (method) {
      case 'GET':
        forgeResponse = await axiosInstance.get(BASE_PATH + '/' + reqPath, {
          headers: forgeRequestHeaders,
        });
        break;
      case 'POST':
        forgeResponse = await axiosInstance.post(
          BASE_PATH + '/' + reqPath,
          { ...req.body },
          {
            headers: forgeRequestHeaders,
          }
        );
        break;
      case 'PUT':
        forgeResponse = await axiosInstance.put(
          BASE_PATH + '/' + reqPath,
          { ...req.body },
          {
            headers: forgeRequestHeaders,
          }
        );
        break;
      case 'PATCH':
        forgeResponse = await axiosInstance.patch(
          BASE_PATH + '/' + reqPath,
          { ...req.body },
          {
            headers: forgeRequestHeaders,
          }
        );
        break;
      case 'DELETE':
        forgeResponse = await axiosInstance.delete(BASE_PATH + '/' + reqPath, {
          headers: forgeRequestHeaders,
        });
        break;
    }

    // Aditional check for token
    if (reqPath.includes('users/login')) {
      setAuthTokenToResp(forgeResponse?.data?.result?.token, res);
    }
    if (reqPath.includes('users/logout')) {
      removeAuthorizationCookies(req, res);
    }
    if (forgeResponse.status === 401) {
      removeAuthorizationCookies(req, res);
    }

    // Send response to SPA
    res.status(forgeResponse.status).send(forgeResponse.data);
  } catch (error) {
    let typedError = {
      message: 'Internal Server Error',
      name:error?.name,
      ms: BASE_PATH,
    };
    if(error.code === 'ECONNABORTED'){
      typedError.message = 'Request Time-out';
      res.status(408).send(typedError);
    }else{
      res.status(500).send(typedError);
    }
  }
}

module.exports = { unstable_fegateway };
