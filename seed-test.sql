-- Seed test data for Faith Journey automation

insert into leads (email, utm_source, utm_medium, utm_campaign, utm_content, quiz_completed_at)
values ('test@faithjourney.com','meta','cpc','quiz_top','varA', now())
on conflict (email) do nothing;

-- Example quiz response
insert into quiz_responses (lead_id, answers, faith_score, peace_score, total_score, result_bucket)
select id, '{\ faith_1\:5,\faith_2\:4,\peace_1\:5,\peace_2\:3}'::jsonb, 9, 8, 85, 'High'
from leads where email = 'test@faithjourney.com';
