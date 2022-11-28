const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
    async get(ID,TableName){
        const params = {
            TableName,
            Key :{
                ID
            }
        }
        const data = await documentClient
        .get(params)
        .promise()

        if(!data || !data.Item){
            throw Error(`There was an error fetching the data for ID for ${ID} from ${TableName}`)
        }
        return data.Item
    },
        async write(data,TableName){
            if(!data.ID){
                throw Error('no ID in the data')
            }

            const params = {
                TableName,
                Item:data
            }

            const res = await documentClient
            .put(params)
            .promise()

            if(!res){
                throw Error(`There was a error adding data for the ID ${data.ID} in table ${TableName}`)
            }
            return data
        }}

module.exports = Dynamo
