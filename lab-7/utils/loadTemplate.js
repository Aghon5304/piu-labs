export default async function loadTemplate(path) {
    const response = await fetch(path);
    const html = await response.text();
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
}