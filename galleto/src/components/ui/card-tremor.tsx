import { Card, Metric, Text } from '@tremor/react';

interface CardTremorProps {
	title: string;
	metric: string;
}

interface CardTremor {
	contenido: CardTremorProps;
}

export const CardTremor = ({ contenido }: CardTremor) => {
	return (
		<Card>
			<Text>{contenido.title}</Text>
			<Metric>{contenido.metric}</Metric>
		</Card>
	);
};
