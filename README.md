docker save debian > debian-image.tar
docker load < debian-image.tar


docker-compose up -d --build

#http://172.25.10.13:9876/docs#/Estamp