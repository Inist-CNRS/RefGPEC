
DROP TABLE IF EXISTS organigramme CASCADE ;
CREATE TABLE organigramme (
orga_code VARCHAR(32) NOT NULL,
orga_shortname VARCHAR(100),
CONSTRAINT pk_organigramme PRIMARY KEY (orga_code)
);
