COPY tags FROM '/docker-entrypoint-initdb2.d/tags.csv' DELIMITER ';' CSV HEADER;