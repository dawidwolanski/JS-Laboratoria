const data = JSON.parse(localStorage.getItem('weather-data') ?? '[]')
const apikey = '6abdc151eb72c3fe05950f15bcdbe1e5';
const container = document.querySelector('.places-container')

const displayElements = () => {
    data.forEach(element => {
        displayListItem(element)
    })
}

const displayListItem = weatherData => {
    const el = document.createElement('div');
    el.setAttribute('class', 'place');
    el.innerHTML = `
        <div class='remove'> [X] </div>
        <img src='https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png'>
        <div class='city-name'> Miasto: ${weatherData.name} </div> 
        <div class='city-temp'> Temperatura: ${weatherData.main.temp}°C </div>
        <div class='city-humidity'> Wilgotność: ${weatherData.main.humidity}% </div>
    `;
    container.appendChild(el);

}

const setCityData = cityData => {
    if (data.length > 10) {
        window.alert('zbyt dużo zapisanych miejsc');
        return
    }

    data.push(cityData);
    localStorage.setItem('weather-data', JSON.stringify(data));
}

const getCityData = async cityName => {
    try {
        const d = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`)

        if (d.cod == 404) {
            window.alert(d.message);
            return
        }

        const cityData = await d.json();
        setCityData(cityData);
        displayListItem(cityData);
    } catch (error) {
        window.alert('nie udało sie pobrać danych')
    }
}

const removeCity = id => {
    console.log(id);
    container.children[id].remove();
    data.splice(id, 1);
    localStorage.setItem('weather-data', JSON.stringify(data));
}

displayElements();

document.querySelector('.search-city').addEventListener('click', () => {
    const name = document.querySelector('.search').value;
    getCityData(name);
})

container.addEventListener('click', e => {
    if (e.target.classList.contains('remove')) {
        const targetParent = e.target.parentElement;
        const idToRemove = [...targetParent.parentElement.children].findIndex(el => el == targetParent);
        removeCity(idToRemove);
    }
})