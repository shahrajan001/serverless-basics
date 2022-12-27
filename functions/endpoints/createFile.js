const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')

const bucket = process.env.bucketName

const handler = async (event) => {
    console.log(event);
    if (!event.pathParameters || !event.pathParameters.fileName) {
        return Responses._400({ message: 'Missing the fileName from the path' })
    }

    let fileName = event.pathParameters.fileName
    const data = JSON.parse(event.body);

    const newData = await S3.write(data,fileName,bucket).catch((error) => {
        console.log("Unable to upload file in S3", error)
        return null
    })

    if (!newData) {
        return Responses._400({ message: `Failed to write the data by fileName ${fileName}` })
    }

    return Responses._200({ newData })
}

module.exports = { handler }