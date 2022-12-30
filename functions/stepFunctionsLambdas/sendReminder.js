const AWS = require('aws-sdk')
const SES = new AWS.SES

exports.handler = async (event) => {
    console.log(event);

    const email = event.Input.Payload.email
    const message = `Hi, welcome to the team! It's been 24 hours since you've been invited to out portal but haven't logged in our portal yet. We hope you to start as early as possible.`
    const subject = `Remember to use our platform`

    const params = {
        Destination:{
            ToAddresses: [email]
        },
        Message:{
            Body:{
                Text: {Data: message}
            },
            Subject: { Data: subject}
        },
        Source: 'dev@appgambit.com'  
    }

    try{
        await SES.sendEmail(params).promise()
        return
    }catch(e){
        console.log('error sending email',e)
        throw error
    }
}