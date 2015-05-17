# vsHandyStorage
Links data in html form with local or session storage through two directives.
	
Can also bind several forms with one storage.

vsHandyStorage uses ngStorage module as a dependency.
## Install

#### [Bower](http://bower.io)
```bash
bower install vs-handy-storage
```
## Usage | [Demo](http://plnkr.co/edit/iX24ba?p=preview)
1) Add vsHandyStorage.js to your index.html

2) Add module dependency:
``` javascript
angular.module('yourApp', ['vsHandyStorage']);
```
3) Create storage and set its name through the <b>vs-local-storage</b> (or <b>vs-session-storage</b>) directive:
``` html
<form vs-local-storage="storageName">
</form>
```
4) Bind any form element with created storage through the <b>vs-link-storage</b> directive:
``` html
<form vs-local-storage="storageName">
    <input ng-model="name" type="text" name="name" vs-link-storage>
</form>
```
<b>Important</b>, that the attribute <i>name</i> on the form element matches the field name in the storage.			
<b>Important</b>, that <i>vs-link-storage</i> directive requires declaration of <i>ng-model</i> directive.
