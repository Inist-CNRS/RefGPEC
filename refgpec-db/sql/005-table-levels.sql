
DROP TABLE IF EXISTS levels CASCADE;
CREATE TABLE levels (
level_code VARCHAR(4) NOT NULL,
level_number SMALLINT,
level_shortname VARCHAR(30),
level_free_comments VARCHAR(255),
CONSTRAINT pk_levels PRIMARY KEY (level_code)
);
