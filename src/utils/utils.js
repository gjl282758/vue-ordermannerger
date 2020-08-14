//工具js文件

function getnum(num){
    return num<10? "0"+ num: num;
}

// 获取中国时区时间
// 传入UTC字符串时间
export let getChinatime = (utctime) => {

    let date = (typeof utctime=="string"? new Date(utctime):utctime)

    // if(typeof utctime=="string")
    //  date = new Date(utctime)
    // else 
    //  date = utctime

    return date.getFullYear() + '-' + getnum((date.getMonth() + 1)) + '-' + getnum(date.getDate()) + ' ' + getnum(date.getHours()) + ":" + getnum(date.getMinutes()) + ":" + getnum(date.getSeconds())
}

