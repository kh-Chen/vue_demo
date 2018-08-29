import Qs from 'qs';

let fn = {}
fn.install = function (Vue, options) {
  Vue.prototype.$sendGET = (url,params,fn) => {
    Vue.prototype.$ajax({
      method: 'get',
      url: url,
      params: params//get用这个
    }).then((rep) => {
      fn(rep.data);
    })
  };
  Vue.prototype.$sendPOST = (url,params,fn) => {
    Vue.prototype.$ajax({
      method: 'post',
      url: url,
      data:params,//post用这个
      transformRequest: [data => Qs.stringify(data)],//post配合这个format参数
    }).then((rep) => {
      fn(rep.data);
    })
  };
}
export default fn
