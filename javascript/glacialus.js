// TODO: Create a test kit
// TODO: Pull top level functionality out of load page

// Create a function that searches a list for a page and then performs an
  // action on that page
function search_for_page (pages, name, callback) {
  'use strict';

  for (var index = 0; index < pages.length; index++) {
    if (pages[index].title === name) {
      callback(pages[index]);
    }
  }
}

// Create a function that takes a template, an object, and an element names and
  // renders something to put into the element
function insert_html (template, object, element_name) {
  'use strict';

  var rendered_html = Mustache.render(template, object);
  document.getElementById(element_name).innerhtml = rendered_html;
}

// Create a function that takes an string and an element name and appends the
  // string to the element
function append_to_element(string, element_name) {
  'use strict';

  var element = document.getElementById(element_name);
  var prepend = element.innerhtml;
  element.innerhtml = prepend + string;
}

// Create a function that receives some pages and a pagename and then loads that
  // particular page
function load_page(pages, page_name) {
  'use strict';

  check_for_page(pages, page_name, function (page) {
    get_template_insert_html('page', page, "content_body");

    // TODO: Populate the navigation bar
    create_nav_object(page, pages, function (nav_object) {
      get_template('nav_bar', function (template) {
        insert_html("nav_bar", nav_object, "nav_bar");
      });

      // Create event listeners for all the pages that aren't the current page
      var element_id;
      for (var index = 0; index < nav_object.links.length; index++) {
        element_id = "nav_link" + index.toString();
        document.getElementById(element_id).addEventListener(
          "click",
          load_page(pages, nav_object.links[index].title)
        );
      }
    });
  });
}

function get_template (template_name, callback) {
  'use strict';

  $.ajax({
    url: 'templates/' + template_name + '.mustache',
    type: 'get',
    async: true,
    success: callback(template)
  });
}

function get_template_insert_html (template_name, object, destination) {
  'use strict';

  get_template (template_name, function (template) {
    insert_html(template, object, destination);
  });
}

function create_nav_object (page, pages, callback) {
  'use strict';

  // Create a container variable that will hold the navigation bar
  var nav_links = [];
  var current_page;

  // Create a variable to contain the pagename tag
  var page_name_element_info = 'class="pagename current" href="#"';

  // the navigation links should be counted independently
  var link_counter = 0;

  // Populate the nav_string with html to describe the nav bar
  for (var index = 0; index < pages.length; index++) {
    // Create a set of links, one for each page
    // Feature the current page
    if (pages[index].title === page.title) {
      current_page = {
        title: pages[index].title,
        element_info: page_name_element_info
      };
    }
    else {
      element_id = "nav_link" + link_counter;
      link_counter++;

      page_element_info = 'href="#" id="' + element_id + '"';
      nav_links.push({
        title: pages[index].title,
        element_info: page_element_info
      });
    }
  }

  // Do stuff with the newly formed nav object
  callback({
    feature: current_page,
    links: nav_links
  });
}
