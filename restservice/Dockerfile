FROM python:3.9.5 AS builder

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY flaskr flaskr

ENV FLASK_APP flaskr
ENV FLASK_ENV development
RUN flask init-db

# Copying out source code
# COPY loa loa

FROM builder AS runner

EXPOSE 9000
ENV FLASK_APP flaskr
ENV FLASK_ENV development
CMD [ "flask", "run", "--host", "0.0.0.0", "--port", "9000" ]
