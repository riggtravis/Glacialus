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
    asser.deepEqual(
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
