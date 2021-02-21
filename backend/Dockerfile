# # pull official base image
# FROM node:12.19.0 as build-stage

# # set working directory
# WORKDIR /frontend

# # add `/app/node_modules/.bin` to $PATH
# # ENV PATH /frontend/node_modules/.bin:$PATH

# # install app dependencies
# COPY frontend/package.json ./
# COPY frontend/package-lock.json ./
# RUN npm install

# # add app
# COPY frontend ./

# # start app
# RUN npm run-script build

# RUN STAGE
FROM bitnami/ruby:2.6-prod-debian-10
RUN apt-get update && apt-get install -y apt-transport-https
RUN apt install -y build-essential patch ruby-dev zlib1g-dev liblzma-dev
RUN apt-get install -y sudo
RUN apt-get install libcurl4-openssl-dev 
RUN apt-get install -y libmariadb-dev-compat

RUN adduser --disabled-password --gecos '' app
RUN adduser app sudo

RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# USER app

# ...put your own build instructions here...
WORKDIR /home/app/
RUN sudo mkdir -m 777 ./webapp

# COPY --chown=app ./ /home/app/webapp/
COPY ./ /home/app/webapp/

# COPY --chown=app --from=build-stage /frontend/build/ /home/app/webapp/public/

# RUN mkdir -p /etc/my_init.d
# ADD start-passenger.sh /etc/my_init.d/20_start-passenger.sh

# Clean up APT when done.
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
WORKDIR /home/app/webapp/
RUN bundle install

CMD ["passenger", "start", "-e production"]