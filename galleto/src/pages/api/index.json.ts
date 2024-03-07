import { jsonify } from '@/lib/jsonify';
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
	return jsonify([
		{
			id: 1,
			name: 'John Doe',
			email: ''
		},
		{
			id: 2,
			name: 'Jane Doe',
			email: ''
		}
	]);
};
