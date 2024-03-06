.PHONY: mongo-start
mongo-start:
	if docker ps -a --format '{{.Names}}' | grep -q '^mongodb$$'; then \
		docker start mongodb; \
	else \
		docker run --name mongodb -p 27017:27017 -d mongo:latest; \
	fi

.PHONY: mongo-kill
mongo-kill:
	sudo docker rm -f mongodb

.PHONY: install-dep
install-dep:
	cd DCM-back && npm install
	cd DCM-ElectronApp && npm install
	cd DCM-front-v3 && npm install

.PHONY: start-app
start-app:
	cd DCM-ElectronApp && npm start

.PHONY: setup
setup: 
	install-dep mongo-start start-app

.PHONY: test
test:
	cd DCM-back && make db-up
	cd DCM-back && npm run test
