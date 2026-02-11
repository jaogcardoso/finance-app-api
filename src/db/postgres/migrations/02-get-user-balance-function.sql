create or replace function get_user_balance(uid UUID)
returns table (
	earnings NUMERIC(10,2),
	expenses NUMERIC(10,2),
	investments NUMERIC (10,2),
	balance NUMERIC(10,2)
	) AS $$

	BEGIN 
		RETURN QUERY
		SELECT 
			sum(case when type = 'EARNING' then value else 0 end) as earnings,
			sum(case when type = 'EXPENSE' then value else 0 end) as expenses,
			sum(case when type = 'INVESTMENT' then value else 0 end) as investments,
			(sum(case when type = 'EARNING' then value else 0 end)
			- sum(case when type = 'EXPENSE' then value else 0 end)
			- sum(case when type = 'INVESTMENT' then value else 0 end)) as balance
	
from transactions
where user_id = get_user_balance.uid;
END; $$
LANGUAGE plpgsql;