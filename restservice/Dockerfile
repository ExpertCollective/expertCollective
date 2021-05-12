FROM python:3.9.5

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copying out source code
COPY mysite mysite

EXPOSE 9000
CMD ["python", "mysite/manage.py", "runserver", "0.0.0.0:9000"]