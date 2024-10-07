// Select all anchor tags with the 'image-link' class
var imageLinks = document.querySelectorAll(".iconlink");

imageLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        // Prevent the default anchor click behavior (stopping navigation)
        event.preventDefault();

        // Create the modal elements dynamically
        var modal = document.createElement("div");
        modal.setAttribute("class", "modal");

        var modalContent = document.createElement("img");
        modalContent.setAttribute("class", "modal-content");

        var caption = document.createElement("div");
        caption.setAttribute("id", "caption");

        var closeBtn = document.createElement("span");
        closeBtn.setAttribute("class", "close");
        closeBtn.innerHTML = "&times;";

        // Append the modal elements
        modal.appendChild(closeBtn);
        modal.appendChild(modalContent);
        modal.appendChild(caption);
        document.body.appendChild(modal);

        // Set the modal content
        modal.style.display = "block";
        modalContent.src = this.href; // Use the href attribute of the anchor (full-size image URL)

        // Close modal when clicking close button
        closeBtn.onclick = function() {
            modal.style.display = "none";
            document.body.removeChild(modal); // Remove modal from the DOM
        };

        // Close modal when clicking outside the image
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.removeChild(modal); // Remove modal from the DOM
            }
        };
    });
});
