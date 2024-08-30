document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    // console.log("Page is loaded completely!");
    // console.log(Array.from(document.getElementsByClassName("gallery")));
    Array.from(document.getElementsByClassName("gallery")).map((element) => {
      mauGalleryV2(element, {
        columns: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 3,
        },
        lightBox: true,
        lightboxId: "myAwesomeLightbox",
        showTags: true,
        tagsPosition: "top",
      });
    });
  }
};

// mauGalleryV2(document.getElementsByClassName("gallery"));
