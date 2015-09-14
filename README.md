# interactive-lecture-web-frontend

## Setup
1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly@0.10.11`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm install` to install this project's dependencies
1. Run `bower install` to install client-side dependencies
1. Use [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly) to create additional components

## Gulp tasks
- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
 - **A localhost must be running** - `gulp dev`

## Docker

Docker is the primary distribution channel for this app. While the built-in server from gulp is sufficient for development
purposes, it is not suited for heavy load. Under production circumstances, nginx is the server of choice.
The docker-image cannot (and should not) handle anything other than static content. It's sole purpose is to serve the final product.


### Development Setup

First, you need to install Docker (https://docs.docker.com/installation/).

Next, you need to compile all assets:
```bash
cd /path/to/app
gulp build
```
You can now build the docker-image and run a container:
```bash 
sudo docker build -t user-web-ui-service .
sudo docker run --rm -p 8080:80 --name web-test user-web-ui-service
```
Now open your browser and navigate to `localhost:8080`.
Do note that you may need to specify a different ip-adress if you are using docker-machine.

### Links

Here is a collection of links that might be helpfull.

#### Learning Docker

- https://www.docker.com/userguide/
- http://docs.docker.com/reference/commandline/cli/

#### Learning Nginx

- http://nginx.org/en/docs/beginners\_guide.html

#### Nginx Base Image

- https://hub.docker.com/\_/nginx/
