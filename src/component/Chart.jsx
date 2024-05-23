import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'

const Chart = ({ dataTransaksi, refetch }) => {
	const dataByMonth = Array.isArray(dataTransaksi)
		? dataTransaksi.reduce((result, item) => {
				const date = new Date(item.tgl)
				const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`

				console.log(`Date: ${date}, monthYear: ${monthYear}`)

				if (!result[monthYear]) {
					result[monthYear] = 0
				}

				result[monthYear] += 1

				return result
		  }, {})
		: {}

	console.log(dataByMonth)

	console.log(dataTransaksi);

	return (
		<ResponsiveContainer className='w-full max-w-xs' height={300}>
			<BarChart
				data={Object.keys(dataByMonth).map((bulan) => ({
					bulan,
					jumlah_transaksi: dataByMonth[bulan],
				}))}
			>
				<XAxis
					dataKey='bulan'
				/>
				<YAxis
					type="number" 
					domain={[0, 5]}
				/>
				<Legend />
				<Tooltip />

				<Bar dataKey='jumlah_transaksi' fill='#8884d8' />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default Chart
