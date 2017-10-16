
DROP TABLE IF EXISTS skills_types CASCADE;
CREATE TABLE skills_types (
st_code VARCHAR(8) NOT NULL,
st_shortname VARCHAR(30),
CONSTRAINT pk_type PRIMARY KEY (st_code)
);
