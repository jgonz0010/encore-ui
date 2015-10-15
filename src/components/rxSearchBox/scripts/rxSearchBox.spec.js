describe('rxSearchBox', function () {
    var scope, compile, rootScope, el, template;

    beforeEach(function () {
        module('encore.ui.rxSearchBox');
        module('templates/rxSearchBox.html');

        inject(function ($location, $rootScope, $compile) {
            rootScope = $rootScope;
            compile = $compile;
        });
    });

    describe('simple invokation', function () {
        template = '<rx-search-box ng-model="testModel"></rx-search-box>';

        describe('given an empty rootScope.testMode', function () {
            beforeEach(function () {
                rootScope.testModel = '';
                el = helpers.createDirective(template, compile, rootScope);
                scope = el.isolateScope();
            });

            it('should have same searchVal as testModel', function () {
                expect(scope.searchVal).to.eq(rootScope.testModel);
            });

            it('should not be clearable', function () {
                expect(scope.isClearable).to.be.false;
            });

            it('should have default placeholder', function () {
                expect(scope.rxPlaceholder).to.eq('Search...');
            });
        });

        describe('given a non-empty rootScope.testModel', function () {
            beforeEach(function () {
                rootScope.testModel = 'hiyoo';
                el = helpers.createDirective(template, compile, rootScope);
                scope = el.isolateScope();
            });

            it('should be clearable', function () {
                expect(scope.isClearable).to.be.true;
            });

            describe('clearSearch()', function () {
                beforeEach(function () {
                    scope.clearSearch();
                });

                it('should set searchVal to empty string', function () {
                    expect(scope.searchVal).to.be.empty;
                });
            });//clearSearch()
        });
    });//simple invokation

    describe('disabled invokation (with non-empty model value)', function () {
        beforeEach(function () {
            template = '<rx-search-box ng-model="testModel" ng-disabled="true"></rx-search-box>';
            rootScope.testModel = 'hiyoo';
            el = helpers.createDirective(template, compile, rootScope);
            scope = el.isolateScope();
            scope.$digest();
        });

        it('should not be clearable', function () {
            expect(scope.isClearable).to.be.false;
        });

        it('should have same searchVal as testModel', function () {
            expect(scope.searchVal).to.eq(rootScope.testModel);
        });
    });

    describe('with custom placeholder', function () {
        beforeEach(function () {
            template = '<rx-search-box ng-model="testModel" rx-placeholder="\'hiyoo\'"></rx-search-box>';
            el = helpers.createDirective(template, compile, rootScope);
            scope = el.isolateScope();
            scope.$digest();
        });

        it('should have expected rxPlaceholder', function () {
            expect(scope.rxPlaceholder).to.eq('hiyoo');
        });
    });
});
