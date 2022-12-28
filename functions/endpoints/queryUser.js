const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.userTableName

const handler = async (event) => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.position) {
        return Responses._400({ message: 'Missing the position from the path' })
    }
    let position = event.pathParameters.position

    const user = await Dynamo.query(tableName, 'position-code','positions',position).catch((error) => {
        console.log("Unable to fetch data from DynamoDB", error)
        return null
    })

    if(!user){
        return Responses._400({ message: `Data not from DynamoDB for the position code ${position}` })
    }

    return Responses._200({ user })
}

module.exports = { handler }