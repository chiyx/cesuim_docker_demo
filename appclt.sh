#!/bin/sh

PROG_NAME=$0
ACTION=$1
CONTAINER_NAME=cesuim_web
CURRENT_DIR=$(cd $(dirname $0);pwd)
DOCKER_CONFIG_DIR="APP-META/docker-config"


usege() {
    echo "$CURRENT_DIR"
    echo "Usage: $PROG_NAME {install|clean|build|restart|stop}"
}

install() {
    cd $CURRENT_DIR/frontend
    yarn install
}

clean() {
    cd $CURRENT_DIR/frontend
    yarn clean
}

build() {
    echo "======yarn build======="
    cd $CURRENT_DIR/frontend
    yarn build
    echo "======docker build======="
    cd $CURRENT_DIR
    docker build -f $DOCKER_CONFIG_DIR/Dockerfile  -t cesuim_docker_demo .
}


stop_container() {
    run_tag=`docker container ls | grep $CONTAINER_NAME`
    if [ -z "$run_tag" ]
    then
        echo "container $CONTAINER_NAME is not in running"
    else
        echo "stopping container $CONTAINER_NAME"
        docker container stop $CONTAINER_NAME
        echo "container $CONTAINER_NAME has stopped."
    fi
}

restart() {
    stop_container
    docker run -it --rm -d -p 80:80 --name $CONTAINER_NAME cesuim_docker_demo
}

buildBase() {
    tag="v1"
    image_name="${CONTAINER_NAME}_base"
    docker build -f $DOCKER_CONFIG_DIR/Dockerfile_base -t $image_name:$tag .
}


main() {
    now=`date "+%Y-%m-%d %H-%M-%S"`
    echo "$now-------------------"
    case "$ACTION" in
        install)
            install
        ;;
        build)
            build
        ;;
        restart)
            restart
        ;;
        clean)
            clean
        ;;
        stop)
            stop_container
        ;;
        buildBase)
            buildBase
        ;;
        *)
            usege
    esac
}

main