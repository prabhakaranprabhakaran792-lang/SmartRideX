// ===============================
// TransitX - script.js Part 1
// ===============================

// Login

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "admin" && password === "1234") {

            localStorage.setItem("transitxLogin", "true");

            window.location.href = "tracking.html";

        } else {

            alert("Invalid Username or Password");

        }

    });

}

// Check Login

if (window.location.pathname.includes("tracking.html")) {

    if (localStorage.getItem("transitxLogin") !== "true") {

        window.location.href = "index.html";

    }

}

function logout() {

    localStorage.removeItem("transitxLogin");

    window.location.href = "index.html";

}

// ===============================
// Leaflet Map
// ===============================

let map;
let userMarker;
let busMarker;

if (document.getElementById("map")) {

    map = L.map("map").setView([11.0168, 76.9558], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"

    }).addTo(map);

    busMarker = L.marker([11.018, 76.958])
        .addTo(map)
        .bindPopup("🚌 TransitX Bus")
        .openPopup();

    getCurrentLocation();

}

function getCurrentLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation not supported");

        return;

    }

    navigator.geolocation.getCurrentPosition(function (position) {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (userMarker) {

            map.removeLayer(userMarker);

        }

        userMarker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup("📍 Your Location");

        map.setView([lat, lng], 14);

        document.getElementById("currentLocation").innerHTML =
            lat.toFixed(5) + ", " + lng.toFixed(5);

    });

}
// ===============================
// TransitX - script.js Part 2
// ===============================

// Refresh Current Location
function refreshLocation() {
    getCurrentLocation();
}

// Route Search
function searchRoute() {

    const source = document.getElementById("source").value.trim();
    const destination = document.getElementById("destination").value.trim();

    if (source === "" || destination === "") {
        alert("Please enter Source and Destination");
        return;
    }

    document.getElementById("destinationName").innerHTML = destination;

    // Demo ETA
    const eta = Math.floor(Math.random() * 15) + 5;

    document.getElementById("eta").innerHTML = eta + " Minutes";
    document.getElementById("arrivalTime").innerHTML = eta + " Minutes";

    alert(
        "Route Found!\n\n" +
        "From : " + source +
        "\nTo : " + destination +
        "\nETA : " + eta + " Minutes"
    );
}

// Bus Animation
let busLat = 11.0180;
let busLng = 76.9580;

setInterval(() => {

    if (!busMarker) return;

    busLat += 0.0004;
    busLng += 0.0003;

    busMarker.setLatLng([busLat, busLng]);

}, 3000);
// ===============================
// TransitX - script.js Part 3
// Final Enhancements
// ===============================

// Smooth Map Focus Helper
function focusOnUser() {
    if (userMarker) {
        const pos = userMarker.getLatLng();
        map.setView([pos.lat, pos.lng], 15);
    }
}

// Smooth Bus Focus Helper
function focusOnBus() {
    if (busMarker) {
        const pos = busMarker.getLatLng();
        map.setView([pos.lat, pos.lng], 15);
    }
}

// Click map to set fake destination (for demo)
let destinationMarker;

if (map) {

    map.on("click", function (e) {

        const { lat, lng } = e.latlng;

        if (destinationMarker) {
            map.removeLayer(destinationMarker);
        }

        destinationMarker = L.marker([lat, lng])
            .addTo(map)
            .bindPopup("📍 Destination Selected")
            .openPopup();

        document.getElementById("destinationName").innerHTML =
            lat.toFixed(4) + ", " + lng.toFixed(4);

        // fake ETA based on distance
        let distance = Math.sqrt(
            Math.pow(lat - busLat, 2) +
            Math.pow(lng - busLng, 2)
        );
document.getElementById("occupancy").innerHTML = Math.floor(Math.random() * 40 + 60) + "%";
        let eta = Math.max(5, Math.floor(distance * 1500));

        document.getElementById("eta").innerHTML = eta + " Minutes";
        document.getElementById("arrivalTime").innerHTML = eta + " Minutes";
        const alerts = [
    "✅ Bus is running on time.",
    "⚠️ Traffic ahead. Delay: 5 mins.",
    "🚧 Road work. Delay: 10 mins.",
    "🟢 Route is clear."
];

document.getElementById("alertMessage").innerHTML =
    alerts[Math.floor(Math.random() * alerts.length)];

    });

}
// Auto update current location text every 10 sec
setInterval(() => {

    if (userMarker) {
        const pos = userMarker.getLatLng();

        document.getElementById("currentLocation").innerHTML =
            "Lat: " + pos.lat.toFixed(5) + "<br>Lng: " + pos.lng.toFixed(5);
    }

}, 10000);

// Keyboard shortcut (demo feature)
document.addEventListener("keydown", (e) => {

    // F key → focus user
    if (e.key === "f") {
        focusOnUser();
    }

    // B key → focus bus
    if (e.key === "b") {
        focusOnBus();
    }

});
function updateClock() {
    const now = new Date();

    document.getElementById("liveClock").innerHTML =
        now.toLocaleTimeString();

    document.getElementById("liveDate").innerHTML =
        now.toDateString();
}

function updateClock() {
    const clock = document.getElementById("liveClock");
    const date = document.getElementById("liveDate");

    if (!clock || !date) return;

    const now = new Date();

    clock.innerHTML = now.toLocaleTimeString();
    date.innerHTML = now.toDateString();
}

setInterval(updateClock, 1000);
window.onload = updateClock;
let seats = 25;

setInterval(function () {
    if (document.getElementById("seatCount")) {

        seats--;

        if (seats < 10) {
            seats = 25;
        }

        document.getElementById("seatCount").innerHTML = seats + " / 40";
        document.getElementById("seatFill").style.width = (seats / 40 * 100) + "%";
    }
}, 5000);
const temps = [30,31,32,33,34,35];
let tempIndex = 0;

setInterval(() => {
    const temp = document.getElementById("temp");

    if(temp){
        temp.innerHTML = temps[tempIndex] + "°C";
        tempIndex = (tempIndex + 1) % temps.length;
    }
},4000);
function calculateFare() {
    let fare = Math.floor(Math.random() * 20) + 20; // ₹20 - ₹39
    document.getElementById("fare").innerHTML = "₹ " + fare;
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const btn = document.getElementById("darkBtn");

    if (document.body.classList.contains("dark-mode")) {
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}