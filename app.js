const images = document.querySelectorAll('.image-item')
const articleBoxes = document.querySelectorAll('.article-box')
let scoreRightDisplay = document.querySelector('.score-right')
let scoreWrongDisplay = document.querySelector('.score-wrong')
let rightImages = []
let wrongImages = []
let uniqueWrongImages
let wrongImagesAgain = []

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
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.target.classList.add('highlight')
}

function dragLeave(e) {
    e.target.classList.remove('highlight')
    if(e.t)
    e.target.classList.remove('valid')
    e.target.classList.remove('wrong')
}

function dragDrop(e) {
    e.target.append(beingDragged)
    e.target.classList.remove('highlight')
}

function dragEnd(articleBox) {
    const articleBoxWord = articleBox.getAttribute('word')
    const imgId = articleBox.lastChild.id
    
    if(articleBoxWord != imgId) {
        articleBox.classList.add('wrong')
        
        wrongImages.push(imgId)
        uniqueWrongImages = new Set(wrongImages)
        scoreWrongDisplay.textContent = `Schlecht: ${uniqueWrongImages.size}`
    } else {
        articleBox.classList.add('valid')
        setTimeout(() => articleBox.classList.remove('valid'), 350)

        const imageNoDraggable = document.querySelector(`#${imgId}`)
        imageNoDraggable.setAttribute('draggable', false)
        articleBox.removeEventListener('dragover', dragOver)
        articleBox.removeEventListener('dragenter', dragEnter)

        rightImages.push(imgId)
        scoreRightDisplay.textContent = `Rechts: ${rightImages.length}`
    }
}
