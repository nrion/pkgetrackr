<a name="2.2.1"></a>
## 2.2.1 (2017-11-03)


### Bug Fixes

* Add ability to simulate refresh after deleting a customer/package ([3eb4d25](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3eb4d25))
* Convert customer registration form to send via ajax, add page refresh after registration ([ec423f9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ec423f9))
* Fix customer registration submission bug ([a30c404](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a30c404))
* Fix deleting area route input from bottom to top ([42cff5b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/42cff5b))
* Fix deletion of package(s) to also remove the reference from the embedded array in customers ([de0ccf9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/de0ccf9))
* Fix express routes and prefill of dropdowns, route inputs of package edit ([359df7f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/359df7f))
* Fix forgotten method="POST" on customer registration ([44ec5d5](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/44ec5d5))
* Fix getting packages of a certain customer to return the whole package document, and not the ob ([7e879c9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/7e879c9))
* Fix messy navbar into nav pills ([0ca4fca](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ca4fca))
* Fix to retain input value when adding and removing new area to pass ([465c103](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/465c103))
* Modify express route methods for deleting ([4e8b498](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4e8b498))
* Remodel schema design to embedded array of references for customer has many packages ([b904c87](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/b904c87))


### Features

* Add /createPackage & /getPackages express routes ([4852a70](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4852a70))
* Add /getCustomers express route ([fe574f4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/fe574f4))
* Add ability to delete a customer ([3d31f0b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3d31f0b))
* Add ability to register customers ([09d618f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/09d618f))
* Add ability to search for packages ([1371e05](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/1371e05))
* Add ajax for displaying all registered customers in all customers view ([0ffae00](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ffae00))
* Add ajax for displaying packages inside package registration view ([01e2918](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/01e2918))
* Add backend for customer search ([bdcce80](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/bdcce80))
* Add declared value attribute for packages ([e40e3dd](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/e40e3dd))
* Add display for all packages ([21a2f93](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/21a2f93))
* Add doAjax function ([a7ec107](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a7ec107))
* Add edit button functionality for packages ([8adcf26](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/8adcf26))
* Add functionality for edit button of customers ([ed406d7](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ed406d7))
* Add functionality for view packages and view owner button ([c8e917c](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c8e917c))
* Add logout functionality ([9f04299](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9f04299))
* Add major changes in creating packages & enumerating routes (backend & frontend) ([67c483f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/67c483f))
* Add sign in functionality ([2b34f95](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/2b34f95))
* Add spa admin login view ([75ec307](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/75ec307))
* Add spa display all customers view in index.html ([064e691](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/064e691))
* Add spa home view ([d495278](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d495278))
* Add spa package registration view to index.html ([0b53c7e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0b53c7e))
* Add ui for customer search ([c6c295e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c6c295e))
* Add validation fo customer registration form ([b4d917b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/b4d917b))
* Completely modify customer registration view ([9323a6b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9323a6b))
* Initial commit ([3ac58a0](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ac58a0))
* Modify navbar & introduce spa ([3ed62c4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ed62c4))



<a name="2.0.1"></a>
## 2.0.1 (2017-10-30)

* feat: Add /createPackage & /getPackages express routes ([4852a70](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4852a70))
* feat: Add /getCustomers express route ([fe574f4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/fe574f4))
* feat: Add ability to delete a customer ([3d31f0b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3d31f0b))
* feat: Add ability to register customers ([09d618f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/09d618f))
* feat: Add ability to search for packages ([1371e05](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/1371e05))
* feat: Add ajax for displaying all registered customers in all customers view ([0ffae00](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ffae00))
* feat: Add ajax for displaying packages inside package registration view ([01e2918](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/01e2918))
* feat: Add backend for customer search ([bdcce80](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/bdcce80))
* feat: Add declared value attribute for packages ([e40e3dd](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/e40e3dd))
* feat: Add display for all packages ([21a2f93](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/21a2f93))
* feat: Add doAjax function ([a7ec107](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a7ec107))
* feat: Add edit button functionality for packages ([8adcf26](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/8adcf26))
* feat: Add functionality for edit button of customers ([ed406d7](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ed406d7))
* feat: Add functionality for view packages and view owner button ([c8e917c](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c8e917c))
* feat: Add major changes in creating packages & enumerating routes (backend & frontend) ([67c483f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/67c483f))
* feat: Add sign in functionality ([2b34f95](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/2b34f95))
* feat: Add spa admin login view ([75ec307](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/75ec307))
* feat: Add spa display all customers view in index.html ([064e691](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/064e691))
* feat: Add spa home view ([d495278](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d495278))
* feat: Add spa package registration view to index.html ([0b53c7e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0b53c7e))
* feat: Add ui for customer search ([c6c295e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c6c295e))
* feat: Completely modify customer registration view ([9323a6b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9323a6b))
* feat: Initial commit ([3ac58a0](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ac58a0))
* feat: Modify navbar & introduce spa ([3ed62c4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ed62c4))
* docs: Update changelog ([af199a0](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/af199a0))
* docs: Update changelog ([350c8b8](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/350c8b8))
* docs: Update changelog ([5f6a1d9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/5f6a1d9))
* docs: Update changelog ([910541a](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/910541a))
* docs: Update changelog ([18cd0cc](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/18cd0cc))
* fix: Add ability to simulate refresh after deleting a customer/package ([3eb4d25](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3eb4d25))
* fix: Convert customer registration form to send via ajax, add page refresh after registration ([ec423f9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ec423f9))
* fix: Fix deleting area route input from bottom to top ([42cff5b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/42cff5b))
* fix: Fix deletion of package(s) to also remove the reference from the embedded array in customers ([de0ccf9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/de0ccf9))
* fix: Fix express routes and prefill of dropdowns, route inputs of package edit ([359df7f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/359df7f))
* fix: Fix forgotten method="POST" on customer registration ([44ec5d5](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/44ec5d5))
* fix: Fix getting packages of a certain customer to return the whole package document, and not the ob ([7e879c9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/7e879c9))
* fix: Fix messy navbar into nav pills ([0ca4fca](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ca4fca))
* fix: Fix to retain input value when adding and removing new area to pass ([465c103](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/465c103))
* fix: Modify express route methods for deleting ([4e8b498](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4e8b498))
* fix: Remodel schema design to embedded array of references for customer has many packages ([b904c87](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/b904c87))
* feat(Add remove feature for customer's packages): ([abb3c60](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/abb3c60))
* refactor(Enclose most codes in registration view in functions to make it dry): ([93c7f71](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/93c7f71))
* refactor(Refactor codes for displaying things in database view and showing modals): ([5640a13](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/5640a13))
* refactor: Add ability to create package for a user-selected customer ([81e503c](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/81e503c))
* refactor: Add ability to delete all packages of a customer in single customer deletion ([6a6d84b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/6a6d84b))
* refactor: Combine insert and update customer codes into one for dryness ([f1f8964](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/f1f8964))
* refactor: Dry codes up in main.js and fix the buttons of cards ([44793c1](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/44793c1))
* refactor: Fix package registration form & package search results formatting ([a79761a](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a79761a))
* refactor: Fix repeatative code and modify ui in displaying customers & packages ([9aee10b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9aee10b))
* refactor: Modify /createCustomer express route ([14c33c8](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/14c33c8))
* refactor: Refactor adding and removing input for areas to pass ([d0be9cc](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d0be9cc))
* refactor: Refactor overall ui look and dried up some script ([5117a18](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/5117a18))
* refactor: Refactor the codes displaying customers and packages ([3b561e2](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3b561e2))
* style: Change to local bootstrap & support for glyphicons using font-awesome ([d8d4422](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d8d4422))
* style: Change ui for displaying packages & add changelog.md ([983b5c9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/983b5c9))
* style: Improve all customers view ui ([4f517a4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4f517a4))



<a name="1.3.1"></a>
## 1.3.1 (2017-10-29)


### Bug Fixes

* Add ability to simulate refresh after deleting a customer/package ([3eb4d25](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3eb4d25))
* Convert customer registration form to send via ajax, add page refresh after registration ([ec423f9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ec423f9))
* Fix deleting area route input from bottom to top ([42cff5b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/42cff5b))
* Fix deletion of package(s) to also remove the reference from the embedded array in customers ([de0ccf9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/de0ccf9))
* Fix express routes and prefill of dropdowns, route inputs of package edit ([359df7f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/359df7f))
* Fix forgotten method="POST" on customer registration ([44ec5d5](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/44ec5d5))
* Fix getting packages of a certain customer to return the whole package document, and not the ob ([7e879c9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/7e879c9))
* Fix messy navbar into nav pills ([0ca4fca](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ca4fca))
* Fix to retain input value when adding and removing new area to pass ([465c103](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/465c103))
* Modify express route methods for deleting ([4e8b498](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4e8b498))
* Remodel schema design to embedded array of references for customer has many packages ([b904c87](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/b904c87))


### Features

* Add /createPackage & /getPackages express routes ([4852a70](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4852a70))
* Add /getCustomers express route ([fe574f4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/fe574f4))
* Add ability to delete a customer ([3d31f0b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3d31f0b))
* Add ability to register customers ([09d618f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/09d618f))
* Add ability to search for packages ([1371e05](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/1371e05))
* Add ajax for displaying all registered customers in all customers view ([0ffae00](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ffae00))
* Add ajax for displaying packages inside package registration view ([01e2918](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/01e2918))
* Add backend for customer search ([bdcce80](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/bdcce80))
* Add declared value attribute for packages ([e40e3dd](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/e40e3dd))
* Add display for all packages ([21a2f93](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/21a2f93))
* Add doAjax function ([a7ec107](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a7ec107))
* Add edit button functionality for packages ([8adcf26](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/8adcf26))
* Add functionality for edit button of customers ([ed406d7](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ed406d7))
* Add functionality for view packages and view owner button ([c8e917c](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c8e917c))
* Add major changes in creating packages & enumerating routes (backend & frontend) ([67c483f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/67c483f))
* Add spa admin login view ([75ec307](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/75ec307))
* Add spa display all customers view in index.html ([064e691](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/064e691))
* Add spa home view ([d495278](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d495278))
* Add spa package registration view to index.html ([0b53c7e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0b53c7e))
* Add ui for customer search ([c6c295e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c6c295e))
* Completely modify customer registration view ([9323a6b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9323a6b))
* Initial commit ([3ac58a0](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ac58a0))
* Modify navbar & introduce spa ([3ed62c4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ed62c4))



<a name="1.2.0"></a>
# 1.2.0 (2017-10-28)


### Bug Fixes

* Add ability to simulate refresh after deleting a customer/package ([3eb4d25](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3eb4d25))
* Convert customer registration form to send via ajax, add page refresh after registration ([ec423f9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ec423f9))
* Fix deletion of package(s) to also remove the reference from the embedded array in customers ([de0ccf9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/de0ccf9))
* Fix forgotten method="POST" on customer registration ([44ec5d5](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/44ec5d5))
* Fix getting packages of a certain customer to return the whole package document, and not the ob ([7e879c9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/7e879c9))
* Fix messy navbar into nav pills ([0ca4fca](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ca4fca))
* Remodel schema design to embedded array of references for customer has many packages ([b904c87](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/b904c87))


### Features

* Add /createPackage & /getPackages express routes ([4852a70](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4852a70))
* Add /getCustomers express route ([fe574f4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/fe574f4))
* Add ability to delete a customer ([3d31f0b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3d31f0b))
* Add ability to register customers ([09d618f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/09d618f))
* Add ability to search for packages ([1371e05](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/1371e05))
* Add ajax for displaying all registered customers in all customers view ([0ffae00](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ffae00))
* Add ajax for displaying packages inside package registration view ([01e2918](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/01e2918))
* Add backend for customer search ([bdcce80](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/bdcce80))
* Add declared value attribute for packages ([e40e3dd](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/e40e3dd))
* Add display for all packages ([21a2f93](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/21a2f93))
* Add doAjax function ([a7ec107](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a7ec107))
* Add functionality for view packages and view owner button ([c8e917c](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c8e917c))
* Add major changes in creating packages & enumerating routes (backend & frontend) ([67c483f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/67c483f))
* Add spa admin login view ([75ec307](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/75ec307))
* Add spa display all customers view in index.html ([064e691](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/064e691))
* Add spa home view ([d495278](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d495278))
* Add spa package registration view to index.html ([0b53c7e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0b53c7e))
* Add ui for customer search ([c6c295e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c6c295e))
* Completely modify customer registration view ([9323a6b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9323a6b))
* Initial commit ([3ac58a0](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ac58a0))
* Modify navbar & introduce spa ([3ed62c4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ed62c4))



<a name="1.0.0"></a>
# 1.0.0 (2017-10-27)


### Bug Fixes

* Add ability to simulate refresh after deleting a customer/package ([3eb4d25](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3eb4d25))
* Convert customer registration form to send via ajax, add page refresh after registration ([ec423f9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/ec423f9))
* Fix deletion of package(s) to also remove the reference from the embedded array in customers ([de0ccf9](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/de0ccf9))
* Fix forgotten method="POST" on customer registration ([44ec5d5](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/44ec5d5))
* Fix messy navbar into nav pills ([0ca4fca](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ca4fca))
* Remodel schema design to embedded array of references for customer has many packages ([b904c87](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/b904c87))


### Features

* Add /createPackage & /getPackages express routes ([4852a70](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/4852a70))
* Add /getCustomers express route ([fe574f4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/fe574f4))
* Add ability to delete a customer ([3d31f0b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3d31f0b))
* Add ability to register customers ([09d618f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/09d618f))
* Add ability to search for packages ([1371e05](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/1371e05))
* Add ajax for displaying all registered customers in all customers view ([0ffae00](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0ffae00))
* Add ajax for displaying packages inside package registration view ([01e2918](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/01e2918))
* Add backend for customer search ([bdcce80](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/bdcce80))
* Add declared value attribute for packages ([e40e3dd](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/e40e3dd))
* Add display for all packages ([21a2f93](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/21a2f93))
* Add doAjax function ([a7ec107](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/a7ec107))
* Add major changes in creating packages & enumerating routes (backend & frontend) ([67c483f](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/67c483f))
* Add spa admin login view ([75ec307](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/75ec307))
* Add spa display all customers view in index.html ([064e691](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/064e691))
* Add spa home view ([d495278](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/d495278))
* Add spa package registration view to index.html ([0b53c7e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/0b53c7e))
* Add ui for customer search ([c6c295e](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/c6c295e))
* Completely modify customer registration view ([9323a6b](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/9323a6b))
* Initial commit ([3ac58a0](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ac58a0))
* Modify navbar & introduce spa ([3ed62c4](https://gitlab.com/ronnamaeffirmo/pkgetrackr/commit/3ed62c4))



