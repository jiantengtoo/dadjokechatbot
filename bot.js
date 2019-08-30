var botui = new BotUI('chatbot')

const myResponses = ['another one?', 'again?', 'LOL wanna hear another one?', 'that was funny! wanna hear another one?'
,'once more? :)','hahaha again?']

botui.message.add({
  content: 'Hello, would you like to hear a joke?'
});

function init() {
  botui.action.button({
    action: [
      {
        text: 'Sure',
        value: 'Yes'
      }, {
        text: 'Nope.',
        value: 'No'
      }
    ]
  }).then(function (res) {
    if (res.value == 'Yes') {
      $.ajax({
        url: 'https://icanhazdadjoke.com/',
        data: {
          'Accept': 'application/json'
        },
        dataType: 'json',
        method: 'GET',
        success: function (response) {
          botui.message.add({
            content: response.joke
          });
          botui.message.add({
            content: myResponses[Math.floor(Math.random() * myResponses.length)]
          });
        }
      }).then(init);
    } else {
      botui.message.add({
        content: 'Bye~'
      });
    }
    
  })
}


init();