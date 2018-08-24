const Nexmo = require('nexmo')
const nexmo = new Nexmo({apiKey: process.env.NEXMO_API_KEY, apiSecret: process.env.NEXMO_API_SECRET})

module.exports = {
  SendSms: function(req, res) {
    let allresponse = []
    const from = req.body.sender
    const text = req.body.content
    let AllNumber = [6281384643722] //diganti dengan nomor si receiver array Ya!

    for (let i = 0; i < AllNumber.length; i++) {
      nexmo.message.sendSms(from, AllNumber[i], text, (error, response) => {
        console.log('response', response)
        if (error) {
          res.json(error)
        } else if (response.messages[0].status != '0') {
          if (i == AllNumber.length - 1) {
            res.json({response})
          }
        } else {
          allresponse.push(response)
          if (i == AllNumber.length - 1) {
            res.json({data: allresponse})
          }
        }
      });
    }
  }

}
