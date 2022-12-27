const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.userTableName

const handler = async (event) => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'Missing the ID from the path' })
    }
    let ID = event.pathParameters.ID

    const user = await Dynamo.get(ID, tableName).catch((error) => {
        console.log("Unable to fetch data from DynamoDB", error)
        return null
    })

    if(!user){
        return Responses._400({ message: `Data not from DynamoDB for the user ${ID}` })
    }

    return Responses._200({ user })
}

module.exports = { handler }