FROM node:14.17.0

# Create app directory
RUN mkdir -p /home/Service
WORKDIR /home/Service

# Bundle app source
COPY ../ /home/Service
RUN npm install

EXPOSE 4001
CMD ["npm", "run","start:prod"] 
