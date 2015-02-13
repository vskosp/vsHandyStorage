# vsHandyStorage
Handy link your form with local storage.
# Specification
You can bind your form with local storage in 2 steps:

1. declare directive <b>vs-local-storage</b>="<b>name</b>" on your form - it creates storage with specified name.		
2. bind any form element with created storage through directive <b>vs-link-storage</b> declared on element.	
	
You can also bind several forms with one storage.
# Installation
```html
<script src="https://rawgithub.com/gsklee/ngStorage/master/ngStorage.js"></script>	
<script src="https://rawgit.com/polkos1991/vsHandyStorage/v0.1.1/vsHandyStorage.js"></script>
```
# Usage
1) Add module dependency:
``` javascript
angular.module('yourApp', ['vsHandyStorage']);
```
2) Create storage and set its name through the directive <b>vs-local-storage</b>:
``` html
<form vs-local-storage="storageName">
</form>
```
3) Bind any form element with created storage through the directive <b>vs-link-storage</b>:
``` html
<form vs-local-storage="storageName">
    <input ng-model="name" type="text" name="name" vs-link-storage>
</form>
```
<b>Important</b>, that the attribute <i>name</i> on the form element matches the field name in the storage.
