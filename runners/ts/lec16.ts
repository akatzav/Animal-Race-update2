import { Utils } from "./utils.js";
import { animalArray } from "./runners.js";

const startBtn = document.getElementById("start_btn") as HTMLButtonElement;
const animalShowCase = document.getElementById("animal-show-case") as HTMLDivElement;
let id: number;


const animal_wrapper2 = document.createElement("div");
animalShowCase.appendChild(animal_wrapper2);

const animalImags = animalArray.map((animal) => {
    const img = document.createElement("img");
    img.classList.add("p-4", "my-position");
    img.src = `./image/${animal.id}.png`;
    img.innerHTML=`<br>`
    return img;
});

animalImags.forEach((img) => {
    animal_wrapper2.appendChild(img);
});

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    animal_wrapper2.remove();
    const animal_wrapper = document.createElement("div");
    animal_wrapper.id = "animal_wrapper";
    animal_wrapper.classList.add("animal-wrapper");

    const final_line = document.createElement("div");
    final_line.classList.add("final-line");

    animalShowCase.appendChild(animal_wrapper);
    animalShowCase.appendChild(final_line);

    const animalImags = animalArray
        .sort((a, b) => (Math.random() > 0.5 ? 1 : -1))
        .map((animal, index) => {
            const img = document.createElement("img");
            img.classList.add(animal.id, "p-4", "my-border");
            img.src = `./image/${animal.id}.png`;
            return img;
        });

    animalImags.forEach((img) => {
        animal_wrapper.appendChild(img);
    });

    const animal_steps = animalArray.map((animal) => {
        if (animal.name !== "horse") {
            animal.step = animal.step * Utils.random(1, 5);
        } else {
            animal.step = animal.step * Utils.random(1, 2);
        }
        return animal.step;
    });

    const animal_voice = animalArray.map((animal) => {
        return animal.voice;
    });

    const chosen_animal = document.querySelectorAll("#animal_wrapper img");
    chosen_animal.forEach((animal_img, index) => {
        animal_img.classList.add("pointer");
        animal_img.addEventListener("click", () => {
            chosen_animal.forEach((animal) => {
                animal.classList.remove("chosen-animal");
                animal.classList.remove("my-border");
            });

            animal_img.classList.add("chosen-animal");
            setTimeout(() => {
                const audio = new Audio(`./media/${animal_voice[index]}.wav`);
                audio.play();
            }, 1000);

            id = setInterval(() => {
                animalImags.forEach((animal_img, index) => {
                    animal_img.style.transform += `translateX(${(animal_steps[index] * Utils.random(1, 5)) / Utils.random(1, 25)}px)`;

                    if (animal_img.getBoundingClientRect().x > document.body.getBoundingClientRect().width) {
                        clearInterval(id);
                        const circle = document.createElement("div");
                        circle.classList.add("circle");
                        animalShowCase.appendChild(circle);

                        const winner = document.createElement("h1");
                        winner.innerHTML = animal_img.classList[0];
                        winner.classList.add("winner");
                        circle.appendChild(winner);
                        console.log(animal_img.classList[0]);

                        const p = document.createElement("p");
                        p.innerText = "is the Winner!! Game overr!!!";
                        p.style.fontSize = "10px";
                        p.style.textAlign = "center";
                        p.classList.add("winner-p");
                        circle.appendChild(p);
                    }
                });
            }, 500);
        });
    });
});