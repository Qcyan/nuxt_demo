export default function ({$axios,redirect}){
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })
  $axios.onResponse(response => {
    if(response.data.success == false){
      console.log("请求失败");
      return;
    }
    console.log(response);
    return response
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
    if(code != 200){
      console.log(code)
    }
  })

}
