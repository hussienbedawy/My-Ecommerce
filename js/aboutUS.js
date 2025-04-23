
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()  
        const targetId = this.getAttribute('href').substring(1)  
        const targetElement = document.getElementById(targetId) 
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' 
            }) 
        }
    }) 
}) 


document.querySelectorAll('.contact-btn, .read-more-btn, .subscribe-btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05)'  
    }) 
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)'  
    }) 
}) 


document.querySelectorAll('.shop-image, .new-img, .team-image').forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)'  
        image.style.transition = 'transform 0.3s ease' 
    }) 
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)'  
    }) 
}) 
