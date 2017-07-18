
DROP TABLE IF EXISTS organigramme CASCADE ;
CREATE TABLE organigramme (
orga_code VARCHAR(8) NOT NULL,
orga_shortname VARCHAR(30),
CONSTRAINT pk_organigramme PRIMARY KEY (orga_code)
);
