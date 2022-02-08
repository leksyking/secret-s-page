const CustomAPIError = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorhandlerMiddleware = (err, req, res, next) => {
    //default
    let customError = {
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Something went wrong" || err.message
    }
    if(err.name === "UserExistsError"){
        customError.status = StatusCodes.BAD_REQUEST
        customError.message = err.message
        return res.status(customError.status).send({msg:  customError.message})
    }
   return res.status(customError.status).json({msg: customError.message})
}

module.exports = errorhandlerMiddleware