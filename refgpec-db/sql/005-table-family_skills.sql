DROP TABLE IF EXISTS family_skills CASCADE;
CREATE TABLE family_skills (
family_id VARCHAR(10) NOT NULL,
skill_code VARCHAR(15) NOT NULL,
discriminante SMALLINT default '0',
CONSTRAINT pk_family_skills PRIMARY KEY (family_id,skill_code),
CONSTRAINT fk_family_skills_family FOREIGN KEY (family_id) REFERENCES family(family_id),
CONSTRAINT fk_family_skills_skills FOREIGN KEY (skill_code) REFERENCES skills(skill_code)
);