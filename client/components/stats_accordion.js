// to open and close stats accordion when in mobile view

const statsInfo = document.querySelector('.stats-info')
const chevronIco = document.querySelector('.chevron-icon')

chevronIco.addEventListener('click', handleChevron)

function handleChevron(event) {
    statsInfo.classList.toggle('show')
    chevronIco.classList.toggle('invert')
}