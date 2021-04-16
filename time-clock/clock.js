var text = document.createElement("div");
text.innerHTML = "text";
document.body.appendChild(text);

function showClockTime() {
    const date = new Date();
    let hours = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    hours = (hours < 10) ? "0" + hours : hours;
    mins = (mins < 10) ? "0" + mins : mins;
    secs = (secs < 10) ? "0" + secs : secs;
    text.innerHTML = hours + ":" + mins + ":" + secs;
    setTimeout(showClockTime, 1000);
}

function countdownTime(time) {
    setInterval(function() {
        time--;
        if(time <= 0) alert("Timeout");
        text.innerHTML = time + " secs";
    }, 1000);
}