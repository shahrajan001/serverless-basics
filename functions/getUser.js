const Responses = require('./API_Responses')

const data = {
    B12445: { name: 'Rajan Shah', age: 21, job: 'Backend Developer' },
    F22311: { name: 'Shah Rajan', age: 21, job: 'Frontend Developer' },
    D21423: { name: 'Shah Rajan Sanjay', age: 22, job: 'Dev ops' }
}

const handler = async (event) => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'Missing the ID from the path' })
    }
    let ID = event.pathParameters.ID

    if (data[ID]) {
        return Responses._200(data[ID])
    }
    return Responses._400({ message: 'No such ID found in data' });
}

module.exports = {handler}