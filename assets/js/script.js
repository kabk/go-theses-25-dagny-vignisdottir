document.addEventListener("DOMContentLoaded", function () {
  // **Menu Pop-up Code**
  const menuItems = document.querySelectorAll(".menuItem");
  const chapterDisplay = document.getElementById("chapterDisplay");
  const jimMenu = document.querySelector(".jimMenu");

  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      chapterDisplay.textContent = item.getAttribute("data-title");
      chapterDisplay.style.display = "block";
    });
  });

  jimMenu.addEventListener("mouseleave", () => {
    chapterDisplay.textContent = "";
    chapterDisplay.style.display = "none";
  });

  // **Function to update footnote positions**
  function updateFootnotes() {
    const references = document.querySelectorAll(".footnote-ref");
    const footnoteContainer = document.querySelector(".jimFootnoteCont");
    let lastFootnoteBottom = 0;

    references.forEach((ref) => {
      const refId = ref.id.replace("ref", "note"); // Convert 'ref1' to 'note1'
      const correspondingFootnote = document.getElementById(refId);

      if (correspondingFootnote) {
        const refRect = ref.getBoundingClientRect();
        const containerRect = footnoteContainer.getBoundingClientRect();
        let footnoteY = refRect.top - containerRect.top + footnoteContainer.scrollTop;

        // **Fix overlapping footnotes**
        if (footnoteY < lastFootnoteBottom) {
          footnoteY = lastFootnoteBottom + 5;
        }

        correspondingFootnote.style.top = `${footnoteY}px`;
        lastFootnoteBottom = footnoteY + correspondingFootnote.offsetHeight + 5;
      }
    });
  }

  // **Function to update image positions**
  function updateImagePositions() {
    const references = document.querySelectorAll(".image-ref");
    const imageContainer = document.querySelector(".jimImageCont");
    let lastImageBottom = 0;

    references.forEach((ref, index) => {
      const correspondingImage = document.getElementById(`image${index + 1}`);

      if (correspondingImage) {
        const refRect = ref.getBoundingClientRect();
        const containerRect = imageContainer.getBoundingClientRect();
        let imageY = refRect.top - containerRect.top + imageContainer.scrollTop;

        // **Fix overlapping images**
        if (imageY < lastImageBottom) {
          imageY = lastImageBottom + 10;
        }

        correspondingImage.style.marginTop = `${imageY - lastImageBottom}px`;
        lastImageBottom = imageY + correspondingImage.offsetHeight;
      }
    });
  }

  // **Run all updates on page load, resize, and scroll**
  function updatePositions() {
    updateFootnotes();
    updateImagePositions();
  }

  updatePositions();
  window.addEventListener("resize", updatePositions);
  window.addEventListener("scroll", updatePositions);
});
