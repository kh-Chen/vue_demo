import iViewModalDel from '../components/iView-modal-del'
import iViewUploadImg from '../components/iView-upload-img';

let component = {}
component.install = function (Vue, options) {
  Vue.component('iview-modal-del', iViewModalDel);
  Vue.component('i-view-upload-img', iViewUploadImg);
}
export default component
