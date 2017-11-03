CREATE VIEW view_list_orga_profils AS
select distinct orga_code from profils order by orga_code;

CREATE VIEW view_list_domains_profil AS
select distinct s.sd_code,sd_shortname from skills_domains sd,skills s where s.sd_code= sd.sd_code order by sd_shortname;

CREATE VIEW view_profils_nb_skills AS
select pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,pr.orga_code,
sum(CASE WHEN st.st_code ='s' THEN 1 ELSE 0 END) as profilNbSkillsS,
sum(CASE WHEN st.st_code ='se'  THEN 1 ELSE 0 END) as profilNbSkillsSE,
sum(CASE WHEN st.st_code ='sf'  THEN 1 ELSE 0 END) as profilNbSkillsSF
from profils pr
LEFT JOIN  profils_skills_levels psl ON pr.profil_code = psl.profil_code
LEFT JOIN skills s  ON psl.skill_code = s.skill_code
LEFT JOIN skills_types st on st.st_code =s.st_code
group by pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,pr.orga_code
order by pr.profil_code ;

create view list_skills_attached_profils as
select psl.skill_code,skill_shortname,pr.profil_shortname
from profils pr, skills s, profils_skills_levels psl
where s.skill_code= psl.skill_code and pr.profil_code= psl.profil_code
group by psl.skill_code,skill_shortname, pr.profil_shortname;

create view list_levels_attached_profils as
select psl.level_code,level_shortname,pr.profil_shortname
from profils pr, levels l, profils_skills_levels psl
where l.level_code= psl.level_code and pr.profil_code= psl.profil_code
group by psl.level_code,level_shortname, pr.profil_shortname;