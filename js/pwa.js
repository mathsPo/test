const conteneur_boutton = document.getElementById("button_install");
const buttonInstall = document.getElementById("button");

let deferredPrompt = 10;

function showInstallPromotion(){
    buttonInstall.classList.remove('hidden');
}

function hideInstallPromotion(){
    buttonInstall.classList.add('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
    showInstallPromotion();
    e.preventDefault();
    deferredPrompt = e;
    console.log(deferredPrompt);
    console.log('L\'evenement beforeinstallprompt a ete declenché');
})

buttonInstall.addEventListener('click', async () => {
    hideInstallPromotion();
    console.log(deferredPrompt);
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt = null;
});
