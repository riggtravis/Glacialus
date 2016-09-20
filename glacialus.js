// TODO: Create a test kit

// Create a function that loads the basic site information.
document.getElementById("body").addEventListener("load", function () {
  "use strict";

  // Get the JSON file that describes the website.
  $.getJSON("site.json", function(site) {
    // Make sure the JSON is valid
    // the title needs to be a string and it must contain something
    if (  typeof site.title === 'string'  &&
          site.title                      &&
          typeof site.pages === 'object'  ) {

      // Check for the home page
      check_for_page(site.pages, "Home", function () {
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
              insert_html(
                template,
                site.social_media_links,
                "social_media_links"
              );
            }
          });
        }

        // Load contact information
        if (site.contact) {
          // We can rely on stringy phone and email information
          if (  typeof site.contact.phone === "string"  &&
                typeof site.contact.email === "string"  ) {
            // Start loading everything into the template.
            $.ajax({
              url: 'templates/contact.mustache',
              type: 'get',
              async: TEMPLATE_ASYNC_ACTION,
              success: function (template) {
                // Find out whether or not to bother with the mailing address.
                site.contact.mailing_address_valid =
                  site.contact.mailing_address.address_line_one &&
                  site.contact.mailing_address.city             &&
                  site.contact.mailing_address.postal_code      &&
                  site.contact.mailing_address.country;
                insert_html(template, site.contact, "contact");
              }
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
        load_page(site.pages, "Home");

        // TODO: Populate the navigation bar
      });
    }
  });
});

// Create a function that searches a list for a page and then performs an
  // action on that page
function check_for_page (pages, name, callback) {
  "use strict";

  for (var index = 0; index < pages.length; index++) {
    if (pages[index].title === name){
      callback(pages[index]);
    }
  }
}

// Create a function that takes a template, an object, and an element names and
  // renders something to put into the element
function insert_html (template, object, element_name) {
  "use strict";

  var rendered_html = Mustache.render(template, object);
  document.getElementById(element_name).innerhtml = rendered_html;
}

// Create a function that takes an string and an element name and appends the
  // string to the element
function append_to_element(string, element_name) {
  "use strict";

  var element = document.getElementById(element_name);
  var prepend = element.innerhtml;
  element.innerhtml = prepend + string;
}

// Create a function that receives some pages and a pagename and then loads that
  // particular page
function load_page(pages, page_name) {
  "use strict";

  check_for_page(pages, page_name, function (page) {
    document.getElementById("page_title").innerhtml = page.title;
    document.getElementById("content").innerhtml    = page.content;
  });
}
