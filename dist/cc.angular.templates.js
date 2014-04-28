angular.module('cc.angular.templates', ['src/directives/ccAddress/ccaddress.tpl.html', 'src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html', 'src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html', 'src/directives/ccCheckBox/cc-checkbox.tpl.html', 'src/directives/ccElasticViews/elasticViews.tpl.html', 'src/directives/ccFooterLinks/cc-footer-links.tpl.html', 'src/directives/ccGoBackButton/cc-go-back-button.tpl.html', 'src/directives/ccGoUpButton/cc-go-up-button.tpl.html', 'src/directives/ccGoUpControl/cc-go-up-control.tpl.html', 'src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html', 'src/directives/ccPrice/cc-price.tpl.html', 'src/directives/ccSearchField/cc-search-field.tpl.html', 'src/directives/ccSelectBox/cc-select-box.tpl.html', 'src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html', 'src/directives/ccVariantSelector/ccvariantselector.tpl.html', 'src/directives/ccZippy/cc-zippy.tpl.html', 'src/directives/sofaRadioButton/sofa-radio-button.tpl.html']);

angular.module("src/directives/ccAddress/ccaddress.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccAddress/ccaddress.tpl.html",
    "<address>\n" +
    "  <span>{{data.company}}</span>\n" +
    "  <span>{{data.name}} {{data.surname}}</span>\n" +
    "  <span>{{data.street}} {{data.streetnumber}}</span>\n" +
    "  <span ng-if=\"data.streetextra\">{{data.streetextra}}</span>\n" +
    "  <span>{{data.zip}} {{data.city}}</span>\n" +
    "  <span>{{data.country.label}}</span>\n" +
    "</address>\n" +
    "");
}]);

angular.module("src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccBreadcrumbs/cc-breadcrumbs.tpl.html",
    "<ul>\n" +
    "    <li class=\"cc-breadcrumbs__entry\" \n" +
    "        ng-repeat=\"entry in data\">\n" +
    "        <a ng-click=\"navigateTo(entry)\" ng-bind=\"entry.title\"></a>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccCategoryTreeView/cc-category-tree-view.tpl.html",
    "<div class=\"cc-category-tree-view\">\n" +
    "    <ul ng-class=\"{ 'cc-category-tree-view__list--open': item._categoryTreeView.isVisible,\n" +
    "                    'cc-category-tree-view__list--closed': !item._categoryTreeView.isVisible,\n" +
    "                    'cc-category-tree-view__list--root': isRoot,\n" +
    "                    'cc-category-tree-view__list--child': !isRoot }\" cc-template-code>\n" +
    "       <li class=\"cc-category-tree-view__list-item\"\n" +
    "           cc-nested-category-item ng-repeat=\"item in items\">\n" +
    "           <a href=\"{{item.getOriginFullUrl()}}\" ng-click=\"doAction($event, item)\"\n" +
    "                 ng-class=\"item._categoryTreeView.isActive ? 'cc-category-tree-view__category-entry--active' : 'cc-category-tree-view__category-entry'\">\n" +
    "                 {{item.label}}\n" +
    "                <i ng-class=\"item._categoryTreeView.isVisible ? 'fa-chevron-up' : 'fa-chevron-down'\"\n" +
    "                   class=\"cc-category-tree-view__category-entry-icon fa\"\n" +
    "                   ng-show=\"item.hasChildren\">\n" +
    "               </i>\n" +
    "            </a>\n" +
    "       </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/ccCheckBox/cc-checkbox.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccCheckBox/cc-checkbox.tpl.html",
    "<div class=\"cc-checkbox\">\n" +
    "    <input type=\"checkbox\" ng-model=\"value\" id=\"cc-check-box-{{id}}\" class=\"cc-checkbox__input\">\n" +
    "    <label for=\"cc-check-box-{{id}}\" class=\"cc-checkbox__label\" ng-bind-html=\"label\"></label>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/ccElasticViews/elasticViews.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccElasticViews/elasticViews.tpl.html",
    "<div class=\"cc-elastic-views-viewport\">\n" +
    "    <div \n" +
    "        ng-repeat=\"view in views\"\n" +
    "        cc-elastic-views-notifier \n" +
    "        id=\"{{view.name}}\" \n" +
    "        class=\"cc-elastic-views-view\" \n" +
    "        ng-class=\"view.cls\" \n" +
    "        ng-include=\"view.tpl\">\n" +
    "    </div>\n" +
    "<div>");
}]);

angular.module("src/directives/ccFooterLinks/cc-footer-links.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccFooterLinks/cc-footer-links.tpl.html",
    "\n" +
    "<ul class=\"cc-footer-list\">\n" +
    "    <li bindonce=\"item\" ng-repeat=\"item in items\" ng-click=\"goTo(item)\" bo-text=\"item.title\" class=\"cc-footer-list__item\"></li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("src/directives/ccGoBackButton/cc-go-back-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccGoBackButton/cc-go-back-button.tpl.html",
    "<button class=\"cc-go-back-button\" ng-click=\"goBack()\" ng-transclude></button>");
}]);

angular.module("src/directives/ccGoUpButton/cc-go-up-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccGoUpButton/cc-go-up-button.tpl.html",
    "<button class=\"cc-go-up-button\" ng-click=\"goUp()\" ng-transclude></button>");
}]);

angular.module("src/directives/ccGoUpControl/cc-go-up-control.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccGoUpControl/cc-go-up-control.tpl.html",
    "    <cc-go-up-button class=\"cc-go-up-control\" ng-if=\"getParentLabel()\">\n" +
    "        <i class=\"cc-go-up-control__icon\">\n" +
    "        </i>\n" +
    "        <span class=\"cc-go-up-control__text\" bo-text=\"getParentLabel()\"></span>\n" +
    "    </cc-go-up-button>");
}]);

angular.module("src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccLoadingSpinner/ccloadingspinner.tpl.html",
    "<div class=\"cc-loading-spinner\">\n" +
    "    <!-- generated and tweaked from http://cssload.net/ -->\n" +
    "    <div class=\"cc-loading-spinner__circle--01\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--02\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--03\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--04\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--05\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--06\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--07\"></div>\n" +
    "    <div class=\"cc-loading-spinner__circle--08\"></div>\n" +
    "</div>");
}]);

angular.module("src/directives/ccPrice/cc-price.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccPrice/cc-price.tpl.html",
    "<span class=\"cc-price\" ng-class=\"product.hasOldPrice() ? 'cc-price--special' : 'cc-price--basic'\">\n" +
    "    <span class=\"cc-price__price--old\" ng-if=\"product.hasOldPrice()\" ng-bind=\"priceOld | currency\"></span>\n" +
    "    <span class=\"cc-price__price\" ng-bind=\"price | currency\"></span>\n" +
    "</span>");
}]);

angular.module("src/directives/ccSearchField/cc-search-field.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccSearchField/cc-search-field.tpl.html",
    "<span class=\"cc-search-field\">\n" +
    "    <i class=\"cc-search-field__icon--label\"></i>\n" +
    "    <input type=\"text\" class=\"cc-search-field__input\" placeholder=\"{{ placeholderText }}\"\n" +
    "           ng-model=\"_value\" />\n" +
    "    <i class=\"cc-search-field__icon--clear\" ng-click=\"clearValue()\" ng-show=\"hasValue()\"></i>\n" +
    "</span>\n" +
    "");
}]);

angular.module("src/directives/ccSelectBox/cc-select-box.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccSelectBox/cc-select-box.tpl.html",
    "<div class=\"cc-select-box\">\n" +
    "    <span class=\"cc-select-box__value\" ng-class=\"{'cc-select-box__value--choose': !model && chooseText}\" ng-bind=\"displayFn(model) || chooseText\"></span>\n" +
    "    <i class=\"cc-select-box__icon\"></i>\n" +
    "    <select sofa-name=\"propertyName\"\n" +
    "            ng-required=\"{{required}}\"\n" +
    "            class=\"cc-select-box__native\"\n" +
    "            ng-model=\"model\"\n" +
    "            ng-options=\"displayFn(val) for val in data\">\n" +
    "        <option ng-if=\"chooseText\" value=\"\">-- {{chooseText}} --</option>\n" +
    "    </select>\n" +
    "</div>");
}]);

angular.module("src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccThumbnailBar/cc-thumbnail-bar.tpl.html",
    "<ul class=\"cc-thumbnail-bar\">\n" +
    "    <li ng-class=\"$index === selectedImageIndex ? 'cc-thumbnail-bar__item--active' : 'cc-thumbnail-bar__item'\"\n" +
    "        ng-click=\"setSelectedImageIndex($index)\"\n" +
    "        ng-repeat=\"image in images\" style=\"background-image:url('{{ image.url }}');\">\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("src/directives/ccVariantSelector/ccvariantselector.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccVariantSelector/ccvariantselector.tpl.html",
    "<ul class=\"cc-variant-selector\" ng-if=\"variants.length\">\n" +
    "    <li class=\"cc-variant-selector__item\" ng-repeat=\"property in properties\">\n" +
    "        <label class=\"cc-variant-selector__label\" ng-bind=\"property\"></label>\n" +
    "        <cc-select-box\n" +
    "                model=\"selectedProperties[property]\"\n" +
    "                data=\"data[property]\"\n" +
    "                choose-text=\"property\"\n" +
    "                property-name=\"variant_{{property}}\">\n" +
    "        </cc-select-box>\n" +
    "    </li>\n" +
    "</ul>");
}]);

angular.module("src/directives/ccZippy/cc-zippy.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/ccZippy/cc-zippy.tpl.html",
    "<div class=\"cc-zippy\">\n" +
    "    <div class=\"cc-zippy__caption\">\n" +
    "        <span ng-bind=\"caption\"></span>\n" +
    "        <i class=\"cc-zippy-icon\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"cc-zippy__content\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("src/directives/sofaRadioButton/sofa-radio-button.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("src/directives/sofaRadioButton/sofa-radio-button.tpl.html",
    "<div class=\"sofa-radio-button\" ng-class=\"{ 'sofa-radio-button--disabled': disabled }\">\n" +
    "    <input ng-disabled=\"disabled\" type=\"radio\" ng-model=\"model\" id=\"sofa-radio-{{id}}\" value=\"{{value}}\" class=\"sofa-radio-button__input\">\n" +
    "    <label for=\"sofa-radio-{{id}}\" class=\"sofa-radio-button__label\" bindonce bo-text=\"label\"></label>\n" +
    "</div>\n" +
    "");
}]);
