let secondHand = document.querySelector('.second-hand');
let minuteHand = document.querySelector('.min-hand');
let hourHand =  document.querySelector('.hour-hand');
function setTime(){
    const getDate= new Date();
    // for second hand
    let seconds = getDate.getSeconds()
    let secondsDegree = (seconds/60)*360 + 90;
    console.log(seconds);
    if(secondsDegree === 90){
    secondHand.style.transition="all 0s";    
    }
    else{
        secondHand.style.transition="all 0.05s";
    }
    secondHand.style.transform=`rotate(${secondsDegree}deg)`;

    // for minute hand
    let minutes = getDate.getMinutes()
    let minutesDegree = (minutes/60)*360 + 90;
    console.log("minute is =", minutes);
    if(minutesDegree === 90){
        minuteHand.style.transition="all 0s";    
        }
        else{
            minuteHand.style.transition="all 0.05s";
        }
    minuteHand.style.transform=`rotate(${minutesDegree}deg)`;
    // for hour hand
    let hour = getDate.getHours()
    let hourDegree = (hour/12)*360 + 90;
    console.log("hour is =", hour);
    hourHand.style.transform=`rotate(${hourDegree}deg)`;
}

setInterval(setTime,1000);

