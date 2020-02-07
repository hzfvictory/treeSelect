export const factorial1 = (num) => {
    num = parseInt(num)
    if (num <= 1) {
        return 1
    }
    const result = (num, val) => {
        let curNum = num - 1
        let curVal = val * curNum
        if (curNum > 1) {
            return result(curNum, curVal)
        }
        return curVal
    }
    return result(num, num)
}

export const factorial2 = (num) => {
    let arr = Array.from(Array(num), (key, index) => index + 1);
    let sum = arr.reduce(function (prev, cur) {
        return prev * cur;
    }, 1);
    return sum
}