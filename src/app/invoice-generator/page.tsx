import InvoiceGenerator from '@components/InvoiceGenerator';

export const metadata = {
  title: 'Invoice Generator',
  description: 'Generate professional invoices with ease using our free and open-source invoice generator. Create PDF and CSV invoices instantly with customizable templates.',
  keywords: 'invoice generator, free invoice generator, open source invoice generator, PDF invoice generator, CSV invoice generator',
  author: 'Hannah Goodridge',
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGenerator />;
}