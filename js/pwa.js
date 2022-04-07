const conteneur_boutton = document.getElementById("button_install");
const buttonInstall = document.getElementById("button");

let deferredPrompt;

function showInstallPromotion(){
    conteneur_boutton.classList.remove('hidden');
}

function hideInstallPromotion(){
    conteneur_boutton.classList.add('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
})

buttonInstall.addEventListener('click', async () => {
    hideInstallPromotion();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
});
