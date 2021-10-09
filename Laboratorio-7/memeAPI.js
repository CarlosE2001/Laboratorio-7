const IMG_CONTAINER = "#container";
const INPUT = "#search";
const SUGGEST = "#suggest";



class Meme {
    constructor(id, name, img) {
        this.id = id;
        this.name = name;
        this.img = img;
    }
}


async function main() {
    document.querySelector(INPUT).addEventListener("keyup", updatePlaceholder)

}

async function getMemes() {
    const BASE_URL = "https://api.imgflip.com/get_memes"
    let data = null;
    try {
        const response = await fetch(BASE_URL);
        data = await response.json()
    } catch (error) {
        console.log(error);
    }
    console.log(data.data.memes[0]);
    return data;
}

async function updatePlaceholder() {
    const data = await getMemes()
    let search = document.querySelector(INPUT);
    let suggest = document.querySelector(SUGGEST);
    let searchValue = search.value;
    console.log(data.data.memes.length)
    memes = []
    for (let i = 0; i < data.data.memes.length; i++) {

        meme = match(searchValue, data.data.memes[i]);

        if (meme != null) {
            memes.push(meme);
        }
    }
    suggest.innerHTML = memes[0].name;
    showIMG(memes)
}

function match(name, meme) {
    let memeId = meme.id;
    let memeName = meme.name;
    let memeImg = meme.url;

    if (memeName.toLowerCase().includes(name)) {
        return new Meme(memeId, memeName, memeImg);
    }
    return null;
}

function showIMG(memes) {
    let container = document.querySelector(IMG_CONTAINER);
    clear(container);
    for (let i = 0; i < memes.length; i++) {
        let img = document.createElement("img");
        img.src = memes[i].img;
        container.appendChild(img);
    }
}

const clear = section => section.innerHTML = "";

main()