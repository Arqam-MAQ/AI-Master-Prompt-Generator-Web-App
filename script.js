// 1. Array of random ideas for "Surprise Me" button
const randomSubjects = [
    "A rogue ninja with blazing red eyes performing hand signs in a dark forest",
    "A high-tech armored superhero flying through a neon-lit futuristic city",
    "A futuristic samurai walking in the rain",
    "A glowing chakra aura surrounding a fierce warrior",
    "An intricate mechanical dragon breathing blue fire"
];

// 2. Elements Selections
const subjectInput = document.getElementById("subject");
const refImageInput = document.getElementById("refImageUrl");
const strictCheck = document.getElementById("strictConsistency");
const artStyleSelect = document.getElementById("artStyle");
const lightingSelect = document.getElementById("lighting");
const cameraSelect = document.getElementById("cameraAngle");
const aspectRatioSelect = document.getElementById("aspectRatio");
const negativeInput = document.getElementById("negativePrompt");
const outputArea = document.getElementById("outputArea");
const historyList = document.getElementById("historyList");

// Load history on startup
let promptHistory = JSON.parse(localStorage.getItem("aiPromptHistory")) || [];
updateHistoryUI();

// 3. Generate Logic
document.getElementById("generateBtn").addEventListener("click", function() {
    let subject = subjectInput.value.trim() || "A captivating character masterpiece";
    let refImage = refImageInput.value.trim();
    let isStrict = strictCheck.checked;
    let artStyle = artStyleSelect.value; 
    let lighting = lightingSelect.value;
    let camera = cameraSelect.value;
    let aspect = aspectRatioSelect.value;
    let customNegative = negativeInput.value.trim();

    let promptParts = [];

    promptParts.push(`/imagine prompt: A breathtaking masterpiece of ${subject}.`);

    if (refImage !== "") {
        let consistencyLayer = `[Reference Image: ${refImage}]`;
        if (isStrict) {
            consistencyLayer += ` Prioritize the facial features from the provided reference image. Maintain the subject's identity accurately while only adapting the pose, lighting, and background. Do not alter the core facial structure.`;
        }
        promptParts.push(consistencyLayer);
    }

    promptParts.push(`Visual aesthetic: ${artStyle}. Shot type: ${camera}.`);
    promptParts.push(`Lighting: ${lighting}. Enhanced with global illumination and ambient occlusion.`);
    promptParts.push(`Rendered in Unreal Engine 5, 8k resolution, highly detailed, trending on ArtStation.`);
    
    // Negative Prompt combination
    let baseNegative = "blurry, deformed, poorly drawn, extra limbs, low resolution, bad anatomy, text, watermarks";
    let finalNegative = customNegative ? `${baseNegative}, ${customNegative}` : baseNegative;
    promptParts.push(`--no ${finalNegative}`);
    
    // Aspect Ratio at the very end
    promptParts.push(aspect);

    let finalMasterPrompt = promptParts.join(" ");
    outputArea.value = finalMasterPrompt;

    // Save to History
    saveToHistory(finalMasterPrompt);
});

// 4. Quick Presets Logic
document.getElementById("presetAnime").addEventListener("click", () => {
    artStyleSelect.selectedIndex = 1; // Anime style
    lightingSelect.selectedIndex = 1; // Dramatic rim light
    cameraSelect.selectedIndex = 2; // Low angle hero
});

document.getElementById("presetSciFi").addEventListener("click", () => {
    artStyleSelect.selectedIndex = 2; // Cyberpunk
    lightingSelect.selectedIndex = 2; // Neon glow
    cameraSelect.selectedIndex = 0; // Medium shot
});

// 5. Surprise Me Logic
document.getElementById("surpriseBtn").addEventListener("click", () => {
    let randomSubj = randomSubjects[Math.floor(Math.random() * randomSubjects.length)];
    subjectInput.value = randomSubj;
    artStyleSelect.selectedIndex = Math.floor(Math.random() * artStyleSelect.options.length);
    lightingSelect.selectedIndex = Math.floor(Math.random() * lightingSelect.options.length);
    cameraSelect.selectedIndex = Math.floor(Math.random() * cameraSelect.options.length);
});

// 6. Copy Button Logic
document.getElementById("copyBtn").addEventListener("click", function() {
    outputArea.select();
    document.execCommand("copy");
    let originalText = this.innerText;
    this.innerText = "Copied! ✅";
    setTimeout(() => { this.innerText = originalText; }, 2000);
});

// 7. History Functions
function saveToHistory(promptText) {
    promptHistory.unshift(promptText); // Naya prompt sabse upar
    if (promptHistory.length > 3) promptHistory.pop(); // Sirf last 3 save rakho
    localStorage.setItem("aiPromptHistory", JSON.stringify(promptHistory));
    updateHistoryUI();
}

function updateHistoryUI() {
    historyList.innerHTML = "";
    promptHistory.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.substring(0, 50) + "..."; // Chhota preview dikhao
        li.style.cursor = "pointer";
        li.style.fontSize = "0.9em";
        li.style.color = "#888";
        li.style.marginBottom = "5px";
        // Click karne par history se wapas load ho jaye
        li.addEventListener("click", () => { outputArea.value = item; });
        historyList.appendChild(li);
    });
}
