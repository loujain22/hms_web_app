document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        console.log(card.innerText.trim());
    });
});