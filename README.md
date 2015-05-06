# vsHandyStorage
Link data in html form with local or session storage through two directives:

1. declare <b>vs-local-storage</b> or <b>vs-session-storage</b> directive on your form - it creates local or session storage with specified name;		
2. bind any form element with created storage through the <b>vs-link-storage</b> directive declared on element.	
	
You can also bind several forms with one storage.
<h2>Installation</h2>
```html
<script src="https://rawgithub.com/gsklee/ngStorage/master/ngStorage.js"></script>	
<script src="https://rawgit.com/vskosp/vsHandyStorage/v0.2.0/vsHandyStorage.js"></script>
```
<h2>Usage</h2>
1) Add module dependency:
``` javascript
angular.module('yourApp', ['vsHandyStorage']);
```
2) Create storage and set its name through the <b>vs-local-storage</b> (or <b>vs-session-storage</b>) directive:
``` html
<form vs-local-storage="storageName">
</form>
```
3) Bind any form element with created storage through the <b>vs-link-storage</b> directive:
``` html
<form vs-local-storage="storageName">
    <input ng-model="name" type="text" name="name" vs-link-storage>
</form>
```
<b>Important</b>, that the attribute <i>name</i> on the form element matches the field name in the storage.			
<b>Important</b>, that <i>vs-link-storage</i> directive requires declaration of <i>ng-model</i> directive.
