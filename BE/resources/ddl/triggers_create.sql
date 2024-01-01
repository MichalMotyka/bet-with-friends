create function process_achievement_ratings() returns trigger
    language plpgsql
as
$$
DECLARE
    query_result RECORD;
    text_value TEXT;
    id_value INTEGER;
    execution_result BOOLEAN;
    profile_id INTEGER;
BEGIN
    Select id from profiles where ranking_id = new.id into profile_id;
    FOR query_result IN SELECT query_text, id FROM achievement WHERE active = false AND profile_id = profile_id LOOP
        text_value := query_result.query_text;
        id_value := query_result.id;

        EXECUTE text_value INTO execution_result;
        IF execution_result THEN
            UPDATE achievement SET active = true,acquired=now() WHERE profile_id = new.profile_id AND id = id_value;
            UPDATE profiles SET experience = experience + 100 where id = new.profile_id;
        END IF;
    END LOOP;
    RETURN NULL;
END;
$$;

alter function process_achievement_ratings() owner to postgres;

create function process_achievement() returns trigger
    language plpgsql
as
$$
DECLARE
    query_result RECORD;
    text_value TEXT;
    id_value INTEGER;
    execution_result BOOLEAN;
BEGIN
    FOR query_result IN SELECT query_text, id FROM achievement WHERE active = false AND profile_id = new.profile_id LOOP
        text_value := query_result.query_text;
        id_value := query_result.id;
        
        EXECUTE text_value INTO execution_result;
        IF execution_result THEN
            UPDATE achievement SET active = true,acquired=now() WHERE profile_id = new.profile_id AND id = id_value;
            UPDATE profiles SET experience = experience + 100 where id = new.profile_id;
        END IF;
    END LOOP;
    RETURN NULL;
END;
$$;

alter function process_achievement() owner to postgres;

create function process_experience() returns trigger
    language plpgsql
as
$$
DECLARE
    exp BOOLEAN;
BEGIN
    Select experience from profiles where id = new.id into exp;
    if exp >= 100 then
        UPDATE profiles SET experience = exp - 100 and level = level +1 where id = new.id;
    end if;
    RETURN NULL;
END;
$$;

alter function process_experience() owner to postgres;


create trigger process_achievement_trigger
    after insert
    on bets
    for each row
execute procedure process_achievement();


create trigger process_achievement_trigger
    after insert
    on achievement
    for each row
execute procedure process_achievement();

create trigger process_achievement_trigger
    after insert
    on ratings
    for each row
execute procedure process_achievement_ratings();

create trigger process_experience_trigger
    after update
    on profiles
    for each row
execute procedure process_experience();