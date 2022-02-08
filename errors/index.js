const CustomAPIError = require('./custom')
const BadRequestError = require('./badrequest')
const NotFoundError = require('./notFound')
const UnAuthorizedError = require('./unathorized')

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
    UnAuthorizedError
}