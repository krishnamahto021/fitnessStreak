const nodemailer = require('../config/nodemailer');

module.exports.signUp = function(user){
    console.log(`inside new sign up mailer ${user}`);
    let htmlString = nodemailer.renderTemplate({user:user},'/sign_up/sign_up_mailer.ejs');

    nodemailer.transporter.sendMail({
        from:'mahtok422@gmail.com',
        to:user.email,
        subject:'One step ahead in Life!!',
        html:htmlString
    },function(err,info){
        if(err){
            console.log(`err in sending mail ${err}`);
        }
        console.log('message sent',info);
    }  
    
    )
}