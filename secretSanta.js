let nodemailer = require('nodemailer');

/*list the people participating in the secret santa with 
each object containing the persons name and email*/
let people = [
    {"name": "sample", "email": "sample@sample.net"},
];

/*sets up email client to send emails to each "Santa"
@service the email service being used by the sender
@auth authorizes use of email by sender
@user the email of the sender
@pass the password of the email of the sender
*/
let emailClient = nodemailer.createTransport({
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
let santas = shuffleArray(people);
let recipients = shuffleArray(people);

/*ensures nobody in the "secret santa" get paired with 
themselves by adjusting the list of recipients if they are paired
with themselves as a santa
*/
for(var i = 0; i < santas.length; i++)
{
   if (santas[i] == recipients[i]) 
   {
       let left = i-1;
       if(left<0)
       {
           left = left + santas.length;
       }
       let a = recipients[i];
       let b = recipients[left];
       recipients[i] = b;
       recipients[left] = a;    
   }
}
//for each pairing, it will send the email
for(var i = 0; i< santas.length; i++)
{
    sendEmail(santas[i],recipients[i]);
}

//shuffles an array
function shuffleArray(oldlist)
{
    list = clone(oldlist);
    newList = []
    items = list.length;
    for(let i = 0; i<items; i++)
    {
        let spot = Math.floor(Math.random()*list.length);
        newList.push(list[spot]);
        list.splice(spot,1);
    }
    return(newList);
}
//clones an array
function clone(list)
{
    let newlist = []
    for(let i = 0; i<list.length; i++)
    {
        newlist.push(list[i]);
    }
    return(newlist);

}
//sends an email to each secret santa of who they will be getting a gift for
function sendEmail(santa,giftee)
{
    let email = {
        from: "sample email",
        to:santa["email"],
        subject: "Secret Santa",
        text: `Hello ${santa["name"]}, you have recieved ${giftee["name"]} for your secret santa`
    };
    console.log(`now sending email to ${santa["name"]}`);
    emailClient.sendMail(email);
    console.log(`email sent`);
}
