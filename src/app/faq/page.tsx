"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "What are your delivery timings?",
      a: "We are open from 09:00 AM to 12:30 AM from Monday to Sunday to serve your daily caffeine and food cravings.",
    },
    {
      q: "Where is Cozy Cup located?",
      a: "Our flagship branch is located at Bucha Arcade, Near Buch Villas, Multan, with multiple citywide branches.",
    },
    {
      q: "How can I track my order?",
      a: "You can check your order status live directly from your user dashboard after logging into your account.",
    },
    {
      q: "Do you offer custom bakery items?",
      a: "Yes! You can contact us directly via phone or WhatsApp for customized birthday cakes and party snacks.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F0] text-[#3D2E24] py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back to Home Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold bg-[#98AB81]/20 text-[#3D2E24] px-4 py-2 rounded-xl hover:bg-[#98AB81] transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98AB81] text-[#3D2E24] shadow-md">
            <HelpCircle className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-[#3D2E24]/70 max-w-lg mx-auto">
            Got questions? We've got answers about our menu, deliveries, and locations.
          </p>
        </div>

        {/* FAQ Accordion/Cards */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border border-[#98AB81]/30 shadow-sm space-y-2">
              <h3 className="text-base font-bold text-[#3D2E24]">{faq.q}</h3>
              <p className="text-xs text-[#3D2E24]/70 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}