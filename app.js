(function() {
'use strict';  // variables must be declared with a var
angular
.module('MenuItemApp', [])
.controller('MenuItemController', MenuItemController)
.service('MenuItemService', MenuItemService)
.constant('UrlBase',"http://davids-restaurant.herokuapp.com")
.directive('foundList', FoundListDirective);

function FoundListDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '=',
      title: '@myTitle',
      onRemove: '&'
    },
    controller: FoundListDirectiveController,
    controllerAs: 'menu',
    bindToController: true,
    link: FoundListDirectiveLink
  };
  return ddo;
}

function FoundListDirectiveLink(scope, element,attrs,controller) {
  console.log("Link scope is: ", scope);
  console.log("Link element is: ", element);
  console.log("Link controller is: ", controller);
  scope.$watch('menu.notFound()',function(newValue,oldValue){
      if (newValue == true) {
        displayCookieWarning();
      } else {
        removeCookieWarning();
      }
  });
  function displayCookieWarning() {
    // Using angular jqlite
    var warningElement = element.find("div");
    warningElement.css('display','block');
    console.log(warningElement);
  }

  function removeCookieWarning() {
    // Using angular jqlite
    var warningElement = element.find("div.error");
    warningElement.css('display','none');
  }
}

function FoundListDirectiveController() {
  var menu = this;
  menu.notFound = function() {
    return menu.foundItems.length === 0;
  };
}

MenuItemController.$inject = ['MenuItemService'];
function MenuItemController(MenuItemService) {
  var menu = this; // refers to this ShoppingListAddController
  menu.search = "";
  menu.title = "";
  menu.foundItems = [];
  var promise = MenuItemService.getMenuItems();
  promise
  .then(function(response) {
    menu.items = response.data.menu_items;
    //console.log(response.data.menu_items);
  })
  .catch(function(error) {
    console.log("Error in getMenuItems() - " + error) ;
  });

   menu.narrowItems = function () {
     console.log("search: ", "'" + menu.search +"'");
     menu.notFound = true;
     menu.foundItems = [];
     if (menu.search !== "") {
       for (var i=0; i<menu.items.length;i++) {
       //console.log("i" + i + menu.items[i].name);
       //name.toLowerCase().indexOf(menu.search) !== -1
          if (menu.items[i].description.toLowerCase().indexOf(menu.search.toLowerCase()) !== -1) {
            menu.foundItems.push(menu.items[i]);
            menu.notFound = false;
            //console.log(menu.items[i].name);
          };
       };
    } else {
      menu.notFound = true;
    }
    if (menu.notFound) {
      menu.title = "Nothing Found!"
    } else {
      menu.title = "";
    }
    //console.log(menu.foundList);
  };

  menu.removeItem = function (itemIndex) {
    menu.foundItems.splice(itemIndex, 1);
    //menu.title = "Shopping List #1 (" + menu.foundList.length + " items)";
  };
}

MenuItemService.$inject = ['$http','UrlBase'];
function MenuItemService($http, UrlBase) {
  var service = this; // refers to this ShoppingListService
  service.getMenuItems = function() {
    var response = $http({
      method: "GET",
      url: (UrlBase + "/menu_items.json")
    });
    //console.log(response);
    return response;
  };
}

})(); // end module Immediately Invoked Function (IIFE)
