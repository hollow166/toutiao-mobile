//本地存储封装

export const getItem = name=>{
    const data = window.localStorage.getItem(name)
    try{
        return JSON.parse(data)
    }catch{
        //如果不是Json字符串则原样返回
        return data
    }
}


export const setItem = (name,value)=>{
    if(typeof(value) === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name,value)
}

export const removeItem = name=>{
    window.localStorage.removeItem(name)
}