const Nexmo = require('nexmo')
const nexmo = new Nexmo({apiKey: process.env.NEXMO_API_KEY, apiSecret: process.env.NEXMO_API_SECRET})

module.exports = {
  SendSms: function(req, res) {
    console.log(req.body.AllNumber)
    let allresponse = []
    const from = 6281366666666 //req.body.sender
    const text = req.body.content
    let AllNumber = req.body.AllNumber   // receiver number (array)

    for (let i = 0; i < AllNumber.length; i++) {
      nexmo.message.sendSms(from, AllNumber[i], text, (error, response) => {
      if (response.messages[0].status != '0') {
            console.log('if2',response)
          if (i == AllNumber.length - 1) {
            res
              .status(200)
              .json({response})
          }
        } else {
          allresponse.push(response)
          console.log('sucess',response)
          if (i == AllNumber.length - 1) {
            res
              .status(200)
              .json({data: allresponse})
          }
        }
      });
    }
  }

}
