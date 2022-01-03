function toUPP(name) {
  return name.toUpperCase();
}

chrome.storage.sync.get(["nithin"], function (result) {
  nameArr = result["nithin"]["name"];
  betaEmail = result["nithin"]["email"];
  // betaNumber = result['nithin']['number'];
  nameArr = nameArr.map(toUPP);
  console.log(nameArr, betaEmail);
});

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
  var transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("")
    .toUpperCase();

  if (e.results[0].isFinal) {
    if (new RegExp(nameArr.join("|")).test(transcript)) {
      fetch(
        "https://discord.com/api/webhooks/877151812447252481/WJNtmt-LBFSj4KcJHVI_2PfVyaBnYBgS-aKnEWm1YX-AFherVskcDAoIcr-4K2ltgqsS",
        {
          method: "POST",
          body: JSON.stringify({
            username: "Callout Notification",
            content: "Someone is calling you at Google Meet.",
          }),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          credentials: "same-origin",
        }
      )
        .then((response) => console.log(response.text()))
        .catch((error) => console.log(error.message));
      transcript = "";
    }
  }
});

// Implement a forever running loop
recognition.addEventListener("end", recognition.start);
recognition.start();

recognition.onerror = function (event) {
  fetch(
    "https://discord.com/api/webhooks/877151812447252481/WJNtmt-LBFSj4KcJHVI_2PfVyaBnYBgS-aKnEWm1YX-AFherVskcDAoIcr-4K2ltgqsS",
    {
      method: "POST",
      body: JSON.stringify({
        username: "Callout Notification",
        content: "Someone is calling you at Google Meet.",
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      credentials: "same-origin",
    }
  );
  console.log("Error occurred in recognition: " + event.error);
};
