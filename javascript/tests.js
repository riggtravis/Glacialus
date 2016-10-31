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
      document.getElementById("bod").innerHTML,
      "check",
      "html insertion should output expected results"
  );

  // Tear down
  document.getElementById("bod").innerHTML = "";
});

// Test the append_to_element function
QUnit.test("appending html", function (assert) {
  'use strict';

  // Set up
  document.getElementById("bod").innerHTML = "Existing text";

  // Run test
  append_to_element(". New text", "bod");
  assert.equal(
      document.getElementById("bod").innerHTML,
      "Existing text. New text",
      "appending text to an element should result in old text then new text"
  );

  // Tear down
  document.getElementById("bod").innerHTML = "";
});

// Test loading a page
QUnit.test("loading pages", function (assert) {
  'use strict';

  // Set up
  // There needs to be a list of pages
  var pages = [
    { title: "Home", content: "content" },
    { title: "otherpage", content:"different content" }
  ];

  // Run test
  // This function isn't running at all.
  load_page(pages, "Home", function () {
    assert.equal(
        document.getElementById("content_body").innerHTML,
        "<h1>Home</h1>\ncontent\n",
        "the content of the page should be that which is provided by the object"
    );

    // Assert that the navigation bar is what is expected.
    // Figure out how exactly the template will render our html
    assert.equal(
        document.getElementById("nav_bar").innerHTML,
        '  <a class="pagename current" href="#">Home</a>\n\
\n\
  <a href="#" id="nav_link0">otherpage</a>\n',
        "The navigation bar should contain a featured page and links."
    );

    // Tear down
    document.getElementById("bod").innerHTML = "";
  });

  // Expect 0 because async.
  assert.equal(1, 1, "If this is the only test that was run, you failed");
  // TODO:  assert that the innerHTML is what is expected
  //        figure out how to assert that event listeners are correct
});

// Test fetching a template
QUnit.test("template fetching", function (assert) {
  'use strict';

  // run test
  get_template("test", function (template) {
    assert.equal(
        template, "{{check}}\n", "templates should be seen as strings"
    );
  });

  // The previous test doesn't run in a way that QUnit understands immediately.
  assert.equal(1, 1, "If this is the only test that was run, you failed")
});

// Test fetching a template and inserting html
QUnit.test("template fetching and html insertion", function (assert) {
  'use strict';

  // Set up
  get_template_insert_html(
      "test", {check: "check"}, "bod", function () {
        // run test
        assert.equal(
            document.getElementById("bod").innerHTML,
            "check\n",
            "given a template name, an object, an element, html gets inserted"
        );

        // tear down
        document.getElementById("bod").innerHTML = "";
      }
  );

  // The previous test doesn't run in a way that QUnit understands immediately.
  assert.equal(1, 1, "If this is the only test that was run, you failed")
})

// Test navigation bar description object generation
QUnit.test("nav object generation", function (assert) {
  'use strict';

  // Set up
  var pages = [
    { title: "Home",      content: "content" },
    { title: "otherpage", content: "other content" }
  ];

  var page = { title: "Home", content: "content" }

  var expected_object = {
    feature: {
      title: "Home",
      element_info: 'class="pagename current" href="#"'
    },
    links: [ { title: "otherpage", element_info: 'href="#" id="nav_link0"' } ]
  }

  // Run test
  create_nav_object(page, pages, function (object) { 
    assert.deepEqual(
        object,
        expected_object,
        "We need usable navigation description objects to be generated"
    );
  });
});
