fetch(
	'https://zxlmmgzvgshlknapirjc.supabase.co/rest/v1/perdida?select=*',
	{
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${
				import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY
			}`,
			apikey: import.meta.env.VITE_SUPABASE_CLIENT_ANON_KEY
		}
	}
)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => console.log(data))
	.catch(error => console.error('Fetch error:', error));
