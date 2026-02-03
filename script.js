const API_KEY="c7bf86fc3bfe4bb2b8953431263001";
const loc=document.getElementById("search");
const btn=document.getElementById("search_btn");

function showLoader(){
    document.getElementById("loader-overlay").classList.add("active");
    btn.disabled=true;
}

function hideLoader(){
    document.getElementById("loader-overlay").classList.remove("active");
    btn.disabled=false;
}

btn.addEventListener("click",async()=>{
    const city=loc.value.trim();
    if(!city)return;
    showLoader();
    const url=`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    try{
        const res=await fetch(url);
        const data=await res.json();
        if(data.error){
            hideLoader();
            alert("Location not found! Please try again.");
            return;
        }
        document.getElementById("temp").innerText=`${data.current.temp_c}°C`;
        document.querySelector(".location").innerText=data.location.name;
        document.querySelector(".status").innerText=data.current.condition.text;
        const img=document.querySelector(".icon img");
        img.src=data.current.condition.icon;
        img.style.display="block";
        document.getElementById("time").innerText=data.location.localtime.split(" ")[1];
        document.getElementById("day").innerText=new Date(data.location.localtime).toLocaleDateString("en-US",{weekday:"long"});
        document.getElementById("date").innerText=new Date(data.location.localtime).toLocaleDateString();
        hideLoader();
    }catch(err){
        console.error(err);
        hideLoader();
        alert("Error fetching weather data. Please try again.");
    }
});

loc.addEventListener("keypress",e=>{
    if(e.key==="Enter")btn.click();
});
