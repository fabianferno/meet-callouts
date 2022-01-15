function toUPP(name) {
  return name.toUpperCase();
}

chrome.storage.sync.get(["nithin"], function (result) {
  nameArr = result["nithin"]["name"];
  betaEmail = result["nithin"]["email"];
  betaNumber = result["nithin"]["number"];
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
    .join("");
  if (e.results[0].isFinal) {
    transcript = transcript.toUpperCase();

    if (new RegExp(nameArr.join("|")).test(transcript)) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        process.env.DISCORD_WEBHOOK,
        true,
        null,
        null
      );
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.send(
        JSON.stringify({
          username: "Google Meet Calendar Notification",
          avatar_url:
            "https://cdn.iconscout.com/icon/free/png-256/google-meet-2923654-2416657.png",
          content: `Hey Fabian! Someone is calling you at ${window.location.href}`,
        })
      );

      console.log("Discord Message Sent");
    }
  }
  console.log(transcript);
});

recognition.addEventListener("end", recognition.start);

recognition.start();

recognition.onerror = function (event) {
  xhr.open(
    "POST",
    process.env.DISCORD_WEBHOOK,
    true,
    null,
    null
  );
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xhr.send(
    JSON.stringify({
      username: "Google Meet Calendar Notification",
      avatar_url:
        "https://cdn.iconscout.com/icon/free/png-256/google-meet-2923654-2416657.png",
      content: `Hey Fabian! Someone is calling you at ${window.location.href}`,
    })
  );
  console.log("Error occurred in recognition: " + event.error);
};
