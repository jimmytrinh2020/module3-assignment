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
      message: '@',
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
  //console.log("Link scope is: ", scope);
  //console.log("Link element is: ", element);
  //console.log("Link controller is: ", controller);
  scope.$watch('menu.notFound()',function(newValue,oldValue){
      if (newValue == true) {
        displayWarning();
      } else {
        removeWarning();
      }
  });
  function displayWarning() {
    // Using angular jqlite
    var warningElement = element.find("div");
    warningElement.css('display','block');
    console.log(warningElement);
  }

  function removeWarning() {
    // Using angular jqlite
    var warningElement = element.find("div");
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
  menu.searchTerm = "";
  menu.message = "";
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
     console.log("search: ", "'" + menu.searchTerm +"'");
     menu.found = false;
     menu.foundItems = [];
     if (menu.searchTerm.trim() !== "") {
       var search = menu.searchTerm.toLowerCase();
       for (var i=0; i<menu.items.length;i++) {
         if (menu.items[i].description.toLowerCase().indexOf(search) !== -1) {
           menu.foundItems.push(menu.items[i]);
           menu.found = true;
          };
       };
    };
    if (menu.found) {
      menu.message = "";
    } else {
      menu.message = "Nothing Found!";
    };
    //console.log(menu.foundList);
  };

  menu.removeItem = function (itemIndex) {
    menu.foundItems.splice(itemIndex, 1);
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
