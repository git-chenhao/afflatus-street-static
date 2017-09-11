//获取cookie、
export function getCookie(name) {
  var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? decodeURIComponent(v[2]) : null
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (name, value, days) {
  if (days == 0){
    window.document.cookie = name + '=' + encodeURIComponent(value)+ ';path=/;domain=.afflatusstreet.com'
    return
  }
  var d = new Date
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
  window.document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;domain=.afflatusstreet.com;expires=' + d.toGMTString()
};

//删除cookie
export function delCookie (name) {
  // this.setCookie(name, '', -1)
  window.document.cookie = name + '=;path=/;domain=.afflatusstreet.com;expires=' + -1
};

export function getUrlKey(name){
   return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
  }
