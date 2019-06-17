"use strict";

const urls: any = {
  development: {
    apiUrl: "http://localhost:3001/api/v1",
    _apiUrl: "http://localhost:3001/api/v1"
  },
  production: {
    apiUrl: "https://work-info-api.herokuapp.com/api/v1",
    _apiUrl: "http://localhost:3001/api/v1"
  }
};

export default urls[process.env.NODE_ENV || "development"];
