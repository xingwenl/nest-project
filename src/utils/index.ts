



/**
 * @description 判断是否为空对象
 * @param obj 
 */
export function isEmptyObj(obj: any){
    for(let t in obj)
        return false
    return true
}