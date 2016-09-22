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
      search_for_page(site.pages, "Home", function () {
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
          get_template('social_media_links', function (template) {
              insert_html(
                template,
                site.social_media_links,
                "social_media_links"
              );
          });
        }

        // Load contact information
        if (site.contact) {
          // We can rely on stringy phone and email information
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
        load_page(site.pages, "Home");
      });
    }
  });
});

// Create a function that searches a list for a page and then performs an
  // action on that page
function search_for_page (pages, name, callback) {
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
    get_template('page', function (template) {
      insert_html(template, page, "content_body");
    });

    // TODO: Populate the navigation bar
    // Create a container variable that will hold the navigation bar
    var nav_string = "";

    // Create a variable to contain the pagename tag
    var page_name_tag = '<a class="pagename current" href="#">';

    // Populate the nav_string with html to describe the nav bar
    for (var index = 0; index < pages.length; index++) {
      // Create a set of links, one for each page
      // Feature the current page
      if (pages[index].title === page.title) {
        // Always put the pagename at the start of the nav bar
        nav_string = page_name_tag + page.title + '</a>' + nav_string;
      }
      else {
        nav_string = nav_string + '<a href="#">' + pages[index].title + '</a>';
      }
    }
    // Create event listeners for all the pages that aren't the current page
    // TODO: Think about how to assign identifiers to elements
  });
}

function get_template (template_name, callback) {
  "use strict";

  $.ajax({
    url: 'templates/' + template_name + '.mustache',
    type: 'get',
    async: true,
    success: callback(template)
  });
}
