/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const SKILL_NAME = 'The Shakespearean Insult-a-Tron';
const HELP_MESSAGE = 'You can ask me to insult you, by saying "Infinite Insult." You can direct an insult to someone else by saying, "Ask Infinite Insult to insult ..." and that person\'s name.';
const HELP_REPROMPT = 'How now, Roderigo?';
const STOP_MESSAGE = 'So farewell to the little good you bear me.';

const quotedInsults = [
    {
        insult: 'You are a most notable coward, an infinite and endless liar, an hourly promise breaker, the owner of no one good quality.',
        source: 'All’s Well That Ends Well (Act 3, Scene 6)'
    },
    {
        insult: 'Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!',
        source: 'Henry IV Part I (Act 2, Scene 4)'
    },
    {
        insult: 'Come, come, you froward and unable worms!',
        source: 'The Taming of The Shrew (Act 5, Scene 2)'
    },
    {
        insult: 'Tempt not too much the hatred of my spirit, for I am sick when I do look on thee.',
        source: 'A Midsummer Night’s Dream (Act 2, Scene 1)'
    },
    {
        insult: 'I’ll beat thee, but I would infect my hands.',
        source: 'Timon of Athens (Act 4, Scene 3)'
    },
    {
        insult: 'If thou wilt needs marry, marry a fool; for wise persons know well enough what monsters you make of them.',
        source: 'Hamlet (Act 3, Scene 1)'
    },
    {
        insult: 'Methink’st thou art a general offence and every man should beat thee.',
        source: 'All’s Well That Ends Well (Act 2, Scene 3)'
    },
    {
        insult: 'Your wit’s as thick as a Tewkesbury mustard.',
        source: 'Henry IV Part 2 (Act 2, Scene 4)',
    },
    {
        insult: 'You are pigeon-liver’d and lack gall.',
        source: 'Hamlet (Act 2, Scene 2)',
    },
    {
        insult: 'I must tell you friendly in your ear, sell when you can, you are not for all markets.',
        source: 'As You Like It (Act 3 Scene 5)',
    },
    {
        insult: 'I scorn you, scurvy companion.',
        source: 'Henry IV Part II (Act 2, Scene 4)',
    },
    {
        insult: 'More of your conversation would infect my brain.',
        source: 'The Comedy of Errors (Act 2, Scene 1)',
    },
    {
        insult: 'You poisonous bunch-backed toad!',
        source: 'Richard III (Act 1, Scene 3)',
    },
    {
        insult: 'You have the rankest compound of villainous smell that ever offended nostril.',
        source: 'The Merry Wives of Windsor (Act 3, Scene 5)',
    },
    {
        insult: 'The tartness of your face sours ripe grapes.',
        source: 'The Comedy of Errors (Act 5, Scene 4)',
    },
    {
        insult: 'That trunk of humours, that bolting-hutch of beastliness, that swollen parcel of dropsies, that huge bombard of sack, that stuffed cloak-bag of guts, that roasted Manningtree ox with pudding in his belly, that reverend vice, that grey Iniquity, that father ruffian, that vanity in years? ... that is you.',
        source: 'Henry IV Part 1 (Act 2, Scene 4)',
    },
    {
        insult: 'Thine face is not worth sunburning.',
        source: 'Henry V (Act 5, Scene 2)',
    },
    {
        insult: 'Thou art a boil, a plague sore.',
        source: 'King Lear (Act 2, Scene 2)',
    },
    {
        insult: 'Thou art as loathsome as a toad.',
        source: 'Titus Andronicus (Act 4, Scene 3)',
    },
    {
        insult: 'You are like the toad; ugly and venomous.',
        source: 'As You Like It (Act 2, Scene 1)',
    },
    {
        insult: 'Thou art unfit for any place but hell.',
        source: 'Richard III (Act 1 Scene 2)',
    },
    {
        insult: 'Thou elvish-mark’d, abortive, rooting hog!',
        source: 'Richard III (Act 1, Scene 3)',
    },
    {
        insult: 'Thou lump of foul deformity.',
        source: 'Richard III (Act 1, Scene 2)',
    },
    {
        insult: 'Thou sodden-witted lord! Thou hast no more brain than I have in mine elbows.',
        source: 'Troilus and Cressida (Act 2, Scene 1)',
    },
    {
        insult: 'Thou subtle, perjur’d, false, disloyal one!',
        source: 'The Two Gentlemen of Verona (Act 4, Scene 2)',
    },
    {
        insult: 'Thy sin’s not accidental, but a trade.',
        source: 'Measure For Measure (Act 3, Scene 1)',
    },
    {
        insult: 'Thy tongue outvenoms all the worms of Nile.',
        source: 'Cymbeline (Act 3, Scene 4',
    },
    {
        insult: 'Would thou wert clean enough to spit upon.',
        source: 'Timon of Athens (Act 4, Scene 3)',
    },
    {
        insult: 'You poor, base, rascally, cheating lack-linen mate!',
        source: 'Henry IV Part II (Act 2, Scene 4)',
    },
    {
        insult: 'You are as a candle, the better burnt out.',
        source: 'Henry IV Part 2 (Act 1, Scene 2)',
    },
    {
        insult: 'You scullion! You rampallian! You fustilarian! I’ll tickle your catastrophe!',
        source: 'Henry IV Part 2 (Act 2, Scene 1)',
    },
    {
        insult: 'You starvelling, you eel-skin, you dried neat’s-tongue, you bull’s-pizzle, you stock-fish–O for breath to utter what is like thee!—you tailor’s-yard, you sheath, you bow-case, you vile standing tuck!',
        source: 'Henry IV Part 1 (Act 2, Scene 4)',
    },
    {
        insult: 'Your brain is as dry as the remainder biscuit after voyage.',
        source: 'As You Like It (Act 2, Scene 7)',
    },
    {
        insult: 'Four of [your] five wits went halting off, and now is the whole [of you] governed with one: so that if [you] have wit enough to keep [thyself] warm, let [you] bear it for a difference between [yourself] and [your] horse; for it is all the wealth that [you] hath left, to be known a reasonable creature.',
        source: 'Much Ado About Nothing (Act 1, Scene 1)',
    },
    {
        insult: '[You] have a plentiful lack of wit.',
        source: 'Hamlet (Act 2, Scene 2)',
    },
    {
        insult: 'Your abilities are too infant-like for doing much alone.',
        source: 'Coriolanus (Act 2, Scene 1)',
    },
    {
        insult: 'If you spend word for word with me, I shall make your wit bankrupt.',
        source: 'Two Gentlemen of Verona (Act 2, Scene 4)',
    },
    {
        insult: '[Thou hast] not so much brain as ear-wax.',
        source: 'Troilus and Cressida (Act 5, Scene 1)',
    },
    {
        insult: 'Thou art the cap of all the fools.',
        source: 'Timon of Athens (Act 4, Scene 3)',
    },
    {
        insult: 'Away thou rag, thou quantity, thou remnant.',
        source: 'The Taming of the Shrew (Act 4, Scene 3)',
    },
    {
        insult: 'You are not worth another word, else I’d call you knave.',
        source: 'All’s Well That Ends Well (Act 2, Scene 3)',
    },
    {
        insult: 'Away, you mouldy rogue, away!',
        source: 'Henry IV, Part 2 (Act 2, Scene 4)',
    },
    {
        insult: 'I do desire that we may be better strangers.',
        source: 'As You Like It (Act 3, Scene 2)',
    },
    {
        insult: 'Drunkenness is [your] best virtue, for [you] will be swine drunk, and in [your] sleep [you] does little harm, save to [your] bedclothes about [you].',
        source: 'All’s Well That Ends Well (Act 4, Scene 3)',
    },
    {
        insult: '[Thou] threadbare juggler!',
        source: 'The Comedy of Errors (Act 5, Scene 1)',
    },
    {
        insult: '[Thou] eater of broken meats!',
        source: 'King Lear (Act 2, Scene 2)',
    },
    {
        insult: 'Thou subtle, perjur’d, false, disloyal [person]!',
        source: 'The Two Gentlemen of Verona (Act 4, Scene 2)',
    },
    {
        insult: 'There’s no more faith in thee than in a stewed prune.',
        source: 'Henry IV Part 1 (Act 3, Scene 3)',
    },
    {
        insult: 'I do wish thou were a dog, that I might love thee something.',
        source: 'Timon of Athens (Act 4, Scene 4)',
    },
    {
        insult: 'A weasel hath not such a deal of spleen as you are toss’d with.',
        source: 'Henry IV, Part 1 (Act 2, Scene 3)',
    },
    {
        insult: '[Thou hast] more hair than wit, and more faults than hairs.',
        source: 'Two Gentlemen of Verona (Act 3, Scene 1)',
    },
    {
        insult: 'Out of my sight! thou dost infect my eyes.',
        source: 'Richard III (Act 1, Scene 2)',
    },
    {
        insult: 'Thou art a boil, a plague sore, an embossed carbuncle in my corrupted blood.',
        source: 'King Lear (Act 2, Scene 4)',
    },
    {
        insult: 'The tartness of [your] face sours ripe grapes.',
        source: 'The Comedy of Errors (Act 5, Scene 4)',
    },
    {
        insult: 'Thou lump of foul deformity.',
        source: 'Richard III (Act 1, Scene 2)',
    },
    {
        insult: 'Thou flea, thou nit, thou winter-cricket thou!',
        source: 'The Taming of the Shrew (Act 3, Scene 3)',
    },
    {
        insult: 'They lie deadly that tell you you have good faces.',
        source: 'Coriolanus',
    },
    {
        insult: 'I think thy horse will sooner con an oration than thou learn a prayer without book.',
        source: 'Troilus and Cressida',
    },
    {
        insult: '[Thou hast] No more brain than a stone.',
        source: 'Twelfth Night',
    },
    {
        insult: '[Thou art] a foul and pestilent congregation of vapours.',
        source: 'Hamlet',
    },
];

const insultBuilderAdjective1 = [
    'artless', 'bawdy', 'beslubbering', 'bootless', 'churlish', 'cockered', 'clouted', 'craven', 'currish', 'dankish', 'dissembling', 'droning', 'errant', 'fawning', 'fobbing', 'froward', 'frothy', 'gleeking', 'goatish', 'gorbellied', 'impertinent', 'infectious', 'jarring', 'loggerheaded', 'lumpish', 'mammering', 'mangled', 'mewling', 'paunchy', 'pribbling', 'puking', 'puny', 'qualling', 'rank', 'reeky', 'roguish', 'ruttish', 'saucy', 'spleeny', 'spongy', 'surly', 'tottering', 'unmuzzled', 'vain', 'venomed', 'villainous', 'warped', 'wayward', 'weedy', 'yeasty'
];
const insultBuilderAdjective2 = [
    'base-court', 'bat-fowling', 'beef-witted', 'beetle-headed', 'boil-brained', 'clapper-clawed', 'clay-brained', 'common-kissing', 'crook-pated', 'dismal-dreaming', 'dizzy-eyed', 'doghearted', 'dread-bolted', 'earth-vexing', 'elf-skinned', 'fat-kidneyed', 'fen-sucked', 'flap-mouthed', 'fly-bitten', 'folly-fallen', 'fool-born', 'full-gorged', 'guts-griping', 'half-faced', 'hasty-witted', 'hedge-born', 'hell-hated', 'idle-headed', 'ill-breeding', 'ill-nurtured', 'knotty-pated', 'milk-livered', 'motley-minded', 'onion-eyed', 'plume-plucked', 'pottle-deep', 'pox-marked', 'reeling-ripe', 'rough-hewn', 'rude-growing', 'rump-fed', 'shard-borne', 'sheep-biting', 'spur-galled', 'swag-bellied', 'tardy-gaited', 'tickle-brained', 'toad-spotted', 'unchin-snouted', 'weather-bitten'
];
const insultBuilderNoun = [
    'apple-john', 'baggage', 'barnacle', 'bladder', 'boar-pig', 'bugbear', 'bum-bailey', 'canker-blossom', 'clack-dish', 'clotpole', 'coxcomb', 'codpiece', 'death-token', 'dewberry', 'flap-dragon', 'flax-wench', 'flirt-gill', 'foot-licker', 'fustilarian', 'giglet', 'gudgeon', 'haggard', 'harpy', 'hedge-pig', 'horn-beast', 'hugger-mugger', 'joithead', 'lewdster', 'lout', 'maggot-pie', 'malt-worm', 'mammet', 'measle', 'minnow', 'miscreant', 'moldwarp', 'mumble-news', 'nut-hook', 'pigeon-egg', 'pignut', 'puttock', 'pumpion', 'ratsbane', 'scut', 'skainsmate', 'strumpet', 'varlot', 'vassal', 'whey-face', 'wagtail'
];

const InsultMeHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
            || (request.type === 'IntentRequest'
                && request.intent.name === 'InsultMeIntent');
    },
    handle(handlerInput) {
        const insultArr = quotedInsults;
        const insultIndex = Math.floor(Math.random() * insultArr.length);
        const randomInsult = insultArr[insultIndex];
        const speechOutput = randomInsult.insult;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, randomInsult.insult)
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
        const insultArr = quotedInsults;
        const insultIndex = Math.floor(Math.random() * insultArr.length);
        const randomInsult = insultArr[insultIndex];
        const speechOutput = insulteeName + ', ' + randomInsult.insult;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, randomInsult.insult)
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
