// 格式化时间 yyyy-MM-dd HH:mm:ss
const timeFormat = (value, fmt = "yyyy-MM-dd HH:mm:ss", defValue = "--") => {
    if (value) {
        var time = null
        try {
            time = new Date(value) || new Date(value.replace(/-/g, "/")) || new Date(Number(value))
        } catch (ex) {
            return defValue
        }
        if (!time) {
            return defValue
        }

        var year = time.getFullYear()
        var month = time.getMonth() + 1
        if (month < 10) {
            month = "0" + month
        }
        var day = time.getDate()
        if (day < 10) {
            day = "0" + day
        }
        var hour = time.getHours()
        if (hour < 10) {
            hour = "0" + hour
        }
        var minutes = time.getMinutes()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        var seconds = time.getSeconds()
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        var formatTime = fmt.replace(/yyyy/g, year)
                .replace(/MM/g, month)
                .replace(/dd/g, day)
                .replace(/HH/g, hour)
                .replace(/mm/g, minutes)
                .replace(/ss/g, seconds)
        if (formatTime) {
            return formatTime
        }
    }
    return defValue
}
const authFormat =(value) => {
    if (!value) {
        return ""
    }else if (Number(value) === 1) {
        return "管理员"
    }else if(Number(value) === 0) {
        return "普通用户"
    }
}

export default {
    timeFormat,
    authFormat
}