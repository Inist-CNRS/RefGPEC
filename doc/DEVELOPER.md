# Developer documentation

## Data conception

![RefGPEC data model](./MCD.png)

[AnalyseSI file](./MCD.asi) used to generate [MCD.png](./MCD.png)

SQL scripts to generate this database are located in the folder [/sql](../sql/) and are executed automaticly at initialisation of container.

The databatase datas are saving in the volume [/data](../data/).

## Configuration Database

#Installation 

Start node, pgadmin and postgresql by running the following commands : 
```sh
make run-debug
```

Check if docker container is running : 

```sh
docker ps 
```
At the moment, you'll have to three running docker (node, postgresql and pgadmin)
![Docker ps](./docker_ps.png)

# Create connection to the database with pgAdmin

Then navigate to PgAdmin via this adress (by default) : [PgAdmin](http://http://localhost:5050/browser/)

Enter your user name and password in the appropriate fields.(The values are in the file [docker-compose.debug.yml](../docker-compose.debug.yml))

By default : email = gpec@inist.fr and password = gpecsecret 

![PgAdmin connection](./pgadmin_login.png)

Now, right-click on the left menu to create a Server :
![PgAdmin creation](./pgadmin_create.png)

Then, Enter any name for your new Server
![PgAdmin name](./pgadmin_name.png)

Next, in the connection tab, Fill out the fields with this parameters : 

| Field | Value By Default | Name in docker-compose.debug.yml |
| ------ | ------ | ------ |
|Host name/adress | refgpec-db | container_name of our postgresql |
|Username | refgpec | POSTGRES_USER |
|Password | gpecsecret | POSTGRES_PASSWORD |

![PgAdmin Form](./pgadmin_form.png)

Now, pgAdmin is connected to our database postgresql located in its container. And we have access to this one.

![PgAdmin Form](./pgadmin_success.png)