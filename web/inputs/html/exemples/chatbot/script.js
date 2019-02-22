/*!
* This file is part of a11y-guidelines | Our vision of mobile & web accessibility guidelines and best practices, with valid/invalid examples.
* Copyright (C) 2016  Orange SA
* See the Creative Commons Legal Code Attribution-ShareAlike 3.0 Unported License for more details (LICENSE file).**/
var title;

$(document).ready(function() {
    title = document.title;

    $(".skiplink").on("focus", function () {
        $("#skip-links").removeClass("sr-only");
        window.scrollTo(0,0);
    });

    $(".skiplink").on("blur", function () {
        $("#skip-links").addClass("sr-only");
    });

    $("#chatbot-skiplink").on("click", function () {
        if ($("#chatbot-window").is(":visible")) {
            $("#chat-input").focus();
        } else {
            $("#chatbot-window").show();
            $("#btnChatbot").addClass("sr-only");
            $("#chat-input").focus();
        }
    });

    $("#btnChatbot").on("click", function () {
        $("#chatbot-window").show();
        $("#btnChatbot").addClass("sr-only");
        $("#chat-input").focus();
    });

    $("form").on("submit", function () {
        sendMessage();
        return false;
    })
    $("#chatbot-close").on("click", function () {
        $("#chatbot-window").hide();
        $("#btnChatbot").removeClass("sr-only");
    });
    $("#chatbot-hide").on("click", function () {
        $("#chatbot-window").toggleClass("chatbot-hidden");
        $("#chatbot-show").focus();
    });
    $("#chatbot-show").on("click", function () {
        $("#chatbot-window").toggleClass("chatbot-hidden");
        $("#chatbot-hide").focus();
    });

    $("#chat-input").on("focus", function () {
        document.title = title;
    });        
    
    push("Djingo", "Bonjour, puis-je vous aider ?", true); 
   
    $("#btnExemple1, #btnExemple2").on("click", function () {
        alert("Ouverture du chatbot !");
    });
});

function push(from, message, silence) {
    var lastFrom = $("#chat-content .messages").last().attr("data-from");
    if (lastFrom !== from) {
        $("#chat-content").append('<span data-from="' + from + '" class="from" aria-hidden="true">' + from + '</span><div class="messages" data-from="' + from + '"></div>');
    }

    if (!silence) {
        if (from==="moi") {
            playSound("Send_a_message");
        } else {
            playSound("Receive_a_message");
            if (!document.hasFocus() || document.activeElement !== document.getElementById('chat-input')) {
                document.title = "Djingo dit ... " + title;
            }
        }
    }

    $("#chat-content .messages").last().append('<div class="message"><span class="sr-only">' + from + ' dit : </span>' + message + '</div>');    
    $("#chat-content").animate({scrollTop: document.getElementById("chat-content").scrollHeight }, 100);
}

function sendMessage() {
    var msg = $("#chat-input").val();
    if (msg == '') {
        return;
    }
    push("moi", msg);
    $("#chat-input").val("").focus();
    
    // echo reply
    window.setTimeout(function () {
        push("Djingo", msg);
    }, 4000);
}

function playSound(filename){   
    document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="./sounds/' + filename + '.mp3" type="audio/mpeg" /><source src="./sounds/' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="./sounds/' + filename +'.mp3" /></audio>';
}

/* --- On supprime le focus lors de la navigation avec la souris --- */
var head = document.head || document.getElementsByTagName('head')[0];
var axsStyles = head.appendChild(document.createElement('style'));
document.addEventListener('mousedown', function() {
    axsStyles.innerHTML = '* {outline:none !important}';
});
document.addEventListener('keydown', function() {
    axsStyles.innerHTML = '';
});
/* ---- */
