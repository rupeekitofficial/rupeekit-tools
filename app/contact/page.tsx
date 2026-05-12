export const metadata = { title: 'Contact', description: 'Contact the website owner.' };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black tracking-tight">Contact</h1>
      <p className="mt-6 leading-8 text-slate-700">
        For corrections, feedback, calculator suggestions or business queries, contact us at:
      </p>
      <p className="mt-4 rounded-2xl bg-white p-5 font-semibold shadow-sm">your-email@example.com</p>
      <p className="mt-4 text-sm leading-6 text-slate-500">Replace this email before publishing the website.</p>
    </div>
  );
}
