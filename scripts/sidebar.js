(async function () {

    // Obtener la ubicación de este script
    const scriptURL = document.currentScript.src;

    // Obtener la raíz del proyecto
    const projectRoot = new URL("../", scriptURL);

    // Obtener la ruta del sidebar
    const sidebarURL = new URL(
        "sidebar.html",
        projectRoot
    );

    // Cargar el HTML del sidebar
    try {

        const response = await fetch(sidebarURL);

        if (!response.ok) {
            throw new Error("Could not load sidebar.html");
        }

        const html = await response.text();

        // Insertar el sidebar
        const sidebar = document.querySelector("sidebar");

        if (!sidebar) {
            throw new Error("Sidebar element not found");
        }

        sidebar.outerHTML = html;

        // Obtener el nuevo sidebar
        const loadedSidebar = document.querySelector("sidebar");

        // Corregir las rutas de los enlaces
        loadedSidebar.querySelectorAll("a[href]").forEach(link => {

            const href = link.getAttribute("href");

            // Ignorar enlaces externos, anclas y protocolos especiales
            if (
                href.startsWith("#") ||
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:") ||
                href.startsWith("//")
            ) {
                return;
            }

            link.href = new URL(href, projectRoot).href;

        });

        // Corregir las rutas de las imágenes
        loadedSidebar.querySelectorAll("img[src]").forEach(img => {

            const src = img.getAttribute("src");

            img.src = new URL(src, projectRoot).href;

        });

        // Generar logo aleatorio
        const randomLogo = Math.floor(Math.random() * 3) + 1;

        const logo = loadedSidebar.querySelector("#logo-image");

        logo.src = new URL(
            `images/REBIRTH_Logo_${randomLogo}.png`,
            projectRoot
        ).href;

    } catch (error) {

        console.error("Sidebar error:", error);

    }

})();