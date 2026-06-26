// Lightbox built on the native <dialog> element.
// The browser handles the focus trap, Escape, background inert-ing, and ::backdrop —
// so this stays small. Tiles link straight to the image, so it degrades gracefully without JS.
(function () {
	var dialog = document.createElement("dialog");
	dialog.className = "lightbox";
	dialog.setAttribute("aria-label", "Enlarged photo");
	dialog.innerHTML =
		'<figure>' +
			'<button class="lightbox-close" type="button" aria-label="Close image">' +
				'<svg class="icon" viewBox="0 0 256 256" aria-hidden="true"><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><line x1="96" y1="96" x2="160" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"/></svg>' +
			'</button>' +
			'<img class="lightbox-img" alt="">' +
			'<figcaption class="lightbox-cap"></figcaption>' +
		'</figure>';
	document.body.appendChild(dialog);

	var img = dialog.querySelector(".lightbox-img");
	var cap = dialog.querySelector(".lightbox-cap");
	var closeBtn = dialog.querySelector(".lightbox-close");

	function open(href, alt) {
		img.src = href;
		img.alt = alt || "";
		cap.textContent = alt || "";
		dialog.showModal();
	}

	// Open on any .tile that points at an image. The Shows feature link is .tile--feature,
	// a different class, so it is left alone and follows its href as a normal link.
	document.addEventListener("click", function (event) {
		var link = event.target.closest("a.tile");
		if (!link) return;
		event.preventDefault();
		var thumb = link.querySelector("img");
		open(link.getAttribute("href"), thumb ? thumb.getAttribute("alt") : "");
	});

	closeBtn.addEventListener("click", function () { dialog.close(); });

	// Click in the dark area around the image closes; clicks on the image do not.
	dialog.addEventListener("click", function (event) {
		if (event.target === dialog) dialog.close();
	});

	// Esc fires the native close event; clear the src so the old image never flashes on reopen.
	dialog.addEventListener("close", function () { img.src = ""; });
})();

// Show video — a lightweight poster facade. The YouTube iframe only loads on click,
// so the page stays fast and pulls nothing from YouTube until someone presses play.
(function () {
	document.addEventListener("click", function (event) {
		var poster = event.target.closest(".video-poster[data-yt]");
		if (!poster) return;
		event.preventDefault();
		var iframe = document.createElement("iframe");
		iframe.className = "video-frame";
		iframe.src = "https://www.youtube-nocookie.com/embed/" + poster.getAttribute("data-yt") + "?autoplay=1&rel=0";
		iframe.title = "Live demonstration video";
		iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
		iframe.setAttribute("allowfullscreen", "");
		poster.replaceWith(iframe);
	});
})();

// Contact modal — same native <dialog>. The form lives in static HTML so Netlify still detects it;
// the nav link keeps href="contact.html" as a no-JS fallback.
(function () {
	var dialog = document.getElementById("contact-dialog");
	if (!dialog) return;
	document.addEventListener("click", function (event) {
		var trigger = event.target.closest("[data-contact]");
		if (trigger) { event.preventDefault(); dialog.showModal(); return; }
		if (event.target === dialog) dialog.close();             // click on backdrop
		if (event.target.closest("[data-close]")) dialog.close(); // close button
	});
})();
