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
