async function main() {
    // Cada vez que se presiona una tecla en la barra de búsqueda, se hace la búsqueda
    let input = document.getElementById("search")
    input.addEventListener("keyup", search);

    // Mostramos la data en la pantalla
    displayData(data);
}


async function getData(value) {
    const BASE_URL = "https://api.tvmaze.com/search/shows?q="
    const url = `${BASE_URL}${value}`;
    let data = null;
    try {
        const response = await fetch(url)
        data = await response.json()
    } catch (error) {
        console.log(`Algo ha fallado: ${error.message}`)
    }
    console.log(data[0].show.name);
    return data
}
/**
* Itera un arreglo de datos y construye una lista que muestra su contenido en
la pantalla
* cada elemento agregado se le agrega un id que es el id de cada objeto (dato)
dentro del arreglo
*/
function displayData(data) {
    let display = "";
    for (let i = 0; i < data.length; i++) {
        display += `
        <ul id="${data[i].show.id}">
            <li> <strong> Title: </strong> ${data[i].show.name}</li>
            <li><a href="${data[i].show.url}">Link</a></li>
        </ul>`
    }
    document.getElementById("data").innerHTML = display;
}
/**
 * Function que se pasa como callback el keyup del textarea search
 */
async function search() {
    let text = document.getElementById("search").value;
    let data = await getData(text);
    displayData(data);
}
// Punto de entrada para desencadenar lógica
main();