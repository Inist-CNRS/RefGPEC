DROP TABLE IF EXISTS family CASCADE ;
CREATE TABLE family (
family_id VARCHAR(10) NOT NULL,
family_name VARCHAR(100),
familly_free_comments VARCHAR(255),
CONSTRAINT pk_family PRIMARY KEY (family_id)
);