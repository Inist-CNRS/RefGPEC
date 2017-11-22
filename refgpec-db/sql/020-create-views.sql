CREATE VIEW view_list_tag_profils AS
select distinct p.tag_code,tag_shortname from profils p,tags t where p.tag_code=t.tag_code order by tag_code;

CREATE VIEW view_list_domains_profil AS
select distinct s.sd_code,sd_shortname from skills_domains sd,skills s where s.sd_code= sd.sd_code order by sd_shortname;

CREATE VIEW view_profils_nb_skills AS
select pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,pr.tag_code,
sum(CASE WHEN st.st_code ='s' THEN 1 ELSE 0 END) as profilNbSkillsS,
sum(CASE WHEN st.st_code ='se'  THEN 1 ELSE 0 END) as profilNbSkillsSE,
sum(CASE WHEN st.st_code ='sf'  THEN 1 ELSE 0 END) as profilNbSkillsSF
from profils pr
LEFT JOIN  profils_skills_levels psl ON pr.profil_code = psl.profil_code
LEFT JOIN skills s  ON psl.skill_code = s.skill_code
LEFT JOIN skills_types st on st.st_code =s.st_code
group by pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,pr.tag_code
order by pr.profil_code ;

create view list_skills_attached_profils as
select psl.skill_code,skill_shortname,pr.profil_shortname,psl.profil_code
from profils pr, skills s, profils_skills_levels psl
where s.skill_code= psl.skill_code and pr.profil_code= psl.profil_code
group by psl.skill_code,skill_shortname, pr.profil_shortname,psl.profil_code;

create view list_levels_attached_profils as
select psl.level_code,level_shortname,psl.profil_code,pr.profil_shortname
from profils pr, levels l, profils_skills_levels psl
where l.level_code= psl.level_code and pr.profil_code= psl.profil_code
group by psl.level_code,level_shortname, psl.profil_code,pr.profil_shortname;

create view list_profils_attached_skills as
select psl.profil_code,skill_shortname,pr.profil_shortname
from profils pr, skills s, profils_skills_levels psl
where s.skill_code= psl.skill_code and pr.profil_code= psl.profil_code
group by psl.profil_code,skill_shortname,pr.profil_shortname;

create view view_nb_skills_by_levels as
select l.level_code,profil_code,count(skill_code)
from levels l , profils_skills_levels psl
where l.level_code= psl.level_code
group by l.level_code,profil_code;
