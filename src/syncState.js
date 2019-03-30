import qs from "query-string";

export default function getSyncFns(dataName) {
  return {
    syncToState: syncToState(dataName),
    syncToUrl: syncToUrl(dataName)
  };
}

function inject(cb) {
  return function(target, name, descriptor) {
    var originFn = descriptor.value;
    descriptor.value = function(...rest) {
      return cb.apply(this, [originFn, ...rest]);
    };
    return descriptor;
  };
}

function syncToState(dataName) {
  return inject(function(originFn, ...rest) {
    const query = qs.parse(window.location.search);
    const retData = originFn.apply(this, rest);
    Object.assign(retData[dataName], query);
    return retData;
  });
}

function syncToUrl(dataName) {
  return inject(function(originFn, ...rest) {
    const query = qs.parse(window.location.search);
    Object.keys(this[dataName]).forEach(key => {
      if (this[dataName][key] !== undefined) query[key] = this[dataName][key];
    });
    const ret = originFn.apply(this, arguments);
    window.history.pushState({}, "", `?${qs.stringify(query)}`);
    return ret;
  });
}
