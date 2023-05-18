const queue = require('../config/kue');
const signupMailer = require('../mailers/sign_up_mailer');

queue.process('emails',function(job,done){
    signupMailer.signUp(job.data);
    done();
})
