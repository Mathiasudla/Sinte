export async function loadComponent(containerId, file) {

    const response = await fetch(file);

    const html = await response.text();

    document.getElementById(containerId).innerHTML = html;

}