/*用export把方法暴露出来*/
/*设置cookie*/
export function setCookie(c_name,value) {

  document.cookie=c_name+ "="+escape(value)

}

/*获取cookie*/
export function getCookie(c_name){
  if (document.cookie.length>0){
      let c_start=document.cookie.indexOf(c_name + "=")
      if (c_start!=-1){ 
          c_start=c_start + c_name.length+1 
          let c_end=document.cookie.indexOf(";",c_start)
          if (c_end==-1) c_end=document.cookie.length
              return unescape(document.cookie.substring(c_start,c_end))
          } 
      }
  return ""
}
// export function getCookie(name){
//   let arr,
//   reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")
//   if (arr=document.cookie.match(reg)){
//     return decodeURIComponent(arr[2])
//   }
// }

/*删除cookie*/
export function delCookie(c_name){
  setCookie(c_name, "")
}
