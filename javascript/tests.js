QUnit.test("page searching", function (assert) {
  'use strict';

  var pages = [{
    "title": "Home",
    "content": "page content"
  }];
  search_for_page(pages, "Home", function (page) {
    assert.deepEqual(
      page,
      {
        "title": "Home",
        "content": "page content"
      },
      "Searching for a page by title should return a matching page"
    );
  });
});

QUnit.test("nav object creation", function (assert) {
  'use strict';

  var page = {
    "title": "Home",
    "content": "page content"
  };

  var pages = [
    {
      "title": "Home",
      "content": "page content"
    },
    {
      "title": "Another_page",
      "content": "it also has content"
    }
  ];

  create_nav_object(page, pages, function (nav_object) {
    assert.deepEqual(
      nav_object,
      {
        feature: {
          "title": "Home",
          element_info: 'class="pagename current" href="#"'
        },
        links: [
          {
            "title": "Another_page",
            element_info: 'href="#" id="nav_link0"'
          }
        ]
      },
      "The nav object should be a featured page and a list of links"
    );
  });
});

// Create a test for the insert_html function. This will require a test html
// file to mangle
QUnit.test("html insertion", function (assert) {
  'use strict';

  // Set up
  var template  = "{{mustache}}";
  var object    = { mustache: "check" };

  // Run test
  insert_html(template, object, "bod");
  assert.equal(
      document.getElementById("bod").innerhtml,
      "check",
      "html insertion should output expected results"
  );

  // Tear down
  document.getElementById("bod").innerhtml = "";
});

// Test the append_to_element function
QUnit.test("appending html", function (assert) {
  'use strict';

  // Set up
  document.getElementById("bod").innerhtml = "Existing text";

  // Run test
  append_to_element(". New text", "bod");
  assert.equal(
      document.getElementById("bod").innerhtml,
      "Existing text. New text",
      "appending text to an element should result in old text then new text"
  );

  // Tear down
  document.getElementById("bod").innerhtml = "";
});

// Test loading a page
QUnit.test("loading pages", function (assert) {
  'use strict';

  // Set up
  // There needs to be a list of pages
  pages = [
    { title: "Home", content: "content" },
    { title: "otherpage", content:"different content" }
  ];

  // The body needs a place for content to go
  // The body also needs a place for a navigation bar to go
  insert_string = '<div id="content_body"></div><div id="nav_bar"></div>';
  document.getElementById("bod").innerhtml = insert_string;

  // Run test
  load_page(pages, "Home");
  // TODO:  assert that the innerhtml is what is expected
  //        figure out how to assert that even listeners are correct

  // Tear down
  document.getElementById("bod").innerhtml = "";
});
