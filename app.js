document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file");
    const uploadedImage = document.getElementById("uploadedImage");
    const header = document.querySelector(".header");
    const btnAccept = document.querySelector(".accept");
    const btnDownload = document.querySelector(".download"); // Bouton pour le téléchargement
    
    if (!fileInput.files[0] || !fileInput.files[0].type.startsWith("image/")) {
        btnAccept.style.backgroundColor = "gray";
        btnAccept.style.cursor = "not-allowed";
    }
    fileInput.addEventListener("change", function() {

        const file = this.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            btnAccept.style.backgroundColor = "rgb(79, 116, 252)";
            btnAccept.style.cursor = "pointer";
            btnAccept.disabled = false
            reader.onload = function(event) {
                const imageUrl = event.target.result;
                uploadedImage.src = imageUrl; // Définir le src de l'image téléchargée
                uploadedImage.style.display = "block"; // Le rendre visible

                };
            
            reader.readAsDataURL(file);
        } else {
            uploadedImage.style.display = "none"; // Cacher si fichier invalide
        }
    });

    btnAccept.addEventListener('click', () => {
        // Ajoutez votre logique ici si nécessaire
    });

    btnDownload.addEventListener('click', () => {
        html2canvas(header).then(canvas => { // Capturez uniquement le header
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png'); // ou 'image/jpeg'
            link.download = 'header_screenshot.png'; // Nom du fichier à télécharger
            link.click(); // Simulez un clic pour démarrer le téléchargement
        });
    });
});
