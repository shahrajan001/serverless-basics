const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName

const handler = async (event) => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'Missing the ID from the path' })
    }

    let ID = event.pathParameters.ID
    const user = JSON.parse(event.body);
    console.log("user1",user)
    
    user.ID = ID
    console.log("user2",user)

    const newUser = await Dynamo.write(user, tableName).catch((error) => {
        console.log("Unable to write data in DynamoDB", error)
        return null
    })

    // const user = await Dynamo.get(ID, tableName).catch((error) => {
    //     console.log("Unable to fetch data from DynamoDB", error)
    //     return null
    // })

    if (!newUser) {
        return Responses._400({ message: `Failed to write the user ${ID} in dynamoDB` })
    }

    return Responses._200({ user })
}

module.exports = { handler }