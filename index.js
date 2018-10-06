/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const data = [
    'You are a most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality.',
    'Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!',
    'Come, come, you froward and unable worm!',
    'I am sick when I do look on thee.',
    'I’ll beat thee, but I would infect my hands.',
    'If thou wilt needs marry, marry a fool; for wise men know well enough what monsters you make of them.',
    'Methink’st thou art a general offence and every man should beat thee.',
];

/**
 * 'You are a most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality.'
 * All’s Well That Ends Well (Act 3, Scene 6)
 *
 * 'Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!',
 * Henry IV Part I (Act 2, Scene 4)
 *
 * “Come, come, you froward and unable worms!”
 * The Taming Of The Shrew (Act 5, Scene 2)
 *
 * “I am sick when I do look on thee “
 * A Midsummer Night’s Dream (Act 2, Scene 1)
 *
 *  “I’ll beat thee, but I would infect my hands.”
 * Timon of Athens (Act 4, Scene 3)
 *
 * “If thou wilt needs marry, marry a fool; for wise men know well enough what monsters you make of them.”
 * Hamlet (Act 3, Scene 1)
 *
 *“Methink’st thou art a general offence and every man should beat thee.”
 * All’s Well That Ends Well (Act 2, Scene 3)
 */


const InsultMeHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
            || (request.type === 'IntentRequest'
                && request.intent.name === 'InsultMeIntent');
    },
    handle(handlerInput) {
        const insultArr = data;
        const insultIndex = Math.floor(Math.random() * insultArr.length);
        const randomFact = insultArr[insultIndex];
        const speechOutput = randomFact;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, randomFact)
            .getResponse();
    },
};

const InsultOtherPersonHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return (request.type === 'IntentRequest'
            && request.intent.name === 'InsultOtherPersonIntent');
    },
    handle(handlerInput) {
        const insulteeName = handlerInput.requestEnvelope.request.intent.slots.insulteeName.value;
        const insultArr = data;
        const insultIndex = Math.floor(Math.random() * insultArr.length);
        const randomFact = insultArr[insultIndex];
        const speechOutput = insulteeName + ', ' + randomFact;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, randomFact)
            .getResponse();
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(HELP_MESSAGE)
            .reprompt(HELP_REPROMPT)
            .getResponse();
    },
};

const ExitHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.CancelIntent'
                || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(STOP_MESSAGE)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, an error occurred.')
            .reprompt('Sorry, an error occurred.')
            .getResponse();
    },
};

const SKILL_NAME = 'Will Thou Insult Me';
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
    .addRequestHandlers(
        InsultMeHandler,
        InsultOtherPersonHandler,
        HelpHandler,
        ExitHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
