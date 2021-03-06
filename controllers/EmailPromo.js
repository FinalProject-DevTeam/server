const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
sendEmail: function(req, res){
  console.log(req.body)
  const msg = {
    to:req.body.receiver,
    from: req.body.owneremail,
    subject:req.body.subject,
    text: 'text',
    html:req.body.content
    };

  sgMail.sendMultiple(msg)
  .then(function(data){
    console.log('mail send successfully')
    res
      .status(200)
      .json(data)

  })
  .catch(function(err){
     console.error(err.toString());

    res
      .status(500)
      .json(err)
  })
}
}
