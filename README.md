# Angular-form-error

Angular-form-error is a helper directive to add CSS classes to your markup
depending on the validation state of the form and form fields.

```html
    <div form-error="'email'" class="form-group">
        <label>Email address</label>
        <input name="email" ng-model="data.email" type="email" required class="form-control">
    </div>
```

The directive needs the input name (``name=...``) and will set the CSS class 
``form-error`` when the field is invalid AND the field is dirty OR the form is
submitted.

You can change the default behaviour by using the ``form-error-logic`` 
attribute.

```html
<div form-error="'name'" form-error-logic="alternativeLogic" class="form-group">
```

Define the CSS class(es) and logic in your controller:
```javascript
$scope.alternativeLogic = {
    'has-error': function(field, form) {
        return field.invalid && form.submitted
    }
};
```