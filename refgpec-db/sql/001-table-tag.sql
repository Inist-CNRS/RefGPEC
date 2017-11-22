
DROP TABLE IF EXISTS tags CASCADE ;
CREATE TABLE tags (
tag_code VARCHAR(32) NOT NULL,
tag_shortname VARCHAR(100),
CONSTRAINT pk_tags PRIMARY KEY (tag_code)
);
