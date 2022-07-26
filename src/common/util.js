function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    }
    return fmt
  }
  /**
   * 时间字符串格式化成日期
   * @param {string} str 
   * @param {string} split default '-'
   */
  function stringToDate(str,split='-'){
        if(str){
           var dateArray=[];
           let dateStr=str.trim().split(' ');
           //年-月-日 
           if(dateStr.length>0){
                  let date=dateStr[0].split(split);
                  if(!isNaN(parseInt(date[0]))){
                    dateArray[0]=date.length>0 ?date[0]:0;
                    dateArray[1]=date.length>1 ?parseInt(date[1])-1:2;
                    dateArray[2]=date.length>2 ?date[2]:1;
                 }else{
                   return '';
                 }
           }

           //时-分-秒
           if(dateStr.length>1){
            let time=dateStr[1].split(':');
            dateArray[3]=time.length>0 ?time[0]:0;
            dateArray[4]=time.length>1 ?time[1]:0;
            dateArray[5]=time.length>2 ?time[2]:0;
           }
           let date=new Date(...dateArray);
           if(date=='Invalid Date')
              return '';
           return date;
         }
         return '';
  }
  /**
   * 验证货币
   * @param {*} str 
   */
  function validateNumber(str){
      if(!str) {
        return true;
      }

      if(/^[0-9]*(\.[0-9]{1,4})?$/.test(str)){
        return true;
      }
      return false;
  }
  
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }


  //深度克隆对象
function clone(obj){
    //确定result的类型
    let result;
    if(obj instanceof Array){
        result=[];
    }else if(obj instanceof Object){
        result={};
    }else{
        return obj;
    }
    for(let key in obj){
      let copy=obj[key];
        if(typeof copy==='object'){
            result[key]=clone(copy);
        }else{
            result[key]=obj[key];
        }
    }
    return result;
}

function formatMoney(num) {
  if (!isNaN(num) && num != "") {
      var amount = parseFloat(num).toFixed(2);
      var arr = amount.split('.');
      var reg = /\d{1,3}(?=(\d{3})+$)/g;
      if (parseInt(arr[1]) === 0) {
        return (arr[0] + "").replace(reg, "$&,");
      } else {
       return (arr[0] + "").replace(reg, "$&,") + "." + arr[1];
      }
  } else {
      return "";
  }
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
}

/**
 * 将后台带T的时间变成时间戳
 *
 * @date 格式为createDate: "2020-09-25T14:31:58"
 */
function getDateTime(date) {
  var time = new Date(Date.parse(date.replace(/-/g, "/").replace(/T/g, " ")))
  return time
}

/**
 * 将后台带T的时间替换掉
 *
 * @date 格式为createDate: "2020-09-25T14:31:58"
 */
function replaceT(date) {
  var time = date.replace(/T/g, " ")
  return time
}


  export default{
    formatDate,
    stringToDate,
    validateNumber,
    clone,
    formatMoney,
    extend,
    bind,
	getDateTime,
	replaceT,
  }