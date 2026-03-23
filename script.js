// Create modal once and reuse it
var modal = document.createElement("div");
modal.setAttribute("class", "modal");
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-modal", "true");
modal.setAttribute("aria-label", "Enlarged bonsai image");

var closeBtn = document.createElement("span");
closeBtn.setAttribute("class", "close");
closeBtn.setAttribute("aria-label", "Close image");
closeBtn.setAttribute("role", "button");
closeBtn.setAttribute("tabindex", "0");
closeBtn.innerHTML = "&times;";

var modalContent = document.createElement("img");
modalContent.setAttribute("class", "modal-content");
modalContent.setAttribute("alt", "");

modal.appendChild(closeBtn);
modal.appendChild(modalContent);
document.body.appendChild(modal);

function openModal(href, altText) {
    modalContent.src = href;
    modalContent.setAttribute("alt", altText);
    modal.style.display = "block";
    closeBtn.focus();
}

function closeModal() {
    modal.style.display = "none";
    modalContent.src = "";
}

// Use event delegation instead of per-element listeners
document.addEventListener("click", function(event) {
    var link = event.target.closest(".iconlink");
    if (link) {
        event.preventDefault();
        var img = link.querySelector("img");
        var altText = img ? img.getAttribute("alt") : "";
        openModal(link.href, altText);
    }
});

// Close on close button click
closeBtn.addEventListener("click", closeModal);

// Close on backdrop click
modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});
