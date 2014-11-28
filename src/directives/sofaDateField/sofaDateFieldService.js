angular.module('sofa.dateField')
    .factory('sofaDateFieldService', function sofaDateFieldService() {

        // Matches a full-date string (e.g., "1980-11-27") as in http://tools.ietf.org/html/rfc3339#page-6
        var DATE_REGEXP = /^[1-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/;

        var self = this;

        self.getDatRegEx = function () {
            return DATE_REGEXP;
        };

        self.splitModel = function (model) {
            var segments = model.split('-');

            return {
                day: segments[2],
                month: segments[1],
                year: segments[0]
            };
        };

        self.isSuitableModel = function (model) {
            return model && model.match(DATE_REGEXP);
        };

        self.getDateString = function (model) {
            return model.year + '-' + model.month + '-' + model.day;
        };

        self.getUpdatedModel = function (newModel) {
            return self.getDateString(newModel);
        };

        self.updateModelController = function (controller, newModel) {
            controller.$setViewValue(self.getDateString(newModel));
        };

        return self;
    });
