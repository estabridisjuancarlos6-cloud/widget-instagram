const FEED_URL = "https://rss.app/feeds/v1.1/YZ0lA6yFshF9Sx7R.json";
let currentIndex = 0;
let posts = [];

async function cargarFeed() {
    try {
        const res = await fetch(FEED_URL);
        const data = await res.json();
        posts = data.items || [];
        mostrarPost();
        setInterval(mostrarPost, 15000);
    } catch (e) {
        console.error("Error al cargar el feed:", e);
    }
}

function mostrarPost() {
    if (posts.length === 0) return;

    const post = posts[currentIndex];
    const captionElement = document.querySelector(".caption");
    const imgElement = document.querySelector(".feed-image img");

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = post.content_html;

    // ✅ PRIMER PÁRRAFO REAL (RSS APP FRIENDLY)
    const fullText = tempDiv.innerText || "";
    const text = fullText
        .split(/\n\s*\n/)
        .shift()
        .trim();

    const imgTag = tempDiv.querySelector("img");
    const imgSrc = imgTag ? imgTag.src : "";

    const feedContainer = document.getElementById("feed");
    feedContainer.classList.remove("visible");
    feedContainer.classList.add("fade");

    setTimeout(() => {
        captionElement.innerText = text;
        imgElement.src = imgSrc
            ? `https://images.weserv.nl/?url=${encodeURIComponent(imgSrc)}`
            : "";
        feedContainer.classList.remove("fade");
        feedContainer.classList.add("visible");
    }, 800);

    currentIndex = (currentIndex + 1) % posts.length;
}

cargarFeed();