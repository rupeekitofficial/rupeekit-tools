export const metadata = { title: 'Disclaimer', description: 'Disclaimer for calculators and content.' };

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black tracking-tight">Disclaimer</h1>
      <p className="mt-6 leading-8 text-slate-700">
        Calculators on this website provide approximate results based on user inputs and simplified formulas. Actual outcomes can vary due to tax law, employer policy, lender terms, fees, market returns, documentation and personal circumstances.
      </p>
      <p className="mt-4 leading-8 text-slate-700">
        Always verify final numbers before making salary, tax, loan, investment or legal decisions.
      </p>
    </div>
  );
}
