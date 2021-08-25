# Introduction 

Before going into the tutorial, let's first know what is SAWO. 

**SAWO** is an authentication system that allows users to be onboarded without the need of passwords or one-time passwords, making the process simple, quick, and safe. SAWO employs a powerful cryptography-based authenticator that outperforms OTPs, passwords, and social logins.

In simple words , SAWO lets you add a authentication system that works without passwords or OTP. 

__In more simplar words__, You must have seen login forms with username & password , now that's got old. Sawo vanishes that password field in a more safe, efficient & realible way.

In one line , **Login without password.**


Okay , so now come back to our tutorial.

# What will you be getting?

A ready to plug starter Django project with **SAWO's auth ready to use**.

![6fhuf](https://user-images.githubusercontent.com/64596494/130737648-b1781578-82e2-4476-8d11-25f80166e269.PNG)


For instance, you may visit in any one of the below URLs.

+ **Heroku**  : []()

+ **Repl** : []()


# Get Started

Let me give you a brief intro of what we will be going through in this post.

Believe me after reading this post you will be able to integrate SAWO in Django with ease.


## Requirements

Python, Django installed on your machine and creating a virtual environment would be great!

> Quick tip:

`$ python -m venv env`

`$ source env/bin/activate`


## Prerequisite 

+ Create a account on sawo's dev console by [visiting here](https://dev.sawolabs.com/).
+ Now create a project in your **Sawo's dev** console.

![tht](https://user-images.githubusercontent.com/64596494/130737730-a540627b-982e-454d-91e1-f40c35cc8bec.PNG)


+ After creating a project , you will have these **four things.**

![hjh](https://user-images.githubusercontent.com/64596494/130420017-a1d57404-e6b0-4a2d-b9bd-f486d1e8a9f9.PNG)

+ Set you hostname , for example let say for local testing set it as `localhost`, Avoid adding any port or protocol, otherwise it will not work!
+ Copy your `API KEY` for this tutorial. 

## Installing Sawo

Install the sawo package using python package manager.

```
pip install sawo
```

Import all the required methods which will come handy in our tutorial.

```py
createTemplate, getContext, verifyToken
```

Now as instructed in the official sawo docs place this line 

```
createTemplate("<filepath>")
```

**for example **

```
createTemplate("templates/partials")
```

This will create a directory in your django project, which then afterwards you may easily include into your app's templates.

**Using below tag:**

```
{% include "partials/_sawo.html" %}
```

# The Plan

+ Importing all the basic methods from django & others important packages such as json etc.
+ Basic Class based views for authentication.
+ Sending & recieving the payload.
+ Verifying the JWT tokens at the backend side.
+ Registering URL Patterns.
+ Deploying the project on heroku & repl, yes both!


# What are the goals

This app will act as a boilerplate app for your next Sawo django app.
This is a ready to integrate project backed with the authentication part, which you may futher customize accordingly.

# Getting things ready

Below are the steps to get it run live on your local server.

+ Clone this repo 

```
git clone https://github.com/abhiprojectz/Dj-Sawo-Starter

```

+ Migrate to create the DB table for storing users into database.

```
python manage.py runserver

```

+ Add your API key in the `.env` file.

```
API_KEY = 76d8cca5-6b7e-4cb4-******

```

+ Test it live 

```
python manage.py runserver
```

Great! Everything is ready to build your next web app in Django with passwordless authentication.


# Things to note

You may add the host if you wanna deploy the app somewhere.

```
ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    '__deployed_host__',
]
```

> Replace `__deployed_host__` with your own host.


# Deploying on heroku

## Prerequisite 

Create a [account on heroku](https://id.heroku.com/login) within a free tier.

Now visit [ Apps dashboard](https://dashboard.heroku.com/apps) and create a app 

You may either connect to your gitHub repo or may use **Heroku CLI**.

Now as you have the app with you , lets add the **environment variables** , again you  may use Heroku CLI or directly add via the UI.

![yhydf](https://user-images.githubusercontent.com/64596494/130635613-2e11ab92-abb0-44c4-8d93-cf0426e03118.PNG)

Fine ,Now everything is ready to run.


# Deploying on Relp

Create a new repl by importing from github repo 

![yhyh](https://user-images.githubusercontent.com/64596494/130646438-26052d40-a2e6-46e0-b82f-62fbec2b5327.PNG)


Then create a `.replt` file and put the below:

```
language = "python3"
run = "bash main.bash"
```
Here we specify what to run in the console , like which commands.


Create a file with name `main.bash `

```
pip install -r requirements.txt
python manage.py runserver 0.0.0.0:8000
```

> Specifying a port on repl is a must in case of django.

Alternatevly you may just put the main command in `run` variable that is:

```
run="python manage.py runserver 0.0.0.0:8000" 
```

The reason for **creating a bash file** is that it will enable you to **run multiple shell commands.**


Create a pip packages lock file once

```
cat requirements.txt|xargs poetry add
```

This will create a `poetry.lock` file , with all your dependencies listed.
Moreover, Poetry lock package is a simple tool to create a Python package from a Poetry project which pins down all the versions from the poetry. lock file as a dependency.

# Conclusion

This is how you can intgrate SAWO's passwordless authentication into your Django project.

If this helps then U , don't forget to give it a share!

Happy Hacking !