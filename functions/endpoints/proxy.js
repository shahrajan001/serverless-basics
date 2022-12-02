const Responses = require('../common/API_Responses')

const handler = async (event) => {
    console.log(event);

    return Responses._200()
}

module.exports = { handler }