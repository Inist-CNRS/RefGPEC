

docker run --name refgpec-db \
           -e POSTGRES_DB=refgpec \
           -e POSTGRES_USER=refgpec \
           -e POSTGRES_PASSWORD=gpecsecret \
           -e PGDATA=/var/lib/postgresql/data \
           -v $(pwd)/data/postgres:/var/lib/postgresql/data \
           -d -p 5432:5432 postgres:9.6.3 

docker run --name refgpec-db-admin \
           -e DEFAULT_USER=gpec@inist.fr \
           -e DEFAULT_PASSWORD=gpecsecret \
           --link refgpec-db -d -p 5050:5050 fenglc/pgadmin4:1.6