document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    let cardId = 0;
    let cards = [];
    if (localStorage.getItem('id')){
        cardId = parseInt(localStorage.getItem('id'));
    }
    if (Array.isArray(JSON.parse(localStorage.getItem('cards')))){
        cards = JSON.parse(localStorage.getItem('cards'));
        cards.forEach((created) => {
            createNewCardElement(created, document.querySelector(`main section.${created.column}`) );
        }
    )};
    function createNewCard(column = 'todo') {
        const card = {
            id: cardId,
            label: 'Nowe zadanie',
            color: getRandomColor(),
            column: column
        }
        cards.push(card);
        cardId++;
        localStorage.setItem('id',cardId);
        return card;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function updateCount(section) {
        const count = section.querySelectorAll('.card').length;
        const h3 = section.querySelector('h3');
        if (h3) h3.textContent = 'Ilosc kart: ' + count;
    }

    function createNewCardElement(created, section) {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = created.id.toString();

        const label = document.createElement('label');
        label.textContent = created.label;
        label.contentEditable = 'true';
        label.addEventListener('input', () => {
            created.label = label.textContent;
            localStorage.setItem('cards', JSON.stringify(cards));
        });

        const remove = document.createElement('button');
        remove.className = 'remove';
        remove.type = 'button';
        remove.textContent = '✕';
        remove.addEventListener('click', () => {
            card.remove();
            updateCount(section);
            var index = cards.findIndex(card => card.id.toString() === card.id);
            cards.splice(index, 1);
            localStorage.setItem('cards', JSON.stringify(cards));
        });
        
        const colorBtn = document.createElement('button');
        colorBtn.className = 'colorBtn';
        colorBtn.type = 'button';
        colorBtn.textContent = 'Zmień kolor';
        colorBtn.addEventListener('click', () => {
            var color = getRandomColor();
            card.style.backgroundColor = color;
            created.color = color;
            localStorage.setItem('cards', JSON.stringify(cards));
        });

        const buttonBack = document.createElement('button');
        buttonBack.className = 'moveBack';
        buttonBack.type = 'button';
        buttonBack.textContent = '←';
        buttonBack.addEventListener('click', () => {
        const currentSection = card.parentElement;
        const prevSection = currentSection && currentSection.previousElementSibling;
        if (prevSection) {
            prevSection.appendChild(card);
            updateCount(currentSection);
            updateCount(prevSection);
            var index = cards.findLastIndex(card => card.column === prevSection.className)
            if (index > cards.findIndex(card => card.id === created.id))
            {   
                cards.splice(cards.findIndex(card => card.id === created.id),1,);
                cards.splice(index, 0, created);
            }
            created.column = prevSection.className;
            localStorage.setItem('cards', JSON.stringify(cards));
        }
        });

        const buttonForward = document.createElement('button');
        buttonForward.className = 'moveForward';
        buttonForward.type = 'button';
        buttonForward.textContent = '→';
        buttonForward.addEventListener('click', () => {
            const currentSection = card.parentElement;
            const nextSection = currentSection && currentSection.nextElementSibling;
            if (nextSection) {
            nextSection.appendChild(card);
            updateCount(currentSection);
            updateCount(nextSection);
            var index = cards.findLastIndex(card => card.column === nextSection.className)
            if (index > cards.findIndex(card => card.id === created.id))
            {   
                cards.splice(cards.findIndex(card => card.id === created.id),1,);
                cards.splice(index, 0, created);
            }
            created.column = nextSection.className;
            localStorage.setItem('cards', JSON.stringify(cards));
        }
        });

        const buttonUp = document.createElement('button');
        buttonUp.className = 'up';
        buttonUp.type = 'button';
        buttonUp.textContent = '↑';
        buttonUp.addEventListener('click', () => {
            const previous = card.previousElementSibling;
            if (previous && previous.classList && previous.classList.contains('card')) {
                const currId = parseInt(card.id, 10);
                const prevId = parseInt(previous.id, 10);

                previous.before(card);
                var temp = cards[cards.findIndex(c => c.id === currId)];
                cards[cards.findIndex(c => c.id === currId)] = cards[cards.findIndex(c => c.id === prevId)];
                cards[cards.findIndex(c => c.id === prevId)] = temp;

                localStorage.setItem('cards', JSON.stringify(cards));
            }
        });

        const buttonDown = document.createElement('button');
        buttonDown.className = 'down';
        buttonDown.type = 'button';
        buttonDown.textContent = '↓';
        buttonDown.addEventListener('click', () => {
            const next = card.nextElementSibling;
            if (next && next.classList && next.classList.contains('card')) {
                const currId = parseInt(card.id, 10);
                const nextId = parseInt(next.id, 10);

                next.after(card);
                var temp = cards[cards.findIndex(c => c.id === currId)];
                cards[cards.findIndex(c => c.id === currId)] = cards[cards.findIndex(c => c.id === nextId)];
                cards[cards.findIndex(c => c.id === nextId)] = temp;

                localStorage.setItem('cards', JSON.stringify(cards));
            }
        });
        card.style.backgroundColor = created.color;
        card.appendChild(label);
        card.appendChild(remove);
        card.appendChild(colorBtn);
        card.appendChild(buttonUp);
        card.appendChild(buttonDown);
        card.appendChild(buttonBack);
        card.appendChild(buttonForward);
        section.appendChild(card);
        updateCount(section);
        localStorage.setItem('cards', JSON.stringify(cards));
        return;
    }
    main.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn || !main.contains(btn)) return;

        const section = btn.closest('section');
        if (!section) return;

        const action = btn.textContent.trim();

        if (action.includes('Dodaj')) {
            var created = createNewCard(section.className);
            createNewCardElement(created, section);
            return;
        }

        if (action.includes('Koloruj kolumnę')) {
            section.querySelectorAll('.card').forEach((c) => {
                c.style.backgroundColor = getRandomColor();
                cards.find(card => card.id.toString() === c.id).color = c.style.backgroundColor;
                localStorage.setItem('cards', JSON.stringify(cards));
            });
        section.classList.toggle('colored');
        return;
        }
    });
});