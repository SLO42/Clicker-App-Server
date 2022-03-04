
/**
 * error response
 * @typedef {object} Error
 * @property {string} message - error message
 * @property {object} error - the real error object
 */

/**
 * default ping response
 * @typedef {object} PingResponse
 * @property {boolean} success - true
 */

/**
 * request body
 * @typedef {object} RequestBody
 * @property {object} data - any
 */

/**
 * Request Patch Profile
 * @typedef {object} RequestPatchProfile
 * @property {string} name - john doe
 * @property {string} email - johndoe@email.com
 */

/**
 * Request Patch Profile
 * @typedef {object} RequestMigrate
 * @property {string} apiKey - john doe
 */

/**
 * Request Register User
 * @typedef {object} RequestRegisterUser
 * @property {string} name - john doe
 * @property {string} email - johndoe@email.com
 * @property {string} password - password
 */

/**
 * Request Login User
 * @typedef {object} RequestLoginUser
 * @property {string} email - johndoe@email.com
 * @property {string} password - password
 */

/**
 * user profile
 * @typedef {object} Profile
 * @property {string} id - 870239745
 * @property {string} googleId - any
 * @property {string} name - john doe
 * @property {string} email - johndoe@email.com
 * @property {string} permissions - "basic"
 * @property {string} hash - "some cool hash"
 * @property {string} salt - "enough salt to be considered salty"
 * @property {string | null} verificationCode - null
 * @property {string | null} securityCode - null
 * @property {boolean} verified - true
 * @property {boolean} deleted - false
 * @property {string} created_at - Date
 * @property {string} updated_at - Date
 */

export {};