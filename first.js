const requestJSON = new XMLHttpRequest();
requestJSON.open("GET", "server1.json", true);
requestJSON.setRequestHeader("Content-type", "application/json; charset=utf-8");
requestJSON.send();
requestJSON.addEventListener("load", (e) => {
  if (requestJSON.status == 200) {
    const result = JSON.parse(requestJSON.response);
    const blockRed = document.querySelector(".block_red");
    blockRed.textContent = result.usd;
  } else {
    const blockRed = document.querySelector(".block_red");
    blockRed.textContent = ":P";
  }
});
function request(e) {
  e.preventDefault();
  const message = new XMLHttpRequest();
  const obj = {};
  message.open("POST", "index.cs", true);
  const from = new FormData(form);
  console.log(from);
  from.forEach((key, value) => {
    obj[value] = key;
  });
  console.log(obj);
  message.send(JSON.stringify(obj));
  message.addEventListener("load", (e) => {
    if (e.target.status === 200) {
      console.log(e.target.response);
    } else {
      console.log(e.target.status);
    }
  });
}
const form = document.querySelector("form");
form.addEventListener("submit", request);
