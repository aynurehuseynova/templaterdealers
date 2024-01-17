const cartslist = document.getElementById('wishList');


function wishList() {
    cartslist.innerHTML = ``
    let box = JSON.parse(localStorage.getItem('box')) || []
    box.map((item, index) => {
        const box = document.createElement('div')
        box.className = "box"
        box.innerHTML = `
        <img src="${item.image}" style="max-width: 250px;min-height: 100px;" alt="">
        <p>${item.title}</p>
        <p>${item.price}</p>
        <button class="btn" onclick="removeItem(${index})">Remove from box</button> 
    `
    cartslist.appendChild(box)
    })

}

function removeItem(index) {
    let box = JSON.parse(localStorage.getItem('box')) || []
    box.splice(index, 1)
    localStorage.setItem('box', JSON.stringify(box))
    wishList()
}
window.onload = () => {
    wishList()
}