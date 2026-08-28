// ==========================================
// CIVICFIX - HOMEPAGE JAVASCRIPT
// ==========================================


// ==========================================
// 1. REPORT ISSUE BUTTON
// ==========================================

const reportButtons = document.querySelectorAll(
    ".primary-btn, .hero-buttons .primary-btn"
);

reportButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("Report Issue page will open here.");

        // Later:
        // window.location.href = "report.html";

    });

});


// ==========================================
// 2. VIEW ISSUES MAP BUTTON
// ==========================================

const mapButtons = document.querySelectorAll(
    ".secondary-btn, .map-header button"
);

mapButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("Issues Map will open here.");

        // Later:
        // window.location.href = "map.html";

    });

});


// ==========================================
// 3. LOGIN BUTTON
// ==========================================

const loginButton = document.querySelector(".login-btn");

if (loginButton) {

    loginButton.addEventListener("click", function () {

        alert("Login page will open here.");

        // Later:
        // window.location.href = "login.html";

    });

}


// ==========================================
// 4. SIGN UP BUTTON
// ==========================================

const signupButton = document.querySelector(".signup-btn");

if (signupButton) {

    signupButton.addEventListener("click", function () {

        alert("Registration page will open here.");

        // Later:
        // window.location.href = "register.html";

    });

}


// ==========================================
// 5. NOTIFICATION BUTTON
// ==========================================

const notificationButton =
    document.querySelector(".notification");

if (notificationButton) {

    notificationButton.addEventListener("click", function () {

        alert("You have no new notifications.");

    });

}


// ==========================================
// 6. CATEGORY CARDS
// ==========================================

const categoryCards =
    document.querySelectorAll(".category-card");

categoryCards.forEach(card => {

    card.addEventListener("click", function () {

        const categoryName =
            card.querySelector("h3").textContent;

        console.log("Selected category:", categoryName);

        alert(
            "You selected: " + categoryName
        );

        // Later:
        // window.location.href =
        // "report.html?category=" +
        // encodeURIComponent(categoryName);

    });

});


// ==========================================
// 7. MAP MARKERS
// ==========================================

const markers =
    document.querySelectorAll(".marker");

markers.forEach((marker, index) => {

    marker.addEventListener("click", function () {

        const issues = [
            "Pothole reported near Main Street",
            "Garbage reported near Block A",
            "Streetlight problem near Library",
            "Water leakage reported",
            "Road damage reported"
        ];

        alert(
            issues[index] ||
            "Civic issue reported here."
        );

    });

});


// ==========================================
// 8. MAP ZOOM BUTTONS
// ==========================================

const mapControls =
    document.querySelectorAll(".map-controls button");

let mapScale = 1;


// Zoom In

if (mapControls[0]) {

    mapControls[0].addEventListener("click", function () {

        mapScale += 0.1;

        document.querySelector(".map").style.transform =
            `scale(${mapScale})`;

    });

}


// Zoom Out

if (mapControls[1]) {

    mapControls[1].addEventListener("click", function () {

        if (mapScale > 0.7) {

            mapScale -= 0.1;

            document.querySelector(".map").style.transform =
                `scale(${mapScale})`;

        }

    });

}


// Location button

if (mapControls[2]) {

    mapControls[2].addEventListener("click", function () {

        getUserLocation();

    });

}


// ==========================================
// 9. GET USER LOCATION
// ==========================================

function getUserLocation() {

    if (!navigator.geolocation) {

        alert(
            "Geolocation is not supported by your browser."
        );

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);


            alert(
                "Your location found!\n\n" +
                "Latitude: " + latitude +
                "\nLongitude: " + longitude
            );


            // Later:
            // Send this location to Flask
            // and save it in MongoDB.

        },


        function (error) {

            console.log(error);

            alert(
                "Unable to get your location."
            );

        }

    );

}


// ==========================================
// 10. RECENT ISSUE - VIEW ALL
// ==========================================

const viewAllButtons =
    document.querySelectorAll(".section-heading button");

viewAllButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert(
            "All reported issues will appear here."
        );

        // Later:
        // window.location.href = "issues.html";

    });

});


// ==========================================
// 11. RECENT ISSUE CLICK
// ==========================================

const issues =
    document.querySelectorAll(".issue");

issues.forEach(issue => {

    issue.addEventListener("click", function () {

        const title =
            issue.querySelector("h3").textContent;

        const status =
            issue.querySelector(".status").textContent;

        alert(
            "Issue: " + title +
            "\nStatus: " + status
        );

    });

});


// ==========================================
// 12. NAVIGATION
// ==========================================

const navigationLinks =
    document.querySelectorAll("nav a");

navigationLinks.forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();


        // Remove active class

        navigationLinks.forEach(item => {

            item.classList.remove("active");

        });


        // Add active class to clicked link

        link.classList.add("active");


        console.log(
            "Navigation:",
            link.textContent
        );

    });

});


// ==========================================
// 13. PAGE LOADED
// ==========================================

console.log(
    "CivicFix website loaded successfully! 🚀"
);