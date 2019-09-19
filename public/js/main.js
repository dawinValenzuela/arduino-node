var socket = io.connect();

socket.on("led", function(data) {
  //console.log("led", data.value);
  let value = (data && data.value) || 0;
  document.getElementById("controlRange").value = data.value;
  //document.getElementById("outputText").innerHTML = data.value;
});
/*
socket.on("temp", function(temp) {
  console.log("temp", temp);
  document.getElementById("temperature").innerHTML = `${temp} ℃`;
});
*/
socket.on("temp", function(temp) {
  //console.log("temp", temp);
  const data = temp.split(" ");
  let temperature = 0;
  let humidity = 0;

  temperature = data[1];
  humidity = data[3];

  document.getElementById("temperature").innerHTML = `${temperature} ℃`;
  document.getElementById("humidity").innerHTML = `${humidity} %`;
});

function showValue(newValue) {
  //document.getElementById("outputText").innerHTML = newValue;
  socket.emit("led", { value: newValue });
  //console.log(newValue);
}
