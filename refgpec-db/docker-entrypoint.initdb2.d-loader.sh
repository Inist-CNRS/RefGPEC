#!/bin/bash

# loop until the database is ready to accept query
echo "Waiting until postgresql is ready."
ret=1
while [ $ret -gt 0 ]
do
  echo -n "."
  sleep 1
  echo "SELECT datname FROM pg_database"  | psql -v ON_ERROR_STOP=1 --username $POSTGRES_USER --dbname $POSTGRES_DB 2>/dev/null 1>/dev/null
  ret=$?
done
echo ""

# loop over not yet loaded sql contained in /docker-entrypoint-initdb2.d/
# and load SQL when needed
for SQLFILE in /docker-entrypoint-initdb2.d/*.sql; do
  if [ ! -f ${SQLFILE}.loaded ]; then
    echo "Loading -> $SQLFILE"
    touch ${SQLFILE}.loaded
    cat $SQLFILE | psql -v ON_ERROR_STOP=1 --username $POSTGRES_USER --dbname $POSTGRES_DB
    sleep 1
  else
    echo "Skipping -> $SQLFILE (already loaded)"
  fi
done
