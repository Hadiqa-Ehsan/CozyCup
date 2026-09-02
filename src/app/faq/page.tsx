import Link from "next/link";
import { HelpCircle, ArrowLeft, MessageCircle, Phone } from "lucide-react";

const faqs = [
  {
    q: "What are your delivery hours and coverage?",
    a: "We deliver citywide across all 5 of our active branches from 8:00 AM to 11:00 PM every single day.",
  },
  {
    q: "How can I track the status of my active order?",
    a: "You can easily view, manage, and track your active orders in real-time by visiting 'My Dashboard' after signing into your account.",
  },
  {
    q: "Are all bakery and food items prepared fresh daily?",
    a: "Yes! Absolute freshness is our core promise. All our breads, pastries, fast food ingredients, and beverages are prepared fresh daily.",
  },
  {
    q: "What payment methods do you currently support?",
    a: "We support both secure online payments as well as convenient Cash on Delivery (COD) for all orders.",
  },
  {
    q: "How can I contact support if there is an issue with my order?",
    a: "You can instantly reach our support team via phone at +92 300 4805000, email us at Info@CozyCup.com.pk, or click the WhatsApp chat button in our footer.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F3EDD8] p-6 lg:p-12 text-[#2D231F]">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-[#2D231F] bg-white/80 px-4 py-2 rounded-2xl shadow-sm hover:bg-white transition-all border border-[#BDD390]/40"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-[#BDD390]/50 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-[#BDD390]/30 pb-6">
            <div className="p-4 bg-[#2D231F] rounded-2xl text-[#BDD390] shadow-md">
              <HelpCircle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#2D231F]">Frequently Asked Questions</h1>
              <p className="text-xs font-semibold text-[#2D231F]/60 mt-1">Everything you need to know about Cozy Cup</p>
            </div>
          </div>

          {/* FAQ Accordions List */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F3EDD8]/40 border border-[#BDD390]/30 space-y-2 transition-all hover:bg-[#F3EDD8]/60">
                <h2 className="text-sm font-bold text-[#2D231F] flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 bg-[#2D231F] text-[#BDD390] rounded-md font-mono">Q{idx+1}</span>
                  {faq.q}
                </h2>
                <p className="text-xs text-[#2D231F]/70 leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Still have questions banner */}
          <div className="p-6 rounded-2xl bg-[#2D231F] text-[#F3EDD8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-white text-sm">Still have questions or need help?</h3>
              <p className="text-xs text-[#F3EDD8]/70">Our support team is available during all business hours.</p>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="tel:+923004805000"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#BDD390] hover:text-[#2D231F] transition text-xs font-bold text-[#BDD390]"
              >
                <Phone className="h-3.5 w-3.5" /> Call Us
              </a>
              <a 
                href="https://wa.me/923004805000"
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#BDD390] text-[#2D231F] transition text-xs font-black shadow hover:bg-white"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}