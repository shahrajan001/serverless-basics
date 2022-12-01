const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')

const bucket = process.env.bucketName

const handler = async (event) => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({ message: 'Missing the fileName from the path' })
    }

    let fileName = event.pathParameters.fileName

    const file = await S3.get(fileName, bucket).catch((error) => {
        console.log("Unable to locate file in S3", error)
        return null
    })

    if (!file) {
        return Responses._400({ message: `Failed to find the file ${fileName}` })
    }

    return Responses._200({ file })
}

module.exports = { handler }