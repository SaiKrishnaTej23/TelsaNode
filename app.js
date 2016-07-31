var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
}); 
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
var modelUri = "https://api.projectoxford.ai/luis/v1/application?id=f09baa6b-b10d-422d-8968-756aa3c49db2&subscription-key=3d50a8b9b7f34ca09de068a1f27f1484";
var recognizer = new builder.LuisRecognizer(modelUri);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

dialog.matches('BookACab', [
    function (session, args, next) {
        // Resolve and store any entities passed from LUIS.
        ///var title = builder.EntityRecognizer.findEntity(args.entities, 'fromlocation');
            builder.Prompts.text(session, 'So you want to travel from '+ args.entities[0].entity + '?');

    }
]);

dialog.matches('Greet', [
    function (session, args, next) {
        // Resolve entities passed from LUIS.
        session.send('Hi there! i am tesla ');
    }
]);

dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand."));