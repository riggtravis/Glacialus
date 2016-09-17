// TODO: Create a test kit

// Create a function that loads the basic site information.
// When loading the favicon, append it to the head tag's innerhtml
document.getElementById("body").addEventListener("load", function () {
  "use strict";

  // Get the JSON file that describes the website.
  $.getJSON("site.json", function(site) {
    // Make sure the JSON is valid
    // the title needs to be a string and it must contain something
    if (  typeof site.title === 'string'  &&
          site.title                      &&
          typeof site.pages === 'object'  ) {
      // Make sure the pages list contains an object that has the title "Home"
      var everything_is_fine = false;
      for (var index = 0; index < site.pages.length; index++) {
        if (site.pages[index].title === "Home") {
          everything_is_fine = true;
        }
      }
      if (everything_is_fine) {
        // Load site information
        // We know the site has a title, so go ahead and load that
        document.getElementById("site_title").innerhtml = site.title;

        // Next load all the optional information.
        document.getElementById("slogan").innerhtml = site.slogan;
        document.getElementById("logo").innerhtml   =
          '<img src="' + site.logo + '" alt="logo" height="58" width="58" />';

        // These two ajax calls are extremely similar.
        // TODO: Create a function that gets a template and loads an object
        
        // Loading the social media links is probably easier
        // Figure out how to put social media buttons on a web page
        if (site.social_media_links) {
          // load the social media links into a mustache template
          // Fetch the mustache template first
          $.ajax({
            url: 'templates/social_media_links.mustache',
            type: 'get',

            // Find a way to test if this is breaking.
            async: TEMPLATE_ASYNC_ACTION,
            success: function (template) {
              var social_media_links = Mustache.render(
                template,
                site.social_media_links
              );
              document.getElementById(
                "social_media_links"
              ).innerhtml = social_media_links;
            }
          });
        }

        // TODO: Load contact information
        if (site.contact) {
          // We can rely on stringy phone and email information
          if (typeof site.contact.phone === "string" && typeof site.contact.email === "string") {
            // Start loading everything into the template.
            $.ajax({
              url: 'templates/contact.mustache',
              type: 'get',
              async: TEMPLATE_ASYNC_ACTION,
              success: function (template) {
                // Find out whether or not to bother with the email address.
              }
            });
          }
        }
      }
    }
  });
});
