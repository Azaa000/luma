const images = document.getElementById("images")

const main = async() => {
    const response = await fetch("https://api.unsplash.com/photos/?page=1",{
        headers: {
            Authorization: "client-ID ZTp78Axj9Q0IbdXm0WE_0xwRvH2rFLvCOSSs8WVGpoQ",
        }
    })

    const result = await response.json()
    result.forEach((photo) => {
        const id = photo.id;
        const imageUrl = photo.urls.full;

        ImageTrackList.innerHtml += `
        <img src"${imageUrl}" alt="${id}"/>
        `;
    });
};

main();