## Usage
Mailchimp Newsletter Embed without leaving the page:
 1. Get your mailchimp subscription url:
    Login > Choose list > Signup Forms > Embedded Forms > Unstyled
    Copy url from <form action=""> and paste into the subscriptionUrl variable in mounted()
    Change 'post?u' to 'post-json?u' (https://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration)
 2. Add your Mailchimp Input names in the JSONP request. E.g. ['EMAIL' | 'LNAME' | 'FNAME']
    Make sure that you used exactely the same names used in the embed code (case-sensitive)
 3. Add all input fields of the defined mailchimp form to the template and use the matching validation rules:
    https://baianat.github.io/vee-validate/guide/rules.html
 4. Test your fields and customize returned success message and emails
    Mailchimp > Form Builder > Translate it
 5. Copy the control locale definitions (see locales/de.json, locales/en.json, locales/fr.json) into the project locale files.

## Install
Mailchimp uses jsonP and form validation. Add the following packages to the project:
```
npm i vue-jsonp --save
npm i vee-validate --save
```