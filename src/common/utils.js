export function dbounce(func,delay=500)
{
  let timer=null
  return ()=>{
  timer&&clearTimeout(timer)
  timer=setTimeout(()=>{func.apply(this),delay}
  )
  
  // console.log('调用了db');
  }
}
