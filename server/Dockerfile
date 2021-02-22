FROM mhart/alpine-node:13.8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install 


ENV PATH="./node_modules/.bin:$PATH" 

# Copy the actual app's code
COPY . .
#RUN npm run build
CMD [ "npm", "run", "tscRun" ]

#EXPOSE 8000