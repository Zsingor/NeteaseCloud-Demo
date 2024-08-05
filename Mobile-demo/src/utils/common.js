//将数字转为带位数字符串
export const changeCount = (num) => {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
    }
}