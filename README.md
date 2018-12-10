# Passport JWT Practice

This is a repo to practice the Passport tutorial found here: https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport

## What is this?

This is a super basic implementation of Passport and JSON web tokens to create a server that allows you to:
- Create a user account
- Securely log into a user account
- Use the authentication from logging in to access a secure API route

## Why I made this

I really want to understand how to use Passport to set up authentication. Most tutorials start off with something like, "We're going to use Passport and this and that and another thing..." No. I want to understand *Passport*.

So the tutorial linked above is the best thing I've found so far. I'll be using this as a jumping off point for future experimentation while I look for additional resources.

## How do I use this?

Clone the repo, then do an `npm i` in your terminal to install the dependencies. Once all of the modules are installed, run either `node app.js` or simply `nodemon` to get the server up and running.

Since there's no front end (yet), you'll need to use something like Postman to send requests to the API.

### Create a User

In Postman, send a POST request to localhost:3000/signup with a body containing an email and a password, like so:

```
{
  email: "SomeEmail@email.com",
  password: "SomeKindaPassword"
}
```
(Make sure to put the keys in quotes if you're doing the request in raw JSON in Postman.)

### "Log In" as a User

In Postman, send a POST request to localhost:3000/login using the same body that you used for the user creation step.

You should get an object back with a single Token value. That's your JWT that you'll use to access the secure API route.

### Access Secure API Route

In Postman, send a GET request to localhost:3000/user/profile?secret_token=[your Token value from the previous step goes here].

If everything worked, you'll get a response with a JSON object containing a success message along with your account's _id and email.
