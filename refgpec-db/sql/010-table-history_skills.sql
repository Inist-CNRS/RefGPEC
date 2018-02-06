
DROP TABLE IF EXISTS history_skills CASCADE ;
CREATE TABLE history_skills (
sh_code VARCHAR(15) NOT NULL,
sh_shortname VARCHAR(150),
sh_free_comments VARCHAR(255),
sd_code VARCHAR(8),
st_code  VARCHAR(8),
referens INT,
sh_date_histo timestamp NOT NULL,
operation VARCHAR(1),
CONSTRAINT pk_history_skills PRIMARY KEY (sh_code,sh_date_histo)
);

CREATE OR REPLACE FUNCTION after_update_skills() RETURNS TRIGGER AS $history_skills$
BEGIN
IF (TG_OP = 'DELETE') THEN
        INSERT INTO history_skills SELECT  NEW.skill_code,NEW.skill_shortname,NEW.skill_free_comments,NEW.sd_code,NEW.st_code,NEW.referens,now(),'D' ;
        RETURN NEW;
ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO history_skills SELECT  NEW.skill_code,NEW.skill_shortname,NEW.skill_free_comments,NEW.sd_code,NEW.st_code,NEW.referens,now(),'U' ;
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
     INSERT INTO history_skills SELECT  NEW.skill_code,NEW.skill_shortname,NEW.skill_free_comments,NEW.sd_code,NEW.st_code,NEW.referens,now(),'A' ;
     RETURN NEW;
    END IF;
 RETURN NULL; -- le résultat est ignoré car il s'agit d'un trigger AFTER
 END;
$history_skills$ language plpgsql;

CREATE TRIGGER history_skills
    AFTER INSERT OR UPDATE ON  skills
    FOR EACH ROW EXECUTE PROCEDURE after_update_skills();