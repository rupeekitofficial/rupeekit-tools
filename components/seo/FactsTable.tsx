export type FactsTableRow = {
  topic: string;
  explanation: string;
};

type FactsTableProps = {
  title?: string;
  id?: string;
  rows: FactsTableRow[];
  className?: string;
};

export default function FactsTable({
  title = 'Calculator Facts',
  id = 'calculator-facts',
  rows,
  className = 'mt-12',
}: FactsTableProps) {
  return (
    <section id={id} className={`${className} rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 scroll-mt-24`}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[760px] text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="px-4 py-3 font-semibold">Topic</th>
              <th className="px-4 py-3 font-semibold">RupeeKit explanation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.topic} className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">{row.topic}</td>
                <td className="px-4 py-3">{row.explanation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
