const FALLBACK_DELAY_MS = 1000;

// Assembled at runtime so the full strings never appear in the source
const contact = {
    location: ["Malmö", "Sweden"].join(", "),
    email: ["jhernehult", "gmail.com"].join("@"),
};

function createLink(href, text) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    return link;
}

function showContactDetails() {
    const locationEl = document.querySelector(".location .contact-info__value");
    const emailEl = document.querySelector(".email .contact-info__value");
    if (!locationEl || !emailEl) return;

    locationEl.textContent = contact.location;
    emailEl.append(createLink(`mailto:${contact.email}`, contact.email));

    document.querySelectorAll(".contact-info").forEach((el) => {
        el.classList.add("is-visible");
    });
}

// Run once: on first real interaction, or after the fallback delay
const INTERACTION_EVENTS = ["pointermove", "scroll", "keydown", "touchstart"];
let hasRun = false;

function runOnce() {
    if (hasRun) return;
    hasRun = true;
    INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, runOnce));
    showContactDetails();
}

INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, runOnce, { once: true, passive: true }));
window.setTimeout(runOnce, FALLBACK_DELAY_MS);
