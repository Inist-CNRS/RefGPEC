
DROP TABLE IF EXISTS skills CASCADE ;
CREATE TABLE skills (
skill_code VARCHAR(15) NOT NULL,
skill_shortname VARCHAR(30),
skill_free_comments VARCHAR(255),
sd_code VARCHAR(6),
st_code  VARCHAR(6),
CONSTRAINT pk_skills PRIMARY KEY (skill_code),
CONSTRAINT fk_skills_domains FOREIGN KEY (sd_code) REFERENCES skills_domains(sd_code),
 CONSTRAINT fk_skills_types FOREIGN KEY (st_code) REFERENCES skills_types(st_code)
);