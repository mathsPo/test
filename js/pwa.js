const conteneur_boutton = document.getElementById("button_install");
const buttonInstall = document.getElementById("button");

let deferredPrompt = 10;

function showInstallPromotion(){
    conteneur_boutton.classList.remove('hidden');
}

function hideInstallPromotion(){
    conteneur_boutton.classList.add('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log(deferredPrompt);
   showInstallPromotion();
})

buttonInstall.addEventListener('click', async () => {
    hideInstallPromotion();
    console.log(deferredPrompt);
    deferredPrompt.prompt('Installer la PWA ?');
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
});
