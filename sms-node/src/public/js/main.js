const socket = io();

Notification.requestPermission().then(function (result) {
  console.log(result);
});

/**
 *
 * @param {String} message
 */
function notifyMe(message = "") {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }
}

socket.on("new message", (data) => {
  console.log("New SMS");
  notifyMe("New SMS received", data.Body);
  const messages = document.getElementById("messages");
  const li = document.createElement("li");
  li.classList =
    "list-group-item list-group-item-warning list-group-item-action";
  const div = document.createElement("div");
  div.classList = "d-flex w-100 justify-content-between";
  const body = document.createElement("h5");
  body.classList = "mb-1";
  body.appendChild(document.createTextNode(data.Body));
  const from = document.createElement("span");
  from.appendChild(document.createTextNode("From:", data.From));
  const createdAt = document.createElement("small");
  createdAt.appendChild(
    document.createTextNode(timeago.format(data.createdAt))
  );
  const _id = document.createElement("small");
  _id.appendChild(document.createTextNode("ID:", data._id));
  div.appendChild(body);
  div.appendChild(createdAt);
  li.appendChild(div);
  li.appendChild(from);
  li.appendChild(document.createElement("br"));
  li.appendChild(_id);
  messages.prepend(li);
});
