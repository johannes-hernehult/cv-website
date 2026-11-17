const YEAR_PATTERN = /\b(?:19|20)\d{2}\b/g;
const ONGOING_PATTERN = /\b(?:present|now|current)\b/i;
const CURRENT_YEAR = new Date().getFullYear();

const comparators = {
    newest: (a, b) => b.endYear - a.endYear || b.startYear - a.startYear,
    oldest: (a, b) => a.startYear - b.startYear || a.endYear - b.endYear,
    type: (a, b) => a.type.localeCompare(b.type) || comparators.newest(a, b),
};

function parseEntry(card) {
    const type = card.querySelector(".card__type")?.textContent.trim() ?? "";
    const info = card.querySelector(".card__info")?.textContent ?? "";
    const years = info.match(YEAR_PATTERN)?.map(Number) ?? [];
    const isOngoing = ONGOING_PATTERN.test(info);

    return {
        card,
        type,
        startYear: years[0] ?? 0,
        endYear: isOngoing ? CURRENT_YEAR : (years.at(-1) ?? 0),
    };
}

function initExperienceOrdering() {
    const section = document.querySelector(".experience");
    const controls = section?.querySelector(".experience__controls");
    const select = section?.querySelector("#experience-order");
    if (!controls || !select) return;

    const cards = [...section.querySelectorAll(".card")];
    if (cards.length === 0) return;

    const container = cards[0].parentElement;
    const entries = cards.map(parseEntry);

    const render = () => {
        const compare = comparators[select.value] ?? comparators.newest;
        const sorted = [...entries].sort(compare);
        container.append(...sorted.map(({ card }) => card));
    };

    select.addEventListener("change", render);
    controls.hidden = false; // reveal controls only when JS is working
    render();
}

initExperienceOrdering();
