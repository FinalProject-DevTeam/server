const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
sendEmail: function(req, res){
  const msg = {
    to:['handimacbook@gmail.com'],
    from: 'Hacktiv8 Admission <contact@hacktiv8.com>',
    subject:req.body.subject,
    text: 'text',
    html:req.body.html
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
