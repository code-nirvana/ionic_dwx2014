var SelectionModalState = {
    Hidden: 0,
    Opened: 1,
    Aborted: 2,
    Applied: 3
};

var generateLocalDemoDataFirst = false;

angular.module('dwxContacts.modules.contacts', [])

    .config(function ($stateProvider) {
        $stateProvider

            .state('app.contacts', {
                url: "/contacts",
                views: {
                    'menuContent': {
                        templateUrl: "modules/contacts/templates/contactList.tpl.html",
                        controller: 'ContactListController'
                    }
                }
            })

            .state('app.contact', {
                url: "/contacts/:contactId",
                views: {
                    'menuContent': {
                        templateUrl: "modules/contacts/templates/contactDetail.tpl.html",
                        controller: 'ContactDetailsController'
                    }
                }
            })
        ;
    })

    .controller('ContactListController', function($scope, $ionicModal, LocalStorageService, $timeout, $filter) {
        var orderBy = $filter('orderBy');

        $scope.contacts = [];

        $timeout(function () {
            if (generateLocalDemoDataFirst) {
                var contacts = [];

                for (var i=0; i<1000; ++i) {
                    contacts.push({
                        id: i,
                        firstName: Faker.Name.firstName(),
                        lastName: Faker.Name.lastName(),
                        phone: Faker.PhoneNumber.phoneNumber(),
                        email: Faker.Internet.email()
                    })
                }

                LocalStorageService.save('Contacts', contacts);

                $scope.contacts = orderBy(LocalStorageService.getAll('Contacts'));

            } else {
                $scope.contacts = orderBy(LocalStorageService.getAll('Contacts'));
            }
        });

        $ionicModal.fromTemplateUrl('modules/contacts/templates/contactNewEdit.tpl.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (contactNewEditModal) {
            $scope.contactNewEditModal = contactNewEditModal;
        });

        $scope.contactNewEditModalData = {
            caption: '',
            contact : {},
            modalState: SelectionModalState.Hidden
        };

        $scope.getItemHeight = function(item, index) {
            return 50;
        };

        $scope.addContact = function() {

            $scope.contactNewEditModalData.caption = 'Neuer Kontakt';
            $scope.contactNewEditModalData.modalState = SelectionModalState.Opened;

            $scope.contactNewEditModal.show();
        };

        $scope.search = "";
        $scope.cancelSearch = function () {
            console.log('cancel search');
            $scope.search = null;
        };

        $scope.$on('modal.hidden', function () {
            if ($scope.contactNewEditModalData.modalState != SelectionModalState.Hidden) {
                if ($scope.contactNewEditModalData.modalState == SelectionModalState.Applied) {
                    if ($scope.contactNewEditModalData.contact.id == undefined) {

                        if ($scope.contacts.length >= 0) {
                            $scope.contactNewEditModalData.contact.id = $scope.contacts.length + 1;
                        } else {
                            $scope.contactNewEditModalData.contact.id = 1;
                        }


                        LocalStorageService.addSingle('Contacts', $scope.contactNewEditModalData.contact);
                        $scope.contacts.push($scope.contactNewEditModalData.contact);

                    }
                }

                $scope.contactNewEditModalData.modalState = SelectionModalState.Hidden;
                $scope.contactNewEditModalData.showCustomerList = false;
            }
        });
    })

    .controller('ContactDetailsController', function ($scope, $stateParams, LocalStorageService) {
        $scope.contact = LocalStorageService.get('Contacts', 'id', parseInt($stateParams.contactId));

        console.log($scope.contact);
    })

    .controller('ContactNewEditController', function($scope) {
        $scope.abortContactNewEdit = function() {
            $scope.contactNewEditModalData.modalState = SelectionModalState.Aborted;

            $scope.contactNewEditModal.hide();
        }

        $scope.applyContactNewEdit = function() {
            $scope.contactNewEditModalData.modalState = SelectionModalState.Applied;

            $scope.contactNewEditModal.hide();
        }
    })
;
