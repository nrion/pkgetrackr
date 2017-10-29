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



