COPY skills_domains FROM '/docker-entrypoint-initdb2.d/Domains.csv' DELIMITER ';' CSV HEADER;