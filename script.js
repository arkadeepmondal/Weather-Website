const API_KEY = "c7bf86fc3bfe4bb2b8953431263001";

const loc = document.getElementById("search");
const btn = document.getElementById("search_btn");

btn.addEventListener("click", async () => {
  const city = loc.value.trim();
  if (!city) return;

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return;
    }

    document.getElementById("temp").innerText =
      `${data.current.temp_c}°C`;

    document.querySelector(".location").innerText =
      data.location.name;

    document.querySelector(".status").innerText =
      data.current.condition.text;

    document.querySelector(".icon img").src =
      data.current.condition.icon;
    document.querySelector(".icon img").style.display = "block";

    document.getElementById("time").innerText =
      data.location.localtime.split(" ")[1];

    document.getElementById("day").innerText =
      new Date(data.location.localtime).toLocaleDateString("en-US", {
        weekday: "long"
      });

    document.getElementById("date").innerText =
      new Date(data.location.localtime).toLocaleDateString();

  } catch (err) {
    console.error(err);
  }
});
