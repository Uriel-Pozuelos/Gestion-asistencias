import {
	Page,
	Text,
	View,
	Document,
	StyleSheet
} from '@react-pdf/renderer';
import { useVentaStore } from '@/store/ventaStore';

const styles = StyleSheet.create({
	page: {
		flexDirection: 'row',
		backgroundColor: '#E4E4E4'
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1
	}
});
function Ticket() {
	const { lastListaGalletas } = useVentaStore();
	return (
		<Document>
			<Page size="A1" style={styles.page}>
				{lastListaGalletas.map((galleta, index) => (
					<View key={index} style={styles.section}>
						<img
							src={galleta.cookie}
							alt="Galleta seleccionada"
							width={50}
							height={50}
						/>
						<Text>{galleta.nombre}</Text>
						<Text>{galleta.cantidad}</Text>
						<Text>{galleta.typeVenta}</Text>
					</View>
				))}
				<Text>
					Total:{' '}
					{lastListaGalletas.reduce(
						(acc, curr) => acc + Number(curr.total),
						0
					)}
				</Text>
			</Page>
		</Document>
	);
}

export default Ticket;
