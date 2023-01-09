document.getElementById("form").addEventListener('submit', function(q) {
    q.preventDefault()

    console.log("test")
    let auther = document.getElementById('auther_input').value
    let title = document.getElementById("title_input").value
    console.log (auther, title)

    const data = {title, auther}
    book_array.push(data)
    console.log(book_array)

    let div = document.createElement("div")
    div.style.borderBottom = "solid"
    div.style.borderWidth = "1px"
    div.style.paddingBottom = "5px"
    let auther_title = document.createElement('p')
    auther_title.innerHTML = title + "<br>" + auther
    
    let del_button = document.createElement("button")
    del_button.innerHTML = "delete"
    div.appendChild(auther_title)
    div.appendChild(del_button)
    del_button.addEventListener('click', function() {
        div.remove()
    })
    document.getElementById('elements').appendChild(div)
})

let book_array = []
