angular.module('dwxContacts.modules.data', [])

    .factory('LocalStorageService', function() {
        return {
            get: function(type, key, id) {
                var entities;
                var entitiesString = window.localStorage[type];

                if(entitiesString) {
                    entities = angular.fromJson(entitiesString);
                }

                for(var i=0; i < entities.length; ++i) {
                    if (entities[i].hasOwnProperty(key)) {
                        if (entities[i][key] == id) {
                            return entities[i];
                        }
                    }
                }

                return undefined;
            },
            getAll: function(type) {
                var entitiesString = window.localStorage[type];

                if(entitiesString) {
                    return angular.fromJson(entitiesString);
                }
                return [];
            },
            getAllById: function(type, key, id) {
                console.log('Attempting to fetch %s by id %i', type, id);

                var entities;
                var results = [];

                var entitiesString = window.localStorage[type];

                if(entitiesString) {
                    entities = angular.fromJson(entitiesString);
                }

                for(var i=0; i < entities.length; ++i) {
                    if (entities[i].hasOwnProperty(key)) {
                        if (entities[i][key] == id) {
                            results.push(entities[i]);
                        }
                    }
                }

                return results;
            },
            save: function(type, entities) {
                window.localStorage[type] = angular.toJson(entities);
            },
            addSingle: function(type, entity) {
                var entities;
                var entitiesString = window.localStorage[type];

                if(entitiesString) {
                    entities = angular.fromJson(entitiesString);
                }

                if (entities == undefined) {
                    entities = [];
                }

                entities.push(entity);

                console.log(entities);

                window.localStorage[type] = angular.toJson(entities);
            }
        }
    });