(function () {
    'use strict';

    angular
        .module('st.search')
        .controller('helpSearchResultCtrl', helpSearchResultCtrl)
        .config(function ($sceProvider) {
            $sceProvider.enabled(false);
        });

    helpSearchResultCtrl.$inject = ['stFacetService', '$scope', '$rootScope', '$location', '$http'];

    function helpSearchResultCtrl(stFacetService, $scope, $rootScope, $location, $http) {
        var vm = this;

        //Scope variables
        vm.facetGroups = stFacetService.facetGroups;

        //Scope functions
        vm.allFAQs = allFAQs;
        vm.hasSearchResults = hasSearchResults;

        vm.selectPreviousPage = SelectPreviousPage;
        vm.selectPreviousAvailable = SelectPreviousAvailable;
        vm.selectNextPage = SelectNextPage;
        vm.selectNextAvailable = SelectNextAvailable;
        vm.updateTitle = updateTitle;
        vm.updateDescription = updateDescription;
        vm.helpfulFormAnswer = helpfulFormAnswer;
        vm.expandCollapseFaq = expandCollapseFaq;

        vm.oldTerm = '';

        //HELPER: Check if a search term is active
        function hasSearchResults() {
            if (!angular.equals(stFacetService.facetGroups, {})) {
                return stFacetService.facetGroups[$scope.helpCtrl.group].term.term;
            }
            return false;
        }

        //Back To All FAQs was selected - deselect all the categories and select All FAQs.
        function allFAQs() {
            stFacetService.facetGroups[$scope.helpCtrl.group].term.id = undefined;
            stFacetService.facetGroups[$scope.helpCtrl.group].term.term = undefined;
        }    

        //Update search header with category name or search result title.
        function updateTitle() {
            var title = '';
            if ($scope.helpCtrl.facetGroups[$scope.helpCtrl.group] === undefined) {
                return title;
            }

            var categories = $scope.helpCtrl.facetGroups[$scope.helpCtrl.group].helpitemcategories;

            categories.forEach(function (cat) {
                if (cat.selected) {
                    title = cat.title;
                }
            });

            //If we have a selection, add pre-cursor text.
            if (stFacetService.facetGroups[$scope.helpCtrl.group].term.term) {
//                if (stFacetService.isTypeAhead[$scope.helpCtrl.group]) {
//                    if (vm.oldTerm !== '') {
//                        title = $scope.helpCtrl.resultsForText + ' "' + vm.oldTerm + '"';
//                    }
//                } else {
                    title = $scope.helpCtrl.resultsForText + ' "' + stFacetService.facetGroups[$scope.helpCtrl.group].term.term + '"';
//                    vm.oldTerm = stFacetService.facetGroups[$scope.helpCtrl.group].term.term;
//                }
//            } else if (!stFacetService.facetGroups[$scope.helpCtrl.group].term.term) {
//                vm.oldTerm = '';
            }

            //Do an check if we need to resize the iFrame
            if ($.fn.iFrameResize) {
                $('.nisource-iframe-widget .ir-iframe').iFrameResize({ checkOrigin: false });
            }

            return title;
        }

        function updateDescription() {
            var description = '';
            if ($scope.helpCtrl.facetGroups[$scope.helpCtrl.group] === undefined) {
                return description;
            }
            
            var categories = $scope.helpCtrl.facetGroups[$scope.helpCtrl.group].helpitemcategories;

            categories.forEach(function (cat) {
                if (cat.selected) {
                    description = cat.description;
                }
            });

            return description;
        }

        function helpfulFormAnswer($event, helpItem, helpful) {
            console.log($event);
            // Analytic event pressing yes/no
            var response = helpful ? 'Yes' : 'No';
            dataLayer.push({'event': 'FAQ_HelpfulResponse', 'FAQ_Title': helpItem.DisplayQuestion, 'FAQ_Response': response});

            $http.get('/nisource-api/ldc/savehelpfulresponse',
                {
                    params: {
                        id: helpItem.IdentityField,
                        helpful: helpful
                    }
                })
                .then(function () {
                    jQuery($event.target).closest('.help-form__form').hide().siblings('.help-form__message').show();
                });
        }

        function expandCollapseFaq(optionIndex, helpItem) {
            // Analytic event expanding or collapsing
            var type = optionIndex ? 'FAQ_Expand' : 'FAQ_Collapse';
            dataLayer.push({'event': type, 'FAQ_Title': helpItem.DisplayQuestion});
        }

        /****************************
         * Pagination functionality
         * --------------------------
         * SelectPreviousPage()
         * SelectNextPage()
         * SelectPreviousAvailable()
         * SelectNextAvailable()
         * getCurrentPageIndex()
         ****************************/
        function SelectPreviousPage() {
            var activeIndex = getCurrentPageIndex();
            if (activeIndex - 1 >= 0) {
                $scope.$parent.ctrl.selectPage($scope.$parent.ctrl.pages[activeIndex - 1]);
            }
        }

        function SelectNextPage() {
            var activeIndex = getCurrentPageIndex();
            if (activeIndex + 1 < $scope.$parent.ctrl.pages.length) {
                $scope.$parent.ctrl.selectPage($scope.$parent.ctrl.pages[activeIndex + 1]);
            }
        }

        function SelectPreviousAvailable() {
            var activeIndex = getCurrentPageIndex();
            if (activeIndex - 1 >= 0) {
                return true;
            }
            else {
                return false;
            }
        }

        function SelectNextAvailable() {
            var activeIndex = getCurrentPageIndex();
            if (activeIndex + 1 < $scope.$parent.ctrl.pages.length) {
                return true;
            }
            else {
                return false;
            }
        }

        function getCurrentPageIndex() {
            var activeIndex = -1;
            angular.forEach($scope.$parent.ctrl.pages, function (page, index) {
                if (page.isActive) {
                    activeIndex = index;
                }
            });
            return activeIndex;
        }
    }
})();
