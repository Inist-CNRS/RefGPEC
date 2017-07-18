
DROP TABLE IF EXISTS profils_skills_levels ;
 CREATE TABLE profils_skills_levels (
 skill_code VARCHAR(15),
 level_code VARCHAR(4),
 profil_code VARCHAR(15) ,
 CONSTRAINT pk_profils_skills_levels PRIMARY KEY (skill_code,  level_code,  profil_code),
 CONSTRAINT fk_profils_skills_levels_skills FOREIGN KEY (skill_code) REFERENCES skills(skill_code),
 CONSTRAINT fk_profils_skills_levels_levels FOREIGN KEY (level_code) REFERENCES levels(level_code),
 CONSTRAINT fk_profils_skills_levels_profils FOREIGN KEY (profil_code) REFERENCES profils(profil_code)
 );