const randomLogo = Math.floor(Math.random() * 3) + 1;

document.getElementById("logo-image").src =
    `../images/REBIRTH_Logo_${randomLogo}.png`;