CREATE VIEW view_list_tag_profils AS
select distinct p.profil_tag from profils p  order by profil_tag;

CREATE VIEW view_list_domains_profil AS
select distinct s.sd_code,sd_shortname from skills_domains sd,skills s where s.sd_code= sd.sd_code order by sd_shortname;

CREATE VIEW view_profils_nb_skills AS
select pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,pr.profil_tag,
sum(CASE WHEN st.st_code ='s' THEN 1 ELSE 0 END) as profilNbSkillsS,
sum(CASE WHEN st.st_code ='se'  THEN 1 ELSE 0 END) as profilNbSkillsSE,
sum(CASE WHEN st.st_code ='sf'  THEN 1 ELSE 0 END) as profilNbSkillsSF
from profils pr
LEFT JOIN  profils_skills_levels psl ON pr.profil_code = psl.profil_code
LEFT JOIN skills s  ON psl.skill_code = s.skill_code
LEFT JOIN skills_types st on st.st_code =s.st_code
group by pr.profil_code,pr.profil_shortname,pr.profil_pdf_path,pr.profil_free_comments,pr.profil_tag
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


create view view_exportCSV_skills as
select skill_code as code,sd_shortname as Domaine,st_shortname as Type,skill_shortname as Nom,CASE WHEN skill_free_comments is null THEN '' ELSE skill_free_comments END as Commentaire,referens
from skills s, skills_domains sd, skills_types st
where s.sd_code= sd.sd_code and s.st_code= st.st_code
order by domaine,type,skill_code;

create view view_exportcsv_profilsSkills as
select profil_code,Type,Domaine,code, Nom,CASE WHEN Commentaire is null THEN '' ELSE Commentaire END as Commentaire,referens,'0' as modulation from view_exportcsv_skills cross join
profils where (code,Nom,profil_code  )not in (select psl.skill_code,skill_shortname,p.profil_code  from profils p , skills s , profils_skills_levels psl
                                                                               where s.skill_code = psl.skill_code and p.profil_code = psl.profil_code)

UNION
select p.profil_code, Type,Domaine,code, Nom,CASE WHEN psl_free_comments is null THEN '' ELSE psl_free_comments END as Commentaire,referens,level_number from profils p , view_exportcsv_skills s , profils_skills_levels psl,levels l
                                                                               where s.code = psl.skill_code and p.profil_code = psl.profil_code and l.level_code = psl.level_code
