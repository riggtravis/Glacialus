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
  document.getElementById(element_name).innerHTML = rendered_html;
}

// Create a function that takes an string and an element name and appends the
  // string to the element
function append_to_element(string, element_name) {
  'use strict';

  var element = document.getElementById(element_name);
  var prepend = element.innerHTML;
  element.innerHTML = prepend + string;
}

// Create a function that receives some pages and a pagename and then loads that
  // particular page
function load_page(pages, page_name, callback) {
  'use strict';

  search_for_page(pages, page_name, function (page) {
    get_template_insert_html('page', page, "content_body");

    // Populate the navigation bar
    create_nav_object(page, pages, function (nav_object) {
      get_template('nav_bar', function (template) {
        // Render the information using the template.
        var rendered_html = Mustache.render(template, nav_object);
        document.getElementById("nav").innerHTML = rendered_html;
        
        // Create event listeners
        var element_id;
        var link;
        for (var index = 0; index < nav_object.links.length; index++) {
          element_id  = "nav_link" + index.toString();
          link        = nav_object.links[index];
          
          document.getElementById(element_id).addEventListener(
            "click",
            function () {
              console.log(element_id);
              load_page(pages, link.title);
            }
          );
        }

        // The callback is optional
        if (callback) callback();
      });
    });
  });
}

function get_template (template_name, callback) {
  'use strict';

  var url = 'templates/' + template_name + '.mustache';
  console.log(url);

  $.ajax({
    url: url,
    type: 'get',
    success: function (template) {
      console.log("Template callback: ok");
      callback(template);
    }
  });
}

function get_template_insert_html (
    template_name, 
    object, 
    destination, 
    callback
) {
  'use strict';

  get_template (template_name, function (template) {
    insert_html(template, object, destination);

    if (callback) callback();
  });
}

function create_nav_object (page, pages, callback) {
  'use strict';

  // Create a container variable that will hold the navigation bar
  var nav_links = [];
  var current_page;

  // Create a variable to contain the pagename tag
  var page_name_element_info = 'class="c-nav__item"';
  var page_element_info;

  // the navigation links should be counted independently
  var link_counter = 0;
  var element_id;

  // Populate nav_links the with html to describe the nav bar
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
      element_id = "nav_link" + link_counter.toString();
      link_counter++;

      page_element_info = 'class="c-nav__item" id="' + element_id + '"';
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
