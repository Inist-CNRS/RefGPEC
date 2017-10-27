
DROP TABLE IF EXISTS profils_skills_levels ;
CREATE TABLE profils_skills_levels (psl_code VARCHAR(12),
                                    psl_free_comments VARCHAR(255),
                        		    level_code VARCHAR(4),
 									skill_code VARCHAR(15) ,
                                    profil_code VARCHAR(100) ,
CONSTRAINT PK_profils_skills_levels PRIMARY KEY (psl_code),
CONSTRAINT FK_profils_skills_levels_level FOREIGN KEY (level_code) REFERENCES levels (level_code),
CONSTRAINT FK_profils_skills_levels_skill FOREIGN KEY (skill_code) REFERENCES skills (skill_code),
CONSTRAINT FK_profils_skills_levels_profil FOREIGN KEY (profil_code) REFERENCES profils (profil_code))
