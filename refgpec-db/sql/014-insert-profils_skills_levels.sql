COPY profils_skills_levels FROM '/docker-entrypoint-initdb2.d/profils_skills.csv' DELIMITER ';' CSV HEADER;
