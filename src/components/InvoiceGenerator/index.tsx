'use client';
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
import React, { useState, ChangeEvent } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PageWrapper from '../PageWrapper';


interface Address {
  fullAddress: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number | null;
}

interface InvoiceData {
  invoiceNumber: string;
  dateIssued: string;
  dateDue: string;
  senderName: string;
  senderEmail: string;
  senderAddress: Address;
  senderPostcode: string;
  senderVAT?: string;
  logo?: File;
  clientName: string;
  clientEmail: string;
  clientAddress: Address;
  clientPostcode: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
  paymentTerms: string;
  clientCompany?: string;
  clientPhone?: string;
  clientVAT?: string;
  items: InvoiceItem[];
  signature?: File;
  notes: string;
  vatEnabled: boolean;
  vatRate: number;
  pdfTheme: string;
  poNumber?: string;
}

const inputClassName =
  'w-full p-2 border rounded bg-white dark:bg-secondary text-primary dark:text-white focus:ring-2 focus:ring-highlight border-gray-200 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500';

const dateInputClassName = `${inputClassName} [color-scheme:light] dark:[color-scheme:dark] [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:grayscale`;

const InvoiceGenerator: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: '',
    dateIssued: new Date().toISOString().split('T')[0],
    dateDue: '',
    senderName: '',
    senderEmail: '',
    senderAddress: { fullAddress: '' },
    senderPostcode: '',
    senderVAT: '',
    clientName: '',
    clientEmail: '',
    clientAddress: { fullAddress: '' },
    clientPostcode: '',
    items: [{ id: '1', description: '', quantity: 1, unitPrice: null }],
    notes: '',
    vatEnabled: true,
    vatRate: 20,
    bankName: '',
    accountNumber: '',
    sortCode: '',
    paymentTerms: '30 days',
    clientCompany: '',
    clientPhone: '',
    clientVAT: '',
    pdfTheme: '#39BB9A',
    poNumber: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setInvoiceData(prev => ({ ...prev, [name]: checked }));
    } else {
        setInvoiceData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddressChange = (e: ChangeEvent<HTMLTextAreaElement>, party: 'sender' | 'client') => {
    const { value } = e.target;
    setInvoiceData(prev => ({
        ...prev,
        [`${party}Address`]: { fullAddress: value }
    }));
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>, field: 'logo' | 'signature') => {
    const file = e.target.files?.[0];
    if (file) {
      setInvoiceData(prev => ({ ...prev, [field]: file }));
    }
  };

  const addInvoiceItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: String(prev.items.length + 1),
          description: '',
          quantity: 1,
          unitPrice: null,
        },
      ],
    }));
  };

  const updateInvoiceItem = (id: string, field: keyof InvoiceItem, value: string | number | null) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    }));
  };

    const removeInvoiceItem = (id: string) => {
        setInvoiceData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.id !== id)
        }));
    };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.quantity * (item.unitPrice || 0), 0);
  };

  const calculateVAT = () => {
    return invoiceData.vatEnabled ? calculateSubtotal() * (invoiceData.vatRate / 100) : 0;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateVAT();
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 0, g: 0, b: 0 };
  };

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  const exportToPDF = async () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.width;
    let yPos = 40;
    const margin = 40;
    const lineHeight = 20;
    const smallLineHeight = 15;
    const sectionSpacing = lineHeight * 2;

    const themeColor = hexToRgb(invoiceData.pdfTheme);
    doc.setTextColor(0, 0, 0);

    let headerHeight = yPos;
    const rightColumnX = pageWidth - margin;

    if (invoiceData.logo) {
      try {
        const logoUrl = URL.createObjectURL(invoiceData.logo);
        const img = await loadImage(logoUrl);
        const maxWidth = 150;
        const maxHeight = 60;
        let logoWidth = img.width;
        let logoHeight = img.height;

        const ratio = Math.min(maxWidth / logoWidth, maxHeight / logoHeight);
        logoWidth *= ratio;
        logoHeight *= ratio;

        doc.addImage(logoUrl, 'JPEG', rightColumnX - logoWidth, yPos, logoWidth, logoHeight);
        headerHeight = Math.max(yPos + logoHeight + lineHeight, headerHeight);
        URL.revokeObjectURL(logoUrl);
      } catch (error) {
        console.error('Error loading logo:', error);
      }
    }

    yPos = headerHeight;

    doc.setFontSize(24);
    doc.setTextColor(themeColor.r, themeColor.g, themeColor.b);
    doc.text('INVOICE', margin, yPos);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, rightColumnX, yPos, { align: 'right' });
    yPos += lineHeight;
    doc.text(`Date: ${invoiceData.dateIssued}`, rightColumnX, yPos, { align: 'right' });
    yPos += lineHeight;
    if (invoiceData.dateDue) {
      doc.text(`Date Due: ${invoiceData.dateDue}`, rightColumnX, yPos, { align: 'right' });
      yPos += lineHeight;
    }
    if (invoiceData.poNumber) {
      doc.text(`PO Number: ${invoiceData.poNumber}`, rightColumnX, yPos, { align: 'right' });
      yPos += lineHeight;
    }
    yPos += sectionSpacing - lineHeight;

    let fromYPos = yPos;
    let billToYPos = yPos;

    const fromLabelX = rightColumnX - 220;
    const fromContentX = fromLabelX + 50;

    doc.setFont('helvetica', 'bold');
    doc.text('From:', fromLabelX, fromYPos);
    doc.setFont('helvetica', 'normal');
    fromYPos += smallLineHeight;
    doc.text(invoiceData.senderName, fromLabelX, fromYPos);
    fromYPos += smallLineHeight;
    const senderAddressLines = doc.splitTextToSize(invoiceData.senderAddress.fullAddress, 150);
    doc.text(senderAddressLines, fromLabelX, fromYPos);
    fromYPos += senderAddressLines.length * smallLineHeight;
    doc.text(invoiceData.senderEmail, fromLabelX, fromYPos);
    fromYPos += smallLineHeight;
    if (invoiceData.senderVAT) {
        doc.text(`VAT: ${invoiceData.senderVAT}`, fromLabelX, fromYPos);
        fromYPos += smallLineHeight;
    }

    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', margin, billToYPos);
    doc.setFont('helvetica', 'normal');
    billToYPos += smallLineHeight;

    if (invoiceData.clientCompany) {
        doc.text(invoiceData.clientCompany, margin, billToYPos);
        billToYPos += smallLineHeight;
    }
    doc.text(invoiceData.clientName, margin, billToYPos);
    billToYPos += smallLineHeight;
    const clientAddressLines = doc.splitTextToSize(invoiceData.clientAddress.fullAddress, 150);
    doc.text(clientAddressLines, margin, billToYPos);
    billToYPos += clientAddressLines.length * smallLineHeight;
    doc.text(invoiceData.clientEmail, margin, billToYPos);
    billToYPos += smallLineHeight;
    if (invoiceData.clientPhone) {
        doc.text(invoiceData.clientPhone, margin, billToYPos);
        billToYPos += smallLineHeight;
    }

    yPos = Math.max(fromYPos, billToYPos) + sectionSpacing;

    const tableColumns = ['Description', 'Quantity', 'Unit Price', 'Total'];
    const tableData = invoiceData.items.map(item => [
      item.description,
      item.quantity.toString(),
      `£${(item.unitPrice || 0).toFixed(2)}`,
      `£${(item.quantity * (item.unitPrice || 0)).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [tableColumns],
      body: tableData,
      startY: yPos,
      margin: { left: margin, right: margin },
      styles: { cellPadding: 8, minCellHeight: 20 },
      headStyles: {
        fillColor: [themeColor.r, themeColor.g, themeColor.b],
        textColor: [255, 255, 255],
        minCellHeight: 30,
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + sectionSpacing;

    const totalsX = pageWidth - margin - 200;
    doc.text('Subtotal:', totalsX, yPos);
    doc.text(`£${calculateSubtotal().toFixed(2)}`, rightColumnX, yPos, { align: 'right' });
    yPos += lineHeight;

    if (invoiceData.vatEnabled) {
      doc.text(`VAT (${invoiceData.vatRate}%):`, totalsX, yPos);
      doc.text(`£${calculateVAT().toFixed(2)}`, rightColumnX, yPos, { align: 'right' });
      yPos += lineHeight;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', totalsX, yPos);
    doc.text(`£${calculateTotal().toFixed(2)}`, rightColumnX, yPos, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    yPos += sectionSpacing * 1.5;

    if (invoiceData.notes) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Notes', margin, yPos);
      yPos += lineHeight;
      doc.setFont('helvetica', 'normal');
      const notesLines = doc.splitTextToSize(invoiceData.notes, pageWidth - margin * 2);
      doc.text(notesLines, margin, yPos);
      yPos += notesLines.length * lineHeight + sectionSpacing;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Information', margin, yPos);
    yPos += lineHeight;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bank Name:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.bankName, margin + 100, yPos);
    yPos += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Account Number:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.accountNumber, margin + 100, yPos);
    yPos += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Sort Code:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.sortCode, margin + 100, yPos);
    yPos += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Terms:', margin, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceData.paymentTerms, margin + 100, yPos);

    if (invoiceData.signature) {
      yPos += lineHeight;
      try {
        const signatureUrl = URL.createObjectURL(invoiceData.signature);
        const img = await loadImage(signatureUrl);
        const maxWidth = 100;
        const maxHeight = 50;
        let signatureWidth = img.width;
        let signatureHeight = img.height;

        const ratio = Math.min(maxWidth / signatureWidth, maxHeight / signatureHeight);
        signatureWidth *= ratio;
        signatureHeight *= ratio;

        await doc.addImage(signatureUrl, 'JPEG', pageWidth - margin - signatureWidth, yPos, signatureWidth, signatureHeight);
        URL.revokeObjectURL(signatureUrl);
      } catch (error) {
        console.error('Error loading signature:', error);
      }
    }

    doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  const exportToCSV = () => {
    const headers = ['Description', 'Quantity', 'Unit Price'];
    const rows = invoiceData.items.map(item =>
        [item.description, item.quantity, item.unitPrice].join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `invoice-${invoiceData.invoiceNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="bg-hero-inverted bg-cover bg-no-repeat bg-white dark:bg-primary text-primary dark:text-white min-h-screen py-32 px-4 xl:px-0">
        <div className="max-w-xl lg:max-w-screen-xl mx-auto flex flex-col justify-center pt-12 lg:pt-32 xl:px-0 px-4">
          <div className="w-full mx-auto">
            <h1 className="text-5xl font-bold mb-8 anim-slide-in-bottom">Invoice Generator</h1>

            {/* Invoice Details Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-1">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Invoice Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="invoiceNumber">
                    Invoice Number
                  </label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    placeholder="e.g., INV-001"
                    value={invoiceData.invoiceNumber}
                    onChange={handleInputChange}
                    className={inputClassName}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="dateIssued">
                    Date Issued
                  </label>
                  <input
                    type="date"
                    id="dateIssued"
                    name="dateIssued"
                    value={invoiceData.dateIssued}
                    onChange={handleInputChange}
                    className={dateInputClassName}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="dateDue">
                    Date Due
                  </label>
                  <input
                    type="date"
                    id="dateDue"
                    name="dateDue"
                    value={invoiceData.dateDue}
                    onChange={handleInputChange}
                    className={dateInputClassName}
                  />
                </div>
                <div className="col-span-1 sm:col-span-3">
                  <label className="block text-sm font-medium mb-1" htmlFor="logo">
                    Company Logo
                  </label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, 'logo')}
                    className={inputClassName}
                  />
                  {invoiceData.logo && (
                    <div className="mt-2">
                      <img src={URL.createObjectURL(invoiceData.logo)} alt="Company Logo" className="max-h-20 object-contain" />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Signature Upload Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-2">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Signature</h2>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="signature">
                  Upload Signature
                </label>
                <input
                  type="file"
                  id="signature"
                  name="signature"
                  accept="image/*"
                  onChange={e => handleFileUpload(e, 'signature')}
                  className={inputClassName}
                />
                {invoiceData.signature && (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(invoiceData.signature)} alt="Signature" className="max-h-20 object-contain" />
                  </div>
                )}
              </div>
            </section>

            {/* Sender Details Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-2">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">From</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="senderName">
                    Your Name/Company
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    placeholder="Your business name"
                    value={invoiceData.senderName}
                    onChange={handleInputChange}
                    className={inputClassName}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="senderEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    placeholder="your@email.com"
                    value={invoiceData.senderEmail}
                    onChange={handleInputChange}
                    className={inputClassName}
                    required
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium mb-1" htmlFor="senderVAT">
                    VAT Number (optional)
                  </label>
                  <input
                    type="text"
                    id="senderVAT"
                    name="senderVAT"
                    placeholder="e.g., GB123456789"
                    value={invoiceData.senderVAT}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-sm font-medium mb-1" htmlFor="senderAddress">
                    Address
                  </label>
                  <textarea
                    id="senderAddress"
                    name="senderAddress"
                    placeholder="Enter your full address&#10;Street&#10;City&#10;Postcode"
                    value={invoiceData.senderAddress.fullAddress}
                    onChange={e => handleAddressChange(e, 'sender')}
                    className={`${inputClassName} min-h-[100px]`}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Bill To Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-2">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Bill To</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="clientCompany">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="clientCompany"
                    name="clientCompany"
                    placeholder="Client's company name"
                    value={invoiceData.clientCompany}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="clientName">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    placeholder="Contact person's name"
                    value={invoiceData.clientName}
                    onChange={handleInputChange}
                    className={inputClassName}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="clientEmail">
                    Email
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    placeholder="client@email.com"
                    value={invoiceData.clientEmail}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="clientPhone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    name="clientPhone"
                    placeholder="e.g., +44 1234 567890"
                    value={invoiceData.clientPhone}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="clientAddress">
                    Address
                  </label>
                  <textarea
                    id="clientAddress"
                    name="clientAddress"
                    placeholder="Enter client's full address&#10;Street&#10;City&#10;Postcode"
                    value={invoiceData.clientAddress.fullAddress}
                    onChange={e => handleAddressChange(e, 'client')}
                    className={`${inputClassName} min-h-[100px]`}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="poNumber">
                    PO Number
                  </label>
                  <input
                    type="text"
                    id="poNumber"
                    name="poNumber"
                    placeholder="Purchase Order Number"
                    value={invoiceData.poNumber}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
              </div>
            </section>

            {/* Payment Details Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-2">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Payment Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="bankName">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    id="bankName"
                    name="bankName"
                    placeholder="e.g., Barclays Bank"
                    value={invoiceData.bankName}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="accountNumber">
                    Account Number
                  </label>
                  <input
                    type="text"
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="e.g., 12345678"
                    value={invoiceData.accountNumber}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="sortCode">
                    Sort Code
                  </label>
                  <input
                    type="text"
                    id="sortCode"
                    name="sortCode"
                    placeholder="e.g., 12-34-56"
                    value={invoiceData.sortCode}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="paymentTerms">
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    id="paymentTerms"
                    name="paymentTerms"
                    placeholder="e.g., Net 30"
                    value={invoiceData.paymentTerms}
                    onChange={handleInputChange}
                    className={inputClassName}
                  />
                </div>
              </div>
            </section>

            {/* Invoice Items Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-3">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Invoice Items</h2>
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6">
                  <div className="col-span-1 sm:col-span-6">
                    <label htmlFor={`description-${item.id}`} className="block text-sm font-medium mb-1 text-primary dark:text-white">
                      Description
                    </label>
                    <textarea
                      id={`description-${item.id}`}
                      placeholder="Enter item description or service provided"
                      value={item.description}
                      onChange={e => updateInvoiceItem(item.id, 'description', e.target.value)}
                      className={`${inputClassName} min-h-[42px] resize-none overflow-hidden transition-all duration-200 focus:min-h-[120px] focus:resize-y`}
                      rows={1}
                      onFocus={e => {
                        e.currentTarget.rows = 5;
                        e.currentTarget.style.resize = 'vertical';
                      }}
                      onBlur={e => {
                        if (!e.currentTarget.value) {
                          e.currentTarget.rows = 1;
                          e.currentTarget.style.resize = 'none';
                        }
                      }}
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label htmlFor={`quantity-${item.id}`} className="block text-sm font-medium mb-1 text-primary dark:text-white">
                      Quantity
                    </label>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      placeholder="Enter quantity"
                      value={item.quantity}
                      onChange={e => updateInvoiceItem(item.id, 'quantity', Number(e.target.value))}
                      className={inputClassName}
                      min="1"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-4">
                    <label htmlFor={`unitPrice-${item.id}`} className="block text-sm font-medium mb-1 text-primary dark:text-white">
                      Unit Price (£)
                    </label>
                    <div className="relative">
                      <span
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      >
                        £
                      </span>
                      <input
                        id={`unitPrice-${item.id}`}
                        type="number"
                        placeholder="0.00"
                        value={item.unitPrice === null ? '' : item.unitPrice}
                        onChange={e => updateInvoiceItem(item.id, 'unitPrice', e.target.value === '' ? null : Number(e.target.value))}
                        className={`${inputClassName} pl-7`}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div
                      className="mt-2 text-right text-sm font-medium text-primary dark:text-white"
                      aria-label={`Item total: £${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}`}
                    >
                      Total: £{((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                    </div>
                  </div>
                   <button onClick={() => removeInvoiceItem(item.id)} className="bg-red-500 text-white p-2 rounded">Remove</button>
                </div>
              ))}
              <button onClick={addInvoiceItem} className="bg-highlight text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                Add Item
              </button>
            </section>

            {/* Notes Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-3">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Notes</h2>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="notes">
                  Add any additional notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="e.g., Thank you for your business."
                  value={invoiceData.notes}
                  onChange={handleInputChange}
                  className={`${inputClassName} min-h-[100px]`}
                />
              </div>
            </section>

            {/* VAT Settings Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-3">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">VAT Settings</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    id="vatEnabled"
                    checked={invoiceData.vatEnabled}
                    onChange={e => setInvoiceData(prev => ({ ...prev, vatEnabled: e.target.checked }))}
                    className="form-checkbox h-5 w-5 text-highlight rounded border-gray-300 dark:border-gray-600"
                  />
                  <label htmlFor="vatEnabled" className="ml-2 text-primary dark:text-white">
                    Enable VAT
                  </label>
                </div>
                {invoiceData.vatEnabled && (
                  <div className="flex items-center gap-2">
                    <label htmlFor="vatRate" className="sr-only">
                      VAT Rate
                    </label>
                    <input
                      id="vatRate"
                      type="number"
                      value={invoiceData.vatRate}
                      onChange={e => setInvoiceData(prev => ({ ...prev, vatRate: Number(e.target.value) }))}
                      className={`${inputClassName} w-20`}
                      min="0"
                      max="100"
                      step="0.5"
                      aria-label="VAT Rate Percentage"
                    />
                    <span className="text-primary dark:text-white">%</span>
                  </div>
                )}
              </div>
            </section>

            {/* Preview Section */}
            <section
              id="invoice-preview"
              className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-4"
            >
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">Preview</h2>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-primary dark:text-white">Subtotal:</span>
                  <span className="text-primary dark:text-white">£{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  {invoiceData.vatEnabled && (
                    <>
                      <span className="text-primary dark:text-white">VAT ({invoiceData.vatRate}%):</span>
                      <span className="text-primary dark:text-white">£{calculateVAT().toFixed(2)}</span>
                    </>
                  )}
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span className="text-primary dark:text-white">Total:</span>
                  <span className="text-highlight">£{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </section>

            {/* Color Theme Section */}
            <section className="mb-8 bg-white dark:bg-secondary p-6 rounded-lg shadow-lg anim-slide-in-bottom anim-delay-3">
              <h2 className="text-xl font-semibold mb-4 text-primary dark:text-white">PDF Theme</h2>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="pdfTheme">
                  Theme Color
                </label>
                <input
                  type="color"
                  id="pdfTheme"
                  value={invoiceData.pdfTheme}
                  onChange={e => setInvoiceData(prev => ({ ...prev, pdfTheme: e.target.value }))}
                  className="w-full h-10 p-1 rounded cursor-pointer"
                />
              </div>
            </section>

            <div className="flex justify-end gap-4 anim-slide-in-bottom anim-delay-5">
              <button onClick={exportToPDF} className="bg-highlight text-white px-6 py-2 rounded hover:bg-opacity-80 transition-colors">
                Export PDF
              </button>
              <button
                onClick={exportToCSV}
                className="bg-secondary dark:bg-highlight text-primary dark:text-white px-6 py-2 rounded hover:bg-opacity-80 transition-colors"
              >
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default InvoiceGenerator;

