/** @type {import('jest').Config} */
const config = {
    collectCoverageFrom: [
        'utils/*.{js,jsx}',
        '!utils/errorHandler.js'
    ],
};
  
module.exports = config;