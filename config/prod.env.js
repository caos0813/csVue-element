'use strict'
module.exports = {
  NODE_ENV:process.env.NODE_ENV?`"${process.env.NODE_ENV}"`:'"development"',
  CORS: JSON.stringify(process.env.CORS)
}
