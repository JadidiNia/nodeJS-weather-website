const locationForm = document.querySelector("#locationForm");
const locationInput = document.querySelector("#locationInput");
const messageP = document.querySelector("#messageP");
const locaBold = document.querySelector("#locaBold");

locationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = locationInput.value;
  //   مهمه که لوکیشن خودش استرینگه بازم استرینگش نکنیم
  //   console.log(typeof(location))
  //   if(!location || location == ''){
  //     console.log('send address')
  //   }else{
  locaBold.textContent = "";
  messageP.textContent = "Loading...";
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res
      .json()
      .then((data) => {
        if (data.error) {
          locaBold.textContent = "";
          messageP.textContent = data.error;
        } else if (data.location === undefined) {
          locaBold.textContent = "";
          messageP.textContent = "You must provide an address";
        } else {
          locaBold.textContent = '"' + data.location.charAt(0).toUpperCase()+ data.location.slice(1) + '"';
          messageP.textContent = " is " + data.forecast;
        }
      })
      .catch((error) => {
        locaBold.textContent = "";
        messageP.textContent = error.message;
      });
  });
  locationInput.value = "";
  // }
});
