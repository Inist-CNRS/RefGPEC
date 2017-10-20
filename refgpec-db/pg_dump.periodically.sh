#!/bin/bash
# script looping indefinitly and doing each X hours
# a postgresql dump into /sqldump folder

while true
do
  # loop until the database is ready to accept query
  echo -n "Waiting until postgresql is ready to run pg_dump ."
  ret=1
  while [ $ret -gt 0 ]
  do
    echo -n "."
    sleep 1
    echo "SELECT datname FROM pg_database"  | psql -v ON_ERROR_STOP=1 --username $POSTGRES_USER --dbname $POSTGRES_DB 2>/dev/null 1>/dev/null
    ret=$?
  done

  BACKUP_FILE=/sqldump/dump.$(date '+%Y-%m-%d_%Hh%M').sql
  echo "Running backup through pg_dump: $BACKUP_FILE"
  pg_dump --username=$POSTGRES_USER $POSTGRES_DB > $BACKUP_FILE
  
  echo "Cleaning old backup."
  tmpreaper --verbose ${PGDUMP_CLEANUP_MORE_THAN_NBDAYS}d /sqldump

  echo "Waiting $PGDUMP_EACH_NBHOURS hours before next backup."
  sleep ${PGDUMP_EACH_NBHOURS}h
done