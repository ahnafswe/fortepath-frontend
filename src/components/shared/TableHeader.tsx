export const TableHeader = ({ cols }: { cols: string[] }) => {
	return (
		<div className="bg-[#151417] flex items-center rounded-t-2xl">
			{cols.map((col, idx) => (
				<div
					key={idx}
					className="flex-1 py-2.5 text-center text-[17px]"
				>
					{col}
				</div>
			))}
		</div>
	);
};
