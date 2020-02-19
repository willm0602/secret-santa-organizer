/**
 * @author William Migdol
 * @date 12/2/2019
 * Program that takes a list of people for a "secret santa",
 * assigns them to a random person that isn't themselves and sends an 
 * email to each participant on who they recieved
 */

const nodemailer = require('nodemailer');

/*list the people participating in the secret santa with 
each object containing the persons name and email*/
const santas = [
    {"name": "a", "email": "SAMPLE@gmail.net"},
    {"name": "b", "email": "SAMPLE@gmail.net"},
    {"name": "c", "email": "SAMPLE@gmail.net"},
    {"name": "d", "email": "SAMPLE@gmail.net.net"},
];

/*sets up email client to send emails to each "Santa"
@service the email service being used by the sender
@auth authorizes use of email by sender
@user the email of the sender
@pass the password of the email of the sender
*/
const emailClient = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'sample@gmail.com',
        pass: 'samplesamplesample'
    }
});
/*makes the two lists of pairings of santas and the gift recipients
with each nth term of a list being a pairing e.g.the first santa is
paired with the first recipient
@santas list of santas
@recipients list of recipients of gifts
*/
shuffleArray(santas)
const recipients = [];
for(var i = 1; i<santas.length;i++)
{
    recipients.push(santas[i]);
}
recipients.push(santas[0]);

//for each pairing, it will send the email
for(var i = 0; i< santas.length; i++)
{
    sendEmail(santas[i],recipients[i]);
}

//shuffles an array
function shuffleArray(oldlist)
{
    for(var i = 0; i<oldlist.length; i++)
    {
        var item = oldlist[i];
        var secondIndex = parseInt(oldlist.length*Math.random());
        var temp = oldlist[secondIndex];
        oldlist[secondIndex] = item;
        oldlist[i] = temp;
    }
}

//sends an email to each secret santa of who they will be getting a gift for
function sendEmail(santa,giftee)
{
    const email = {
        from: "sample email",
        to:santa["email"],
        subject: "Secret Santa",
        text: `Hello ${santa["name"]}, you have recieved ${giftee["name"]} for your secret santa`
    };
    console.log(`now sending email to ${santa["name"]}`);
    emailClient.sendMail(email);
    console.log(`email sent`);
}
