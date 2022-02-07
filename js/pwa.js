const conteneur_boutton = document.getElementById("button_install");
const buttonInstall = document.getElementById("button");

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

function showInstallPromotion(){
    conteneur_boutton.classList.remove('hidden');
}

function hideInstallPromotion(){
    conteneur_boutton.classList.add('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
})

buttonInstall.addEventListener('click', async () => {
    // Hide the app provided install promotion
    hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choiceyyyyyy
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
});
