# docker build -t todo:0.1 .
# docker run -d -p 3306:3306 todo:0.1

FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=password

COPY ./sql/database_setup.sql /docker-entrypoint-initdb.d/

EXPOSE 3036