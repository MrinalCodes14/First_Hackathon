const reports = () => JSON.parse(localStorage.getItem("civicReports") || "[]");

function showNotifications() {
    const count = reports().length;
    alert(count ? `You have ${count} report${count === 1 ? "" : "s"} saved on this device.` : "You have no reports yet.");
}

function getUserLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        p => alert(`Your location was found!\n\nLatitude: ${p.coords.latitude.toFixed(6)}\nLongitude: ${p.coords.longitude.toFixed(6)}`),
        () => alert("Unable to get your location.")
    );
}
function updateDashboard() {
    const list = reports();
    const set = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };
    set("totalReports", list.length);
    set("reportedCount", list.filter(r => r.status === "Reported").length);
    set("reviewCount", list.filter(r => r.status === "Under Review").length);
    set("progressCount", list.filter(r => r.status === "In Progress").length);
    set("resolvedCount", list.filter(r => r.status === "Resolved").length);
    ["Pothole", "Garbage", "Streetlight", "Water Leakage", "Road Damage", "Others"].forEach(c => {
        const el = document.getElementById("cat-" + c);
        if (el) el.textContent = list.filter(r => r.category === c).length;
    });
}
function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));
}

function renderRecentIssues() {
    const box = document.getElementById("recentIssues");
    if (!box) return;
    const list = reports();
    if (!list.length) {
        box.innerHTML = `<div style="padding:20px;text-align:center;color:#68747e">No reports yet. <a href="report.html" style="color:#299e65;font-weight:bold">Report an issue</a></div>`;
        return;
    }
    box.innerHTML = list.slice(0, 4).map(r => `
<div class="issue" style="cursor:pointer" onclick="showIssue('${escapeHtml(r.category)}','${escapeHtml(r.description)}','${escapeHtml(r.status)}')">
<div class="issue-image">${iconFor(r.category)}</div>
<div class="issue-info">
<h3>${escapeHtml(r.description || r.category + " issue")}</h3>
<p>📍 ${escapeHtml(r.address)}</p>
<small>${escapeHtml(r.createdAt)}</small>
</div>
<span class="status">${escapeHtml(r.status)}</span>
</div>
`).join("");
}

function showIssue(category, description, status) {
    alert(`Category: ${category}\nIssue: ${description}\nStatus: ${status}`);
}

function iconFor(category) {
    const icons = {
        "Pothole": "🕳️",
        "Garbage": "🗑️",
        "Streetlight": "💡",
        "Water Leakage": "💧",
        "Road Damage": "🛣️",
        "Others": "•••"
    };
    return icons[category] || "📍";
}
document.addEventListener("DOMContentLoaded", () => {
    const current = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === current) link.classList.add("active");
    });

    const notification = document.getElementById("notificationButton");
    if (notification) notification.addEventListener("click", showNotifications);

    document.querySelectorAll(".category-card").forEach(card => {
        card.addEventListener("click", () => {
            const category = card.dataset.category;
            location.href = "issuesmap.html?category=" + encodeURIComponent(category);
        });
    });

    const zoomIn = document.querySelector('[data-zoom="in"]');
    const zoomOut = document.querySelector('[data-zoom="out"]');
    const map = document.getElementById("homeMap");
    let scale = 1;

    if (zoomIn && map) {
        zoomIn.onclick = () => {
            scale = Math.min(scale + 0.1, 1.5);
            map.style.transform = `scale(${scale})`;
        };
    }
    if (zoomOut && map) {
        zoomOut.onclick = () => {
            scale = Math.max(scale - 0.1, 0.7);
            map.style.transform = `scale(${scale})`;
        };
    }
    const locate = document.getElementById("locateHome");
    if (locate) locate.onclick = getUserLocation;

    updateDashboard();
    renderRecentIssues();
});
const map=L.map("homeMap").setView([28.6139,77.2090],13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
L.marker([28.6139,77.2090]).addTo(map).bindPopup("Civic issue location");