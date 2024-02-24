$(document).ready(function () {
    eventHandlers();
    play_audio();
    findMyState();
    adjustBrightness();
});

function eventHandlers() {
    $('#viewProduce').on("click", function () {
        $('#catSection').hide();
        $('#produceSection').show();
    });

    $('#viewBakery').on("click", function () {
        $('#catSection').hide();
        $('#bakerySection').show();
    });

    $('#viewDairy').on("click", function () {
        $('#catSection').hide();
        $('#dairySection').show();
    });

    $('#produceToCat').on("click", function () {
        $('#produceSection').hide();
        $('#catSection').show();
    });

    $('#dairyToCat').on("click", function () {
        $('#dairySection').hide();
        $('#catSection').show();
    });

    $('#bakeryToCat').on("click", function () {
        $('#bakerySection').hide();
        $('#catSection').show();
    });

    $(".itemCardContent").on("click", function () {
        var theID = '#' + this.id + "_modal";
        $(theID).show();
    });

    $('span.close').on("click", function () {
        var value = (this.id.split('-'))[0]
        var theID = '#' + value + "_modal";
        $(theID).hide();
    });

    $('#squashInCart').on("click", function () {
        $("#squash_modal").show();
    });

    $('#cupcakeInCart').on("click", function () {
        $("#cupcake_modal").show();
    });

    $('#cheeseInCart').on("click", function () {
        $("#cheese_modal").show();
    });

    // overlay button logic
    const overlayButton = document.getElementById("overlay-button");
    const overlay = document.getElementById("overlay");

    overlayButton.addEventListener("click", () => {
        overlay.style.display = "flex";
        overlay.style.animation = "slide-in 2s forwards";
    });

    $('#cart-close-button').on("click", function () {
        overlay.style.animation = "slide-out 2s forwards";

        setTimeout(() => {
            overlay.style.display = "none";
        }, 50);
    });

    // setting button logic
    const settingOverlayButton = document.getElementById("setting-button");
    const settingOverlay = document.getElementById("setting-overlay");

    settingOverlayButton.addEventListener("click", () => {
        settingOverlay.style.display = "flex";
        settingOverlay.style.animation = "slide-out 0.5s forwards";
    });

    $('#setting-close-button').on("click", function () {
        settingOverlay.style.animation = "slide-out 0.5s forwards";

        setTimeout(() => {
            settingOverlay.style.display = "none";
        }, 50);
    });

    $('.home-button').on("click", function () {        
        $('#produceSection').hide();
        $('#dairySection').hide();
        $('#bakerySection').hide();
        $('#catSection').show();
        scroll(0, 0);
        scroll("smooth");  
    });

    $('.logo').on("click", function() {
        $('#produceSection').hide();
        $('#dairySection').hide();
        $('#bakerySection').hide();
        $('#catSection').show();
        scroll(0, 0);
        scroll("smooth");
    });
}
// adjusts the brightness of the screen
function adjustBrightness(value) {
    const brightnessValue = value / 10;
    document.querySelector('.bodyClass').style.filter = `brightness(${brightnessValue})`;
}

// increments and decrements the quantity value
function increment(button) {
    var container = button.parentNode;
    var countSpan = container.getElementsByClassName('cartCount')[0];
    var count = parseInt(countSpan.getAttribute('data-count')) + 1;
    countSpan.setAttribute('data-count', count);
    countSpan.innerText = count;
}

function decrement(button) {
    var container = button.parentNode;
    var countSpan = container.getElementsByClassName('cartCount')[0];
    var count = parseInt(countSpan.getAttribute('data-count'));
    if (count > 0) {
        count -= 1;
        countSpan.setAttribute('data-count', count);
        countSpan.innerText = count;
    }
}

function play_audio() {
    var button = document.getElementById("button");
    button.addEventListener("click", () => {
        $(".my_audio").trigger('play');
    });
}

const findMyState=()=>{
    const status = document.querySelector('.status');

    const success = (position) =>{
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude + ", "+longitude);

        const geoApiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtitude}&localityLanguage=en'
        
        fetch(geoApiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            status.textContent = "Stores near: " + data.locality
        })
    }

    const error = () =>{
        status.textContent = "WE STILL KNOW WHERE YOU AT";
    }

    var button = document.getElementById("button");
    button.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition(success, error);
    });

}

const fontSizeSlider = document.getElementById('myRange1');
fontSizeSlider.addEventListener('input', function () {
    document.documentElement.style.setProperty('--section-title-font-size', this.value + '2px');
    document.documentElement.style.setProperty('--medium-class-font-size', this.value + '1px');
    document.documentElement.style.setProperty('--small-class-font-size', this.value + '0.25px');
    inputSearch.style.fontSize = Math.min(24, maxFontSize) + 'px';
});

// search bar logics
const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const suggestionsList = document.getElementById('suggestions');

        // Sample data for word suggestions
        const words = ['Apple', 'Assorted Cupcakes', 'Baked Goods', 'Cheese', 'Milk', 'Large X Eggs', 'Organic Brocoli', 'Organic Mushrooms', 'Plum Roma Tomatoes', 'Pie', 'Rhubard  Strawberry', 'Watermelon Seedless', 'Squash'];

        // Event listener for input changes
        searchInput.addEventListener('input', () => {
            const inputValue = searchInput.value.toLowerCase();
            const filteredWords = words.filter(word => word.toLowerCase().startsWith(inputValue));
            displaySuggestions(filteredWords);
        });

        // Display suggestions in the list
        function displaySuggestions(suggestions) {
            suggestionsList.innerHTML = '';
            if (suggestions.length === 0) {
                const li = document.createElement('li');
                li.textContent = 'No search results found';
                suggestionsList.appendChild(li);
            } else {
                suggestions.forEach(suggestion => {
                    const li = document.createElement('li');
                    li.textContent = suggestion;
                    li.addEventListener('click', () => {
                        searchInput.value = suggestion;
                        suggestionsList.style.display = 'none';
                    });
                    suggestionsList.appendChild(li);
                });
            }
            suggestionsList.style.display = 'block';
        }

        // Event listener for search button
        searchButton.addEventListener('click', () => {
            const query = searchInput.value;
            // Implement your search functionality here
            console.log(`Searching for: ${query}`);
            if (!words.includes(query.toLowerCase())) {
                console.log('No search results found');
                displaySuggestions([]);
            } else {
                window.location.href = `=${encodeURIComponent(query)}`;
            }
        });