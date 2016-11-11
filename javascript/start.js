// Create a function that loads the basic site information.
document.getElementById('body').addEventListener("load", function () {
  'use strict';

  alert("IT'S HAPPENING");
  start_glacialus();
});

start_glacialus();

function start_glacialus (callback) {
  'use strict';

  // Get the JSON file that describes the website.
  $.getJSON("site.json", function (site) {
    // Make sure the JSON is valid
    // the title needs to be a string and it must contain something
    if (  typeof site.title === 'string'  &&
          site.title                      &&
          typeof site.pages === 'object'  ) {

      // Check for the home page
      search_for_page(site.pages, "Home", function () {
        // Load site information
        // We know the site has a title, so go ahead and load that
        document.getElementById("site_title").innerhtml = site.title;

        // Next load all the optional information.
        document.getElementById("slogan").innerhtml = site.slogan;
        document.getElementById("logo").innerhtml   =
          '<img src="' + site.logo + '" alt="logo" height="58" width="58" class="o-image" />';

        // These two ajax calls are extremely similar.
        // TODO: Create a function that gets a template and loads an object

        // Loading the social media links is probably easier
        // Figure out how to put social media buttons on a web page
        if (site.social_media_links) {
          // load the social media links into a mustache template
          // Fetch the mustache template first
          get_template_insert_html(
              'social_media_links',
              site.social_media_links,
              "social_media_links"
          );
        }

        // Load contact information
        if (site.contact) {
          // We can rely on stringy phone and email information
          // I'm not sure the way I originally designed this is good. What if
          // someone has a phone number or an email, but not the other?
          if (  typeof site.contact.phone === "string"  &&
                typeof site.contact.email === "string"  ) {
            // Start loading everything into the template.
            get_template('contact', function (template) {
              // Find out whether or not to bother with the mailing address.
              site.contact.mailing_address_valid =
                site.contact.mailing_address.address_line_one &&
                site.contact.mailing_address.city             &&
                site.contact.mailing_address.postal_code      &&
                site.contact.mailing_address.country;
              insert_html(template, site.contact, "contact");
            });
          }
        }

        // When loading the favicon, append it to the head tag's innerhtml
        // The favicon must be a png
        if (site.favicon.includes(".png")) {
          var append =
            '<link rel="icon" type=image/png href="' + site.facicon + '" />';
          append_to_element(append, "head");
        }

        // Load the Home page
        // Fetch the home page from the list of pages
        load_page(site.pages, "Home", callback);
      });
    }
  });
}
