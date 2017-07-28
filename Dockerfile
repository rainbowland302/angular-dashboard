# Usage (given build times depend on machine):
#
#    Build SMALL image (no cache; ~20MB, time for build=rebuild = ~360s):
#    docker build --squash="true" -t angular-starter .
#
#    Build FAST (rebuild) image (cache; >280MB, build time ~360s, rebuild time ~80s):
#    docker build -t angular-starter .
#
#    Clean (remove intermidiet images):
#    docker rmi -f $(docker images -f "dangling=true" -q)
#
#    Run image (on localhost:8080):
#    docker run --name angular-starter -p 8080:80 angular-starter &
#
#    Run image as virtual host (read more: https://github.com/jwilder/nginx-proxy):
#    docker run -e VIRTUAL_HOST=angular-starter.your-domain.com --name angular-starter angular-starter &

# Base Image
FROM node:7.10.1-alpine

COPY . /app
WORKDIR /app
RUN npm install &&\
    npm run build:prod &&\
    rm -rf src &&\

# this is for virtual host purposes
# EXPOSE 80
CMD npm run server:node
