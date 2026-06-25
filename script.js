document.getElementById("generateBtn").addEventListener("click", function() {
    
    // 1. User Inputs
    let subject = document.getElementById("subject").value.trim() || "A highly detailed and captivating character/scene";
    let refImage = document.getElementById("refImageUrl").value.trim();
    let isStrict = document.getElementById("strictConsistency").checked;
    
    let artStyle = document.querySelector("select:nth-of-type(1)").value; 
    let lighting = document.querySelector("select:nth-of-type(2)").value; 

    // 2. Pro-Level Prompt Layers Builder
    let promptParts = [];

    // Layer A: Main Subject (Clear and descriptive)
    promptParts.push(`/imagine prompt: A breathtaking, award-winning masterpiece of ${subject}.`);

    // Layer B: Facial Consistency (Aapka custom rule)
    if (refImage !== "") {
        let consistencyLayer = `[Reference Image: ${refImage}]`;
        if (isStrict) {
            consistencyLayer += ` Prioritize the facial features from the provided reference image. Maintain the subject's identity accurately while only adapting the pose, lighting, and background. Do not alter the core facial structure.`;
        }
        promptParts.push(consistencyLayer);
    }

    // Layer C: Core Art Style & Environment
    promptParts.push(`The visual aesthetic is strictly defined by: ${artStyle}. The environment is incredibly immersive and deeply atmospheric.`);

    // Layer D: Lighting & Shadow Play (Depth ke liye)
    promptParts.push(`Lighting setup: ${lighting}. Enhanced with global illumination, ray-traced reflections, ambient occlusion, and perfect shadow contrast.`);

    // Layer E: Camera Specs & Textures (Yeh real detail add karta hai)
    promptParts.push(`Cinematography details: Shot with hyper-precision, ultra-sharp focus, immense depth of field. Intricate micro-details, highly textured surfaces, subsurface scattering (SSS) for realistic light absorption.`);

    // Layer F: Rendering Engine & Quality Boosters (The AI cheat codes)
    promptParts.push(`Rendered in Unreal Engine 5 and Octane Render, 8k resolution, HDR, pristine quality, trending on ArtStation, CGSociety, masterpiece, epic composition, dramatic color grading.`);

    // Layer G: Negative Prompt (AI ko kya NAHI banana hai - extra pro touch)
    promptParts.push(`--no blurry, deformed, poorly drawn, extra limbs, low resolution, bad anatomy, watermarks, text, cartoonish, oversaturated.`);

    // 3. Sabko ek lamba paragraph banana (har part ke baad ek space)
    let finalMasterPrompt = promptParts.join(" ");

    // 4. Output box mein print karna
    document.querySelector("textarea").value = finalMasterPrompt;
});

// Copy Button Function
document.getElementById("copyBtn").addEventListener("click", function() {
    let outputText = document.querySelector("textarea");
    outputText.select();
    document.execCommand("copy");
    
    // Copy hone par button ka text change karna
    let originalText = this.innerText;
    this.innerText = "Copied! ✅";
    setTimeout(() => {
        this.innerText = originalText;
    }, 2000);
});
