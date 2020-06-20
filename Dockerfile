# pull official base image
FROM tiangolo/node-frontend:10 as build-stage

# set working directory
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY backend/frontend/package.json ./
COPY backend/frontend/package-lock.json ./
RUN npm install

# add app
COPY backend/frontend/ ./

# start app
RUN npm run build

# RUN STAGE
FROM phusion/passenger-customizable

# Set correct environment variables.
ENV HOME /root

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# opt in for ruby support
RUN /pd_build/ruby-2.7.1.sh

# ...put your own build instructions here...
RUN mkdir /home/app/webapp/
COPY ./backend/ /home/app/webapp/

COPY --from=build-stage /frontend/build/ /home/app/webapp/public/
USER app
WORKDIR /home/app/webapp/
RUN bundler install
USER root

RUN mkdir -p /etc/my_init.d
ADD start-passenger.sh /etc/my_init.d/20_start-passenger.sh

# Clean up APT when done.
# RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*