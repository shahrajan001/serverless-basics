const Responses = require('../common/API_Responses')
const AWS = require('aws-sdk')

const SES = new AWS.SES
const handler = async (event) => {
    console.log(event);

    const {to,from,subject,content} = JSON.parse(event.body)
    
    if(!to || !from || !subject || !content){
        return Responses._400({message:' to, from, subject & text are all required in the body'})    
    }
    
    const params = {
        Destination:{
            ToAddresses: [to]
        },
        Message:{
            Body:{
                Text: {Data: content}
            },
            Subject: { Data: subject}
        },
        Source: from  
    }

    try{
        await SES.sendEmail(params).promise()
        return Responses._200({})
    }catch(e){
        console.log('error sending email',e)
        return Responses._400({message:' There was a error sending email.'})  
    }
    

}

module.exports = { handler }