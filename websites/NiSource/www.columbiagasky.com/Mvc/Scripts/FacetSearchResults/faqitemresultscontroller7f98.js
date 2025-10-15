(function () {
    'use strict';

    angular
        .module('st.search')
        .controller('faqItemResultCtrl', faqItemResultCtrl);

    faqItemResultCtrl.$inject = ['stFacetService', '$scope', '$rootScope', '$location'];

    function faqItemResultCtrl(stFacetService, $scope, $rootScope, $location) {
        var vm = this;

        //Scope variables
        vm.parentItems = $scope.$parent.facet.items;

        //Scope functions
        vm.checkAllFAQs = checkAllFAQs;
        vm.checkCategory = checkCategory;

        //AllFAQs is selected, so unselect all the categories and select AllFAQs
        function checkAllFAQs() {
            vm.parentItems.clearSelected();
            removeQuery();
            vm.allFAQSelected = true;
        }

        //A category was checked, uncheck all FAQs and remove any search terms
        function checkCategory() {
            vm.allFAQSelected = false;
            removeQuery();
        }

        //Handles interaction of search terms and UI updating
        $rootScope.$on('stSearchUpdated', function (evt, group, name, value) {

            //Make sure this is an update in regards to a term search
            if (name === 'term') {

                //User is leaving a term search by hitting either "back to all faqs" 
                //or they are selecting a category option
                if (value === null) {

                    if (hasCategorySelected()) {
                        //if selecting a category do nothing (search library handles it)
                    } else {
                        //if they hit go back to all faq, then activate it
                        vm.allFAQSelected = true;
                    }

                //user is entering a new term search, remove category selections
                } else {
                    vm.parentItems.clearSelected();
                    vm.allFAQSelected = true;
                }
            }
        });

        //HELPER: Check if a search term is active
        function hasSearchResults() {
            if (stFacetService.facetGroups[$scope.faqitem.group] &&
                stFacetService.facetGroups[$scope.faqitem.group].term &&
                stFacetService.facetGroups[$scope.faqitem.group].term.term) {
                return stFacetService.facetGroups[$scope.faqitem.group].term.term;
            }
            return false;
        }

        //HELPER: Check if a category is selected
        function hasCategorySelected() {
            var selected = false;
            vm.parentItems.forEach(function (item) {
                if (item.selected) {
                    selected = true;
                }
            });
            return selected;
        }

        //HELPER: removes search term
        function removeQuery() {
            if (stFacetService.facetGroups[$scope.faqitem.group] &&
                stFacetService.facetGroups[$scope.faqitem.group].term &&
                stFacetService.facetGroups[$scope.faqitem.group].term.id) {
                stFacetService.facetGroups[$scope.faqitem.group].term.id = undefined;
            }
            if (stFacetService.facetGroups[$scope.faqitem.group] &&
                stFacetService.facetGroups[$scope.faqitem.group].term &&
                stFacetService.facetGroups[$scope.faqitem.group].term.term) {
                stFacetService.facetGroups[$scope.faqitem.group].term.term = undefined;
            }
        }

        //Check to see if a category is selected at load OR if a search term is specifed, otherwise select All FAQs.
        function activate() {
            var anySelected = false;

            if (hasSearchResults() || hasCategorySelected()) {
                anySelected = true;
            }

            if (anySelected) {
                //an item is already selected on load, let search library handle it
            } else {
                //an item is not selected on load - set All FAQs as selected
                vm.allFAQSelected = true;
            }
        }

        $rootScope.$on('stFacetsInit', function (e, values, groups) {
            activate();
        });
    }
})();
