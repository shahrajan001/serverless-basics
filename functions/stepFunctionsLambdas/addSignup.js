const Dynamo = require('./../common/Dynamo')
const { v4: uuidv4 } = require('uuid')

const tableName = process.env.signupTableName

exports.handler = async (event) => {
    console.log(event);

    const email = event.Input.signup.email
    const ID = uuidv4()

    await Dynamo.write({ email, ID, worked: false }, tableName)
    return { ID }
}