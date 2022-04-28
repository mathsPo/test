const conteneur_boutton = document.getElementById("button_install");
const buttonInstall = document.getElementById("button");

let deferredPrompt;

function showInstallPromotion(){
    buttonInstall.classList.remove('hidden');
}

function hideInstallPromotion(){
    buttonInstall.classList.add('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('L\'evenement beforeinstallprompt a ete declenché');
    showInstallPromotion();  
})

buttonInstall.addEventListener('click', async () => {
    hideInstallPromotion();
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
});
