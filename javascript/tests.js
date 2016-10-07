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
   var pages = [
    { title: "Home", content: "content" },
    { title: "otherpage", content:"different content" }
  ];

  // The body needs a place for content to go
  // The body also needs a place for a navigation bar to go
  var insert_string = '<div id="content_body"></div><div id="nav_bar"></div>';
  document.getElementById("bod").innerhtml = insert_string;

  // Run test
  load_page(pages, "Home");
  // TODO:  assert that the innerhtml is what is expected
  //        figure out how to assert that event listeners are correct
  assert.equal(
      document.getElementById("content_body").innerhtml,
      "content",
      "the content of the page should be that which is provided by the object"
  );

  // Assert that the navigation bar is what is expected.
  // Figure out how exactly the template will render our html
  assert.equal(
      document.getElementById("nav_bar").innerhtml,
      '  <a class="pagename current" href="#">Home</a>\
\
  <a href="#" id="nav_link0">otherpage</a>',
      "The navigation bar should contain a featured page and links."
  );

  // Tear down
  document.getElementById("bod").innerhtml = "";
});

// Test fetching a template
QUnit.test("template fetching", function (assert) {
  'use strict';

  // run test
  get_template("test.mustache", function (template) {
    assert.equal(template, "{{check}}", "templates should be seen as strings");
  });
});

// Test fetching a template and inserting html
QUnit.test("template fetching and html insertion", function (assert) {
  'use strict';

  // Set up
  get_template_insert_html("test.mustache", {check: "check"}, "bod");

  // run test
  assert.equal(
      document.getElementById("bod").innerhtml,
      "check",
      "given a template name, an object, an element, html should be inserted"
  );

  // tear down
  document.getElementById("bod").innerhtml = "";
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

// Test the start function
QUnit.test("the whole thing, pretty much", function (assert) {
  // Set up
  document.getElementById("bod").innerhtml = '<div id="site_title"></div>\
<div id="slogan"></div>\
<div id="logo"></div>\
<div id="social_media_links"></div>\
<div id="contact"></div>\
<div id="head"></div>\
<div id="content_body"></div>\
<div id="nav_bar"></div>';

  // Run test
  start();
  assert.equal(document.getElementById("bod").innerhtml,
'<div id="site_title">GD Coffee</div>\
<div id="logo"><img src="test.png" alt="logo" height="58" width="58" /></div>\
<div id="social_media_links"><nav>\
    <a\
      class="zocial facebook icon"\
      href="https://www.facebook.com/test"\
    >\
      Visit on Facebook!\
    </a>\
\
    <a class="zocial twitter icon" href="https://www.twitter.com/test">\
      Follow on Twitter!\
    </a>\
\
    <a\
      class="zocial linkedin icon"\
      href="https://www.linkedin.com/in/test"\
    >\
      Look at LinkedIn!\
    </a>\
\
    <a class="zocial github icon" href="https://www.github.com/test">\
      There\'s code on GitHub!\
    </a>\
\
    <a\
      class="zocial soundcloud icon"\
      href="https://www.soundcloud.com/test"\
    >\
      There\'s sounds on SoundCloud!\
    </a>\
\
    <a class="zocial tumblr icon" href="https://test.tumblr.com">\
      Follow on Tumblr!\
    </a>\
\
    <a\
      class="zocial pinterest icon"\
      href="https://www.pinterest.com/test"\
    >\
      Look at pictures on Pinterest!\
    </a>\
\
    <a class="zocial blogger icon" href="https://test.blogspot.com">\
      Words!\
    </a>\
\
    <a\
      class="zocial fivehundredpx icon"\
      href="https://500px.com/test"\
    >\
      Professionally done pictures!\
    </a>\
</nav></div>\
<div id="contact"><address>\
    <strong>Email:</strong> rigg,travis@gmail.com <br />\
\
    <strong>Phone:</strong> +1-540-267-5874 <br />\
\
      101 Chestnut Street <br />\
        CPO 1353 <br />,\
      Berea\
        , Kentucky\
      40404\
        1080\
      <br />\
      United States\
</address></div>\
<div id="head"><link rel="icon" type=image/png href="testf.png"/></div>\
<div id="content_body"><h1>Home</h1>\
Come to GD Coffee for the coffee. Leave because you have your coffee.</div>\
<div id="nav_bar">  <a class="pagename current" href="#">Home</a>\
\
  <a href="#" id="nav_link0">About</a>\
  <a href="#" id="nav_link1">Menu</a>\
  <a href="#" id="nav_link2">Locations</a>\
  <a href="#" id="nav_link3">Testimonials</a>\
  <a href="#" id="nav_link4">FAQ</a></div>',
      "Given a JSON file, a website should get made."
  );

  // Tear down
  Document.getElementById("bod").innerhtml = "";
});
