const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    cards.forEach(card => {

        const carName =
            card.dataset.name.toLowerCase();

        if(carName.includes(value)){

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});