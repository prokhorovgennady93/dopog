"use client";

import { useState } from "react";
import { X, Printer, Download, CreditCard, Landmark } from "lucide-react";

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  orgProfile: any;
  orderNumber?: string;
  amount?: number;
}

export function InvoiceGenerator({ isOpen, onClose, orgProfile, orderNumber = "123", amount = 15000 }: InvoiceProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const seller = {
    name: "ИП Карманович Алексей Сергеевич",
    inn: "611405438968",
    address: "Россия, Ростовская область",
    bank: "АО 'Т-Банк'",
    bik: "044525974",
    account: "40802810XXXXXXXXXXXX",
    corrAccount: "30101810XXXXXXXXXXXX"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white text-black w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative print:p-0 print:shadow-none print:max-h-none print:static">
        
        {/* Actions - Hidden when printing */}
        <div className="sticky top-0 bg-white/80 backdrop-blur border-b p-4 flex justify-between items-center z-10 print:hidden">
          <div className="flex items-center gap-4">
             <button onClick={handlePrint} className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all">
               <Printer className="w-4 h-4" /> Печать
             </button>
             <button className="flex items-center gap-2 bg-zinc-100 text-zinc-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-zinc-200 transition-all">
               <Download className="w-4 h-4" /> Сохранить PDF
             </button>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Invoice Content */}
        <div className="p-8 sm:p-12 font-serif text-[13px] leading-relaxed invoice-printable">
          
          {/* Bank Table Header */}
          <table className="w-full border-collapse border border-black mb-8">
            <tbody>
              <tr>
                <td colSpan={2} rowSpan={2} className="border border-black p-2 align-top">
                  {seller.bank} <br />
                  <span className="text-[10px] italic">Банк получателя</span>
                </td>
                <td className="border border-black p-2 w-[10%]">БИК</td>
                <td className="border border-black p-2 w-[35%] font-bold">{seller.bik}</td>
              </tr>
              <tr>
                <td className="border border-black p-2">Сч. №</td>
                <td className="border border-black p-2 font-bold">{seller.corrAccount}</td>
              </tr>
              <tr>
                <td className="border border-black p-2 w-[50%]">ИНН {seller.inn}</td>
                <td className="border border-black p-2 w-[10%]">КПП</td>
                <td rowSpan={2} className="border border-black p-2 align-top italic">Сч. №</td>
                <td rowSpan={2} className="border border-black p-2 align-top font-bold">{seller.account}</td>
              </tr>
              <tr>
                <td colSpan={2} className="border border-black p-2">
                  {seller.name} <br />
                  <span className="text-[10px] italic">Получатель</span>
                </td>
              </tr>
            </tbody>
          </table>

          <h1 className="text-xl font-bold border-b-2 border-black pb-2 mb-8">
            Счет на оплату № {orderNumber} от {new Date().toLocaleDateString('ru-RU')} г.
          </h1>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <span className="w-24 shrink-0 text-zinc-500">Поставщик:</span>
              <span className="font-bold">{seller.name}, ИНН {seller.inn}, {seller.address}</span>
            </div>
            <div className="flex gap-4">
              <span className="w-24 shrink-0 text-zinc-500">Покупатель:</span>
              <span className="font-bold">
                {orgProfile?.orgName || "____________________"}, 
                ИНН {orgProfile?.inn || "__________"}, 
                {orgProfile?.address || "____________________"}
              </span>
            </div>
            <div className="flex gap-4">
              <span className="w-24 shrink-0 text-zinc-500">Основание:</span>
              <span>Договор № {orderNumber}-ADR на оказание образовательных услуг по подготовке водителей ДОПОГ.</span>
            </div>
          </div>

          {/* Service Table */}
          <table className="w-full border-collapse border-2 border-black mb-8 text-center font-sans font-medium">
            <thead>
              <tr className="bg-zinc-100">
                <th className="border border-black p-2 w-12">№</th>
                <th className="border border-black p-2">Наименование товара, работ, услуг</th>
                <th className="border border-black p-2 w-16">Кол-во</th>
                <th className="border border-black p-2 w-16">Ед.</th>
                <th className="border border-black p-2 w-24">Цена</th>
                <th className="border border-black p-2 w-24">Сумма</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2 text-left">Комплект корпоративных доступов к платформе ДОПОГ 2026 (Premium)</td>
                <td className="border border-black p-2">1</td>
                <td className="border border-black p-2">уп.</td>
                <td className="border border-black p-2">{amount.toLocaleString()}</td>
                <td className="border border-black p-2 font-bold">{amount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex flex-col items-end gap-1 mb-8">
            <div className="flex gap-12 font-bold">
              <span>Итого:</span>
              <span>{amount.toLocaleString()},00</span>
            </div>
            <div className="flex gap-12 font-bold">
              <span>Без налога (НДС):</span>
              <span>-</span>
            </div>
            <div className="flex gap-12 text-lg font-black mt-2">
              <span>Всего к оплате:</span>
              <span>{amount.toLocaleString()},00 руб.</span>
            </div>
          </div>

          <p className="mb-4">
            Всего наименований 1, на сумму {amount.toLocaleString()},00 руб. <br />
            <span className="font-bold underline italic">Тридцать тысяч рублей 00 копеек</span>
          </p>

          <div className="border-t-2 border-black pt-8 mt-24">
            <div className="flex justify-between items-center mr-24">
               <div className="flex items-end gap-4">
                  <span className="font-bold">Руководитель:</span>
                  <div className="w-48 border-b border-black text-center text-[10px] text-zinc-400">подпись (Карманович А.С.)</div>
               </div>
               <div className="flex items-end gap-4">
                  <span className="font-bold">Бухгалтер:</span>
                  <div className="w-48 border-b border-black text-center text-[10px] text-zinc-400">подпись (Карманович А.С.)</div>
               </div>
            </div>
            <div className="mt-12 opacity-30 text-[10px] text-center border p-2 border-dashed border-zinc-300">
               Место для печати
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-printable, .invoice-printable * {
            visibility: visible;
          }
          .invoice-printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
