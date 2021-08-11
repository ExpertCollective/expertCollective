Use Docker and Docker Compose

Make sure that no service is listening on ports 80 or 443
`sudo lsof -i -P -n | grep LISTEN`

Stop those services
`sudo systemctl stop nginx`

Install Docker

Install Docker Compose
`apt install docker-compose`

to build all Docker images
run `docker-compose up --build`

to run with logging
run `docker-compose up`

to run in a detached mode.
run `docker-compose up -d`

to Stop
run `docker-compose down`

to remove all images
run `docker-compose down --rmi all`

list the docker images `docker image list`
REPOSITORY TAG IMAGE ID CREATED SIZE
expertcollective_nginx latest 8391e8406257 7 minutes ago 133MB
expertcollective_webservice latest 5da531e93393 28 minutes ago 218MB
<none> <none> 8776be58a542 28 minutes ago 133MB
expertcollective_web latest f8967bab98ee 28 minutes ago 2.38GB
<none> <none> 54ac451a5482 2 hours ago 133MB
nginx latest 35c43ace9216 4 days ago 133MB
mhart/alpine-node 13.8 33b0d13252d4 12 months ago 107MB
gmathieu/node-browsers 3.0.0 05fc805cbaf8 2 years ago 1.37GB

Save the docker images as tars

`docker save -o expertcollective_web.tar expertcollective_web`

`docker save -o nginx.tar nginx`

`docker save -o expertcollective_webservice.tar expertcollective_webservice`

`docker save -o expertcollective_restservice.tar expertcollective_restservice`

use `scp` to secure copy/paste the files needed for the docker images to run on the server.

`scp expertcollective_web.tar root@165.227.120.116:/home/eccdeploy`

`scp nginx.tar root@165.227.120.116:/home/eccdeploy`

`scp expertcollective_webservice.tar root@165.227.120.116:/home/eccdeploy`

`scp expertcollective_restservice.tar root@165.227.120.116:/home/eccdeploy`

`scp docker-compose.yml root@165.227.120.116:/home/eccdeploy`

`scp -r controller root@165.227.120.116:/home/eccdeploy`

`scp -r ./server/Dockerfile root@165.227.120.116:/home/eccdeploy/server`

`scp -r ./server/build root@165.227.120.116:/home/eccdeploy/server`

`scp -r ./restservice/Dockerfile root@165.227.120.116:/home/eccdeploy/restservice`

verify with : `tree -D`

-- `scp nginx.conf root@165.227.120.116:/home/eccdeploy/client`

`su - eccdeploy`

Load docker images from the tar

`sudo docker load -i expertcollective_web.tar`

`sudo docker load -i nginx.tar`

`sudo docker load -i expertcollective_webservice.tar`

`sudo docker load -i expertcollective_restservice.tar`

`docker-compose down`

`docker-compose up -d`

`docker ps`

Explore nginx configuration:

`docker exec -it eccdeploy_nginx_1 /bin/sh`

`cd etc/nginx`

`cat nginx.conf`

To exit: `Ctrl+p` & `Ctrl+q`

or `Ctrl+d`

or type `exit`

To check email contacts:

`docker exec -it eccdeploy_webservice_1 /bin/sh`

`cd contact-info/` --> `/usr/src/app/contact-info/`

`ls -all`

`cat <filename>`

`exit`
