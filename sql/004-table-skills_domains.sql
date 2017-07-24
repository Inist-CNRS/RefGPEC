DROP TABLE IF EXISTS skills_domains CASCADE;
CREATE TABLE skills_domains (
sd_code VARCHAR(8) NOT NULL,
sd_shortname VARCHAR(50),
CONSTRAINT pk_domain PRIMARY KEY (sd_code)
);