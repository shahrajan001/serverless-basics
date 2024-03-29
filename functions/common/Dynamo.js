const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        }
        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID for ${ID} from ${TableName}`)
        }
        return data.Item
    },
    async write(data, TableName) {
        if (!data.ID) {
            throw Error('no ID in the data')
        }

        const params = {
            TableName,
            Item: data
        }

        const res = await documentClient
            .put(params)
            .promise()

        if (!res) {
            throw Error(`There was a error adding data for the ID ${data.ID} in table ${TableName}`)
        }
        return data
    },
    async update(TableName, primaryKey, primaryKeyValue, updateKey, updateValue) {

        const params = {
            TableName,
            Key: { [primaryKey]: primaryKeyValue },
            UpdateExpression: `set ${updateKey} = :updateValue`,
            ExpressionAttributeValues: {
                ':updateValue': updateValue
            }
        }
        return documentClient.update(params).promise()
    },
    async query(TableName, IndexName, queryKey, queryValue) {

        const params = {
            TableName,
            IndexName,
            KeyConditionExpression: `${queryKey} = :hkey`,
            ExpressionAttributeValues: {
                ':hkey': queryValue
            }
        }
        console.log("params",params)
        const res = await documentClient.query(params).promise()
        console.log("res",res)
        return res.Items || []
    }
}

module.exports = Dynamo
