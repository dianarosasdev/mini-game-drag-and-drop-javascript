const images = document.querySelectorAll('.image-item')
const articleBoxes = document.querySelectorAll('.article-box')
let scoreRightDisplay = document.querySelector('.score-right')
let scoreWrongDisplay = document.querySelector('.score-wrong')
let rightImages = []
let wrongImages = []
let uniqueWrongImages

let imageNoDraggable

images.forEach(image => {
    image.addEventListener('dragstart', dragStart)
})

articleBoxes.forEach(articleBox => {
    articleBox.addEventListener('dragover', dragOver)
    articleBox.addEventListener('dragenter', dragEnter)
    articleBox.addEventListener('dragleave', dragLeave)
    articleBox.addEventListener('drop', dragDrop)
    articleBox.addEventListener('dragend', () => dragEnd(articleBox))
})

let beingDragged

function dragStart(e) {
    beingDragged = e.target
    if(e.target.parentElement.classList.contains('wrong')) {
        e.target.parentElement.classList.remove('wrong')
    }
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.target.classList.add('highlight')
    if(e.target.classList.contains('wrong')) {
        if(e.target.lastChild instanceof HTMLImageElement) {
            return
        }
    }
}

function dragLeave(e) {
    e.target.classList.remove('highlight')
}

function dragDrop(e) {
    e.target.append(beingDragged)
    e.target.classList.remove('highlight')
    e.target.classList.remove('wrong')
    
}

function dragEnd(articleBox) {
    const articleBoxWord = articleBox.getAttribute('word')
    const imgId = articleBox.lastChild.id
    
    if(articleBoxWord != imgId) {
        articleBox.classList.add('wrong')
        //articleBox.removeEventListener('dragover', dragOver)
        
        wrongImages.push(imgId)
        uniqueWrongImages = new Set(wrongImages)
        scoreWrongDisplay.textContent = `Schlecht: ${uniqueWrongImages.size}`
    } else {
        articleBox.classList.add('valid')
        setTimeout(() => articleBox.classList.remove('valid'), 350)

        imageNoDraggable = document.querySelector(`#${imgId}`)
        imageNoDraggable.setAttribute('draggable', false)
        articleBox.removeEventListener('dragover', dragOver)
        articleBox.removeEventListener('dragenter', dragEnter)

        rightImages.push(imgId)
        scoreRightDisplay.textContent = `Rechts: ${rightImages.length}`

        if(wrongImages.length > 0) {
            uniqueWrongImages.forEach(uniqueWrongImg => {
                if(rightImages.includes(uniqueWrongImg)) {                    
                    let index = wrongImages.indexOf(uniqueWrongImg)
                    wrongImages.splice(index,1)
                }           
            })
            uniqueWrongImages.clear()
            uniqueWrongImages = new Set(wrongImages)
            scoreWrongDisplay.textContent = `Schlecht: ${uniqueWrongImages.size}`
        }
    }
}
