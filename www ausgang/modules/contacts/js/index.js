angular.module('dwxContacts.modules.contacts', [])

    .config(function ($stateProvider) {
        $stateProvider

            .state('contacts', {
                url: "/contacts",
                templateUrl: "modules/contacts/templates/contactList.tpl.html",
                controller: 'ContactListController'
            })

            /*.state('app.contact', {
                url: "/contacts/:contactId",
                views: {
                    'menuContent' :{
                        templateUrl: "modules/contacts/templates/contactDetails.tpl.html",
                        controller: 'ContactDetailsController'
                    }
                }
            })*/
        ;
    })

    .controller('ContactListController', function($scope) {
        $scope.customers = [];
    })

    .controller('ContactDetailsController', function ($scope, $stateParams) {

    })
;
