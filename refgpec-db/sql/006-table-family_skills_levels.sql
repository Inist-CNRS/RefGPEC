DROP TABLE IF EXISTS family_skills_levels CASCADE;
CREATE TABLE family_skills_levels (
fsl_code VARCHAR(12),
fsl_free_comments VARCHAR(255),
level_code VARCHAR(4),
skill_code VARCHAR(15) NOT NULL,
family_id VARCHAR(10) NOT NULL,
CONSTRAINT pk_family_skills_levels PRIMARY KEY (fsl_code),
CONSTRAINT fk_family_skills_levels_levels FOREIGN KEY (level_code) REFERENCES levels (level_code),
CONSTRAINT fk_family_skills_family_levels  FOREIGN KEY (family_id) REFERENCES family(family_id),
CONSTRAINT fk_family_skills_skills_levels  FOREIGN KEY (skill_code) REFERENCES skills(skill_code)
);