test_results = {
  good: 0,
  bad: 0
};

search_for_page([{
    "title": "Home",
    "content": "the content"
  }], "Home", function (page) {
    'use strict';

    if (page.title === "Home" && page.conent === "the content") {
      test_results.good++;
    }
    else {
      test_results.bad++;
    }
});

create_nav_object({
    "title": "Featured",
    "content": "page content"
  },
  [
    {
      "title": "featured",
      "content": "page content"
    },
    {
      "title": "link_page",
      "content": "different content"
    }
  ], function (nav_object) {
    'use strict';

    var expected_feature_element_info = 'class="pagename current" href="#"';
    if (  nav_object.feature.title          === "Featured"                    &&
          nav_object.feature.element_info   === expected_feature_element_info &&
          nav_object.links[0].title         === "link_page"                   &&
          nav_object.links[0].element_info  === 'href="#" id="nav_link0"') {
      test_results.good++;
    }
    else {
      test_results.bad++;
    }
});
