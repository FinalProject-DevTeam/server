const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
sendEmail: function(req, res){
  const msg = {
    to:['handimacbook@gmail.com'],
    from: req.body.owneremail,
    subject:req.body.subject,
    text: 'text',
    html:req.body.content
     };

  sgMail.sendMultiple(msg)
  .then(function(data){
    console.log('mail send successfully')
    res.json(data)

  })
  .catch(function(err){
     console.error(error.toString());
     res.json(err)
  })
}
}
