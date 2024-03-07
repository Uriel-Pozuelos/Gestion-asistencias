import {
	RadioGroup,
	RadioGroupItem
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

function RadioInventario() {
	const [_, setValue] = useState<string>('dia');

	return (
		<RadioGroup
			className="flex flex-col items-start"
			defaultValue="dia"
			onChange={value => {
				setValue(value as any);
			}}>
			<div className="mx-auto">
				<div>
					<RadioGroupItem id="dia" value="dia" />
					<Label htmlFor="dia" className="mx-4">
						Día
					</Label>
				</div>
				<div>
					<RadioGroupItem id="semana" value="semana" />
					<Label htmlFor="semana" className="mx-4">
						Semana
					</Label>
				</div>
				<div>
					<RadioGroupItem id="mes" value="mes" />
					<Label htmlFor="mes" className="mx-4">
						Mes
					</Label>
				</div>
			</div>
		</RadioGroup>
	);
}

export default RadioInventario;
