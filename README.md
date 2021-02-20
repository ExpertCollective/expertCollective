Use Docker and Docker Compose

Make sure that no service is listening on ports 80 or 443
`sudo lsof -i -P -n | grep LISTEN`

Stop those services
`sudo systemctl stop nginx`

Install Docker

Install Docker Compose

run `docker-compose up -d`

to Stop
run `docker-compose down`

to remove all images
run `docker-compose down rmi all`
