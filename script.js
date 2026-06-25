function generatePrompt() {
    const subject = document.getElementById('subject').value || "A highly detailed subject";
    const refImage = document.getElementById('refImage').value;
    const style = document.getElementById('style').value;
    const lighting = document.getElementById('lighting').value;
    const isStrictFace = document.getElementById('strictFace').checked;

    let promptArr = [];

    // Add Reference Image if provided
    if (refImage) {
        promptArr.push(`${refImage}`);
    }

    // Add Subject
    promptArr.push(subject);

    // Add Strict Facial Consistency Rule if checked and ref image exists
    if (isStrictFace && refImage) {
        promptArr.push("Prioritize the facial features from the provided reference image. Maintain the subject's identity accurately while only adapting the pose, lighting, and background. Do not alter the core facial structure.");
    }

    // Add Style and Lighting
    promptArr.push(style);
    promptArr.push(lighting);

    // Combine everything with commas
    const finalPrompt = promptArr.join(", ");
    
    // Display in output box
    document.getElementById('outputBox').value = finalPrompt;
}

function copyToClipboard() {
    const outputBox = document.getElementById('outputBox');
    if(outputBox.value === "") return;
    
    outputBox.select();
    document.execCommand("copy");
    
    // Quick feedback
    const btn = document.querySelector('.secondary-btn');
    btn.innerText = "✅ Copied!";
    setTimeout(() => {
        btn.innerText = "📋 Copy to Clipboard";
    }, 2000);
}
