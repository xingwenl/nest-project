import {createHash} from 'crypto'

/**
 * @param {string} algorithm
 * @param {any} content
 *  @return {string}
 */
export const encrypt = (algorithm, content) => {
    let hash = createHash(algorithm)
    hash.update(content)
    return hash.digest('hex')
}

/**
 * @param {any} content
 *  @return {string}
 */
export const sha1 = (content) => encrypt('sha1', content)

/**
 * @param {any} content
 *  @return {string}
 */
export const md5 = (content) => encrypt('md5', content)

export default encrypt