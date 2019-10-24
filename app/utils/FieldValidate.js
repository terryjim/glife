export default class FieldValidate {
    static required = value => (value || typeof value === 'number' ? false : true)
    static email = value => (value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? true:false)
    static maxLength = max => value =>
      value && value.length <= max ? true:false
    static minLength = min => value =>
      value && value.length >= min ? true:false
    static minLength6 = FieldValidate.minLength(6)
    static mobile = value => (value && /^((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8})$/i.test(value)
      ? true:false)
    //固定电话  
    static telephone = value => (value && /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/i.test(value)
      ? true:false)
    //手机+固定电话
    static phone = value => (value && /^(((0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)|((13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])+\d{8}))$/i.test(value)
      ? true:false)
    //房号格式 1-1-1
    static room = value => (value && /^\w+\-\w+\-\w+$/i.test(value)
      ? true:false)
    //多间房号格式 1-1-1,1-1-2,2-1-1
    static rooms = value => (value && /^\w+\-\w+\-\w+(,\w+\-\w+\-\w+)*$/i.test(value)
      ? true:false)
        //门禁卡格式8位16进制
    static card = value => (value && /^([0-9a-fA-F]){8}$/i.test(value)
    ? true:false)
  }