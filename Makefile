BINARY_NAME := basic-node-project
PORT := 8000
TAG := latest
# only for mac m1
DOCKER_ARG := --platform linux/amd64 

build-docker: 
	docker build ${DOCKER_ARG} -t $(BINARY_NAME):$(TAG) .
	
run-docker:
	docker run ${DOCKER_ARG} -d -p $(PORT):$(PORT) $(BINARY_NAME)

push-dockerhub:
	docker tag $(BINARY_NAME):$(TAG) tvuong/nodejs-project-demo:$(TAG)
	docker push tvuong/nodejs-project-demo:$(TAG)

push-gcr:
	docker tag $(BINARY_NAME):$(TAG) asia-southeast1-docker.pkg.dev/vertical-realm-410004/trung-repo/$(BINARY_NAME):$(TAG)
	docker push asia-southeast1-docker.pkg.dev/vertical-realm-410004/trung-repo/$(BINARY_NAME):$(TAG)
