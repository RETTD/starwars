import axios from "axios";

export var swapiModule = (function() {
  var rootURL = "https://swapi.dev/api/";

  function request(url, cb) {
    return axios.get(url)
      .then(res => {
        return   res.data
      })
      .then(data => {
        if (typeof cb === "function") {
          cb(data)
        }
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getResources(cb) {
    return request(rootURL, cb);
  }


  function pluralRequestGenerator(path) {
    return function() {

      let queryObject = undefined;
      let cb = undefined;

      if (arguments.length > 1) {
        queryObject = arguments[0];
        cb = arguments[1];
      } else if (arguments[0]) {
        // If given exactly one argument
        if (typeof arguments[0] === "function") {
          cb = arguments[0];
          queryObject = null;
        } else {
          cb = null;
          queryObject = arguments[0];
        }
      }

      if (queryObject) {
        let searchParams = new URLSearchParams();
        for (let key of Object.keys(queryObject)) {
          let value = queryObject[key];
          searchParams.append(key, value);
        }
        return request(rootURL + path + "/?" + searchParams.toString(), cb);
      }

      return request(rootURL + path + "/", cb)

    };
  }

  return {
    getResources: getResources,
    getPeople: pluralRequestGenerator("people"),
  };
})();