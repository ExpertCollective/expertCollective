Rest service running Python with Django

https://hub.docker.com/_/django


`sudo apt-get install python3-venv`

Create virtual environment, calling it venv

`python3 -m venv venv`

Activate the venv virtual environment

`source venv/bin/activate`

Install python modules

`pip install -r requirements.txt`

Test to reveal where in the environment it's finding python

`which python`

> Initial creation of Django project
> 
> Based on: https://docs.djangoproject.com/en/3.2/intro/tutorial01/
> 
> `django-admin startproject mysite`

Migrate the data

`python mysite/manage.py migrate`

Run the server locally

`python mysite/manage.py runserver`