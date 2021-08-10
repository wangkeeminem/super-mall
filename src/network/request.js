import axios from 'axios'
export default (config)=>{ 
  const instance1=axios.create({
    baseURL:"http://123.207.32.32:8000",
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result.data
  },err=>{
    console.log(err+'响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}

export const request2=(config)=>{ 
  const instance1=axios.create({
    baseURL:"http://152.136.185.210:7878/api/m5",
    timeout:5000
  })
  // 请求拦截
  instance1.interceptors.request.use(config=>{
    return config
  },err=>{
    console.log(err+'request2请求出错了,请检查您的互联网连接');
  })
  // 响应拦截、转化请求返回数据
  instance1.interceptors.response.use(result=>{
    // console.log('hahahah');
    return result.data
  },err=>{
    console.log(err+'request2响应出错了,请检查您的互联网连接');
  })
  return instance1(config)  
}



