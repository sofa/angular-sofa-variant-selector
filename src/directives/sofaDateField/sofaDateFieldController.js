angular.module('sofa.dateField')
    .controller('sofaDateFieldController', ['localeService', function sofaDateFieldController(localeService) {
        this.ln = localeService.getTranslation('sofaDateField');
    }]);
