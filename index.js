/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

 http://aws.amazon.com/apache2.0/

 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * This sample shows how to create a simple Trivia skill with a multiple choice format. The skill
 * supports 1 player at a time, and does not support games across sessions.
 */

'use strict';

/**
 * When editing your questions pay attention to your punctuation. Make sure you use question marks or periods.
 * Make sure the first answer is the correct one. Set at least 4 answers, any extras will be shuffled in.
 */
var cards = [{
        question: "To create a second name for the variable or method.",
        answers: ["alias", "begin", "else", "elsif"]
    },
    {
        question: "A command that appends two or more objects together.",
        answers: ["break", "do", "and", "ensure"]
    },
    {
        question: "Designates code that must be run unconditionally at the beginning of the program before any other.",
        answers: ["if", "BEGIN", "in", "case"]
    },
    {
        question: "Gives an unconditional termination to a code block, and is usually placed with an argument.",
        answers: ["elsif", "break", "class", "false"]
    },
    {
        question: "starts a case statement; this block of code will output a result and end when it's terms are fulfilled, which are defined with when or else.",
        answers: ["case", "begin", "class", "end"]
    },
    {
        question: "Opens a class definition block, which can later be reopened and added to with variables and even functions.",
        answers: ["ensure", "and", "alias", "class"]
    },
    {
        question: "Used to define a function.",
        answers: ["false", "for", "def", "if"]
    },
    {
        question: "A boolean logic function that asks whether or not a targeted expression refers to anything recognizable in Ruby; i.e. literal object, local variable that has been initialized, method name visible from the current scope, etc.",
        answers: ["for", "next", "defined?", "false"]
    },
    {
        question: "Paired with end, this can delimit a code block, much like curly braces; however, curly braces retain higher precedence.",
        answers: ["do", "retry", "rescue", "while"]
    },
    {
        question: "Gives an 'otherwise' within a function, if-statement, or for-loop, i.e. if cats = cute, puts 'Yay!' else puts 'Oh, a cat.'",
        answers: ["alias", "end", "else", "elsif"]
    },
    {
        question: "Much like else, but has a higher precedence, and is usually paired with terms.",
        answers: ["ensure", "class", "def", "elsif"]
    },
    {
        question: "Designates, via code block, code to be executed just prior to program termination.",
        answers: ["or", "END", "while", "undef"]
    },
    {
        question: "Marks the end of a while, until, begin, if, def, class, or other keyword-based, block-based construct.",
        answers: ["super", "end", "self", "false"]
    },
    {
        question: "Marks the final, optional clause of a begin/end block, generally in cases where the block also contains a rescue clause. The code in this term's clause is guaranteed to be executed, whether control flows to a rescue block or not.",
        answers: ["if", "ensure", "for", "module"]
    },
    {
        question: "denotes a special object, the sole instance of FalseClass. false and nil are the only objects that evaluate to Boolean falsehood in Ruby (informally, that cause an if condition to fail.)",
        answers: ["ensure", "until", "false", "unless"]
    },
    {
        question: "A loop constructor; used in for-loops.",
        answers: ["for", "super", "while", "module"]
    },
    {
        question: "Ruby's basic conditional statement constructor.",
        answers: ["return", "rescue", "if", "while"]
    },
    {
        question: "Used with for, helps define a for-loop.",
        answers: ["if", "end", "else", "in"]
    },
    {
        question: "Opens a library, or module, within a Ruby Stream.",
        answers: ["module", "retry", "for", "class"]
    },
    {
        question: "Bumps an iterator, or a while or until block, to the next iteration, unconditionally and without executing whatever may remain of the block.",
        answers: ["true", "retry", "next", "self"]
    },
    {
        question: "A special 'non-object'; it is, in fact, an object (the sole instance of NilClass), but connotes absence and indeterminacy. nil and false are the only two objects in Ruby that have Boolean falsehood (informally, that cause an if condition to fail).",
        answers: ["nil", "module", "retry", "undef"]
    },
    {
        question: "Boolean negation. i.e. not true # false, not 10 # false, not false # true.",
        answers: ["rescue", "not", "self", "unless"]
    },
    {
        question: "Boolean or. Differs from double pipe in that or has lower precedence.",
        answers: ["super", "until", "while", "or"]
    },
    {
        question: "Causes unconditional re-execution of a code block, with the same parameter bindings as the current execution.",
        answers: ["super", "for", "if", "redo"]
    },
    {
        question: "Designates an exception-handling clause that can occur either inside a begin<code>/<code>end block, inside a method definition (which implies begin), or in modifier position (at the end of a statement).",
        answers: ["rescue", "return", "then", "true"]
    },
    {
        question: "Inside a rescue clause, causes Ruby to return to the top of the enclosing code (the begin keyword, or top of method or block) and try executing the code again.",
        answers: ["for", "retry", "in", "next"]
    },
    {
        question: "Inside a method definition, executes the ensure clause, if present, and then returns control to the context of the method call. Takes an optional argument (defaulting to nil), which serves as the return value of the method. Multiple values in argument position will be returned in an array.",
        answers: ["retry", "true", "return", "while"]
    },
    {
        question: "The 'current object' and the default receiver of messages (method calls) for which no explicit receiver is specified. Which object plays the role of self depends on the context.",
        answers: ["while", "then", "super", "self"]
    },
    {
        question: "Called from a method, searches along the method lookup path (the classes and modules available to the current object) for the next method of the same name as the one being executed. Such method, if present, may be defined in the superclass of the object's class, but may also be defined in the superclass's superclass or any class on the upward path, as well as any module mixed in to any of those classes.",
        answers: ["true", "super", "until", "when"]
    },
    {
        question: "Optional component of conditional statements (if, unless, when). Never mandatory, but allows for one-line conditionals without semi-colons.",
        answers: ["then", "while", "until", "retry"]
    },
    {
        question: "The sole instance of the special class TrueClass. true encapsulates Boolean truth; however, <emph>all</emph> objects in Ruby are true in the Boolean sense (informally, they cause an if test to succeed), with the exceptions of false and nil.",
        answers: ["break", "ensure", "module", "true"]
    },
    {
        question: "Undefines a given method, for the class or module in which it's called. If the method is defined higher up in the lookup path (such as by a superclass), it can still be called by instances classes higher up.",
        answers: ["when", "undef", "yield", "rescue"]
    },
    {
        question: "The negative equivalent of if. i.e. unless y.score > 10 puts 'Sorry; you needed 10 points to win.' end.",
        answers: ["yield", "end", "unless", "alias"]
    },
    {
        question: "The inverse of while: executes code until a given condition is true, i.e., while it is not true. The semantics are the same as those of while.",
        answers: ["until", "module", "retry", "case"]
    },
    {
        question: "Same as case.",
        answers: ["return", "self", "super", "when"]
    },
    {
        question: "Takes a condition argument, and executes the code that follows (up to a matching end delimiter) while the condition is true.",
        answers: ["for", "redo", "while", "yield"]
    },
    {
        question: "Called from inside a method body, yields control to the code block (if any) supplied as part of the method call. If no code block has been supplied, calling yield raises an exception.",
        answers: ["yield", "end", "class", "undef"]
    }
];

var listOfAnswers = [1, 3, 2, 2, 1, 4, 3, 3, 1, 3, 4, 2, 2, 2, 3, 1, 3, 4, 1,
    3, 1, 2, 4, 4, 1, 2, 3, 4, 2, 1, 4, 2, 3, 1, 4, 3, 1
];

function getSample(){
    var sample = Math.floor(Math.random()*cards.length);
    var answerIndex = listOfAnswers[sample];
    var question = cards[sample].question;
    var answers = cards[sample].answers;
    var answer = cards[sample].answers[answerIndex-1];
    return [sample, answerIndex, question, answers, answer];
};


// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function(event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

        if (event.session.application.applicationId !== "amzn1.ask.skill.1cee2ea4-6ac2-4c13-a784-6a03214595cc") {
            context.fail("Invalid Application ID");
        }

        if (event.session.new) {
            onSessionStarted({
                requestId: event.request.requestId
            }, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);

    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }

    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("LaunchIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        handleQuestionRequest(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}


// ------- Skill specific business logic -------

var ANSWER_COUNT = 1; // 6 references in code
var GAME_LENGTH = 5; // 3 references to this in code
var CARD_TITLE = "Ruby Voice Flashcards";

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
        speechOutput = "Welcome to Ruby Voice Flashcards. Are you ready to test your Ruby knowledge? Say new flashcard or help to begin.",
        shouldEndSession = false,
        repromptText = speechOutput;

    speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": 0,
        "correctAnswerIndex": 0
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleQuestionRequest(callback) {
    var qaArray = getSample(),
        sessionAttributes = {},
        speechOutput = qaArray[2],
        shouldEndSession = false,
        currentQuestionIndex = qaArray[0],
        correctAnswerIndex = qaArray[1],
        answerArray = qaArray[3],
        correctAnswerText = qaArray[4],
        // [sample, answerIndex, question, answers, answer];
        // num from sample: [0]
        // question text: [2]
        // answers: [3]
        // answer: [4]
        // answer index: [1]

    //     gameQuestion = populateGameQuestions(),
    //     correctAnswerIndex =
    //     currentQuestionIndex = 0,
    //     spokenQuestion = ,
        repromptText = speechOutput;
    //
    console.log(`getSample is ${getSample()}`);
    //
    // speechOutput += repromptText;
    sessionAttributes = {
        "speechOutput": speechOutput,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "correctAnswerIndex": correctAnswerIndex,
        "answerArray": answerArray,
        "correctAnswerText": correctAnswerText
    };
    callback(sessionAttributes,
        buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var gameInProgress = session.attributes && session.attributes.questions;
    var answerSlotValid = isAnswerSlotValid(intent);
    var userGaveUp = intent.name === "DontKnowIntent";

    if (!gameInProgress) {
        // If the user responded with an answer but there is no game in progress, ask the user
        // if they want to start a new game. Set a flag to track that we've prompted the user.
        sessionAttributes.userPromptedToContinue = true;
        speechOutput = "There is no game in progress. Do you want to start a new game? ";
        callback(sessionAttributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, speechOutput, false));
    } else if (!answerSlotValid && !userGaveUp) {
        // If the user provided answer isn't a number > 0 and < ANSWER_COUNT,
        // return an error message to the user. Remember to guide the user into providing correct values.
        var reprompt = session.attributes.speechOutput;
        var speechOutput = "Your answer must be a known capital " + reprompt;
        callback(session.attributes,
            buildSpeechletResponse(CARD_TITLE, speechOutput, reprompt, false));
    } else {
        var gameQuestions = session.attributes.questions,
            correctAnswerIndex = parseInt(session.attributes.correctAnswerIndex),
            currentScore = parseInt(session.attributes.score),
            currentQuestionIndex = parseInt(session.attributes.currentQuestionIndex),
            correctAnswerText = session.attributes.correctAnswerText;

        var speechOutputAnalysis = "";

        if (answerSlotValid && intent.slots.Answer.value.toUpperCase() === correctAnswerText.toUpperCase()){
            currentScore++;
            speechOutputAnalysis = "correct. ";
            //         @newQuestion = deck.getSample;
            //         r.spoken_response = "That is correct! Next question: #{@newQuestion[2]}." +
            //         "What is the correct answer? #{@newQuestion[3].join(", ")}";
            //         r.reprompt_text = "sorry, I couldn't catch what you were saying." +
            //         "try saying the answer in a sentence. for example, the answer is one." +
            //         "you can also say i don’t know, skip, or repeat the question";
            //         r.card_title = "Correct Response";
            //         r.card_content = "#{@newQuestion[2]}\n The correct answer is #{@newQuestion[4]}";
            //         add_session_attributes(r);
        } else {
            if (!userGaveUp) {
                speechOutputAnalysis = "wrong. "
            }
            speechOutputAnalysis += "The correct answer is " + correctAnswerText + ". ";
            //         @newQuestion = deck.getSample
            //         r.spoken_response = "Sorry, that is incorrect. The answer is #{@echo_request.attributes["correctAnswerIndex"]}, #{@echo_request.attributes["correctAnswerText"]}." +
            //         "Let's try another question: #{@newQuestion[2]}." +
            //         "What is the correct answer? #{@newQuestion[3].join(", ")}";
            //         r.reprompt_text = "sorry, I couldn't catch what you were saying." +
            //         "try saying the answer in a sentence. for example, the answer is one." +
            //         "you can also say i don’t know, skip, or repeat the question";
            //         r.card_title = "Incorrect Response.";
            //         r.card_content = "#{@newQuestion[2]}\n The correct answer is #{@newQuestion[4]}";
            //         add_session_attributes(r);
        }
        // if currentQuestionIndex is 4, we've reached 5 questions (zero-indexed) and can exit the game session
        if (currentQuestionIndex == GAME_LENGTH - 1) {
            speechOutput = userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "You got " + currentScore.toString() + " out of "
                + GAME_LENGTH.toString() + " questions correct. Thank you for learning the capital cities of the United States!";
            callback(session.attributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, "", true));

        } else {
            currentQuestionIndex += 1;
            // var spokenQuestion = Object.keys(questions[gameQuestions[currentQuestionIndex]]);
            // Generate a random index for the correct answer, from 0 to 3
            correctAnswerIndex = Math.floor(Math.random() * (ANSWER_COUNT));
            // var roundAnswers = populateRoundAnswers(gameQuestions, currentQuestionIndex, correctAnswerIndex),

            var questionIndexForSpeech = currentQuestionIndex + 1,
                repromptText =  spokenQuestion ;
            for (var i = 0; i < ANSWER_COUNT; i++) {
                repromptText +=  ""
            }
            speechOutput += userGaveUp ? "" : "That answer is ";
            speechOutput += speechOutputAnalysis + "Your score is " + currentScore.toString() + ". " + repromptText;

            sessionAttributes = {
                "speechOutput": repromptText,
                "repromptText": repromptText,
                "currentQuestionIndex": currentQuestionIndex,
                "correctAnswerIndex": correctAnswerIndex + 1,
                "questions": gameQuestions,
                "score": currentScore,
                "correctAnswerText":
                    questions[gameQuestions[currentQuestionIndex]][Object.keys(questions[gameQuestions[currentQuestionIndex]])[0]][0]
            };
            callback(sessionAttributes,
                buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, false));
        }
    }
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
            buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.

    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }

    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;

    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.

    var speechOutput = "help menu. to go to the main menu, say main menu or open main menu." +
        "to open a flashcard, you can say start, new flashcard, start new flashcard, or give me a new flashcard." +
        "once a flashcard is opened, you can say one, two, three or four." +
        "you can also say the answer in sentence form." +
        "for example, the answer is one, my answer is two, is it three?, or four is my answer." +
        "if you don’t know the answer or would like to skip, you can say i don’t know or skip." +
        "to repeat the question, say repeat, repeat the the question, say it again, or say the question again.",
        repromptText = "To give an answer to a question, respond with the number of the answer " +
        "or use the phrase . the answer is . with your answer . " +
        "Would you like to keep playing?";
    var shouldEndSession = false;
    callback(session.attributes,
        buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("you have chosen to stop. session has ended", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}
