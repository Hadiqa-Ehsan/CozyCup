import Link from "next/link";
import { Briefcase, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function CareersPage() {
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
              <Briefcase className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-[#2D231F]">Careers at Cozy Cup</h1>
              <p className="text-xs font-semibold text-[#2D231F]/60 mt-1">Join our growing team of passionate food & retail professionals</p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-[#2D231F]/80">
            <p>
              Are you energetic, customer-focused, and passionate about the culinary or retail industry? At <strong className="text-[#2D231F]">Cozy Cup</strong>, we are always looking for dynamic individuals to join our expanding branch network across Pakistan. We offer competitive salaries, a vibrant working environment, and rapid growth opportunities.
            </p>

            <div className="space-y-4 pt-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#2D231F]">Current Open Positions</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Senior Barista & Coffee Expert", type: "Full-time • 5 Branches" },
                  { title: "Citywide Delivery Executive", type: "Full-time / Part-time" },
                  { title: "Customer Support Associate", type: "Remote / Hybrid" },
                  { title: "Inventory & Store Manager", type: "Full-time" },
                ].map((job, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#F3EDD8]/40 border border-[#BDD390]/40 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[#2D231F] shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-xs text-[#2D231F]">{job.title}</h3>
                      <p className="text-[11px] text-[#2D231F]/60 mt-0.5">{job.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#2D231F] text-[#F3EDD8] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-bold text-white text-sm">Ready to build your career with us?</h3>
                <p className="text-xs text-[#F3EDD8]/70">Send your updated CV and cover letter directly to our HR team.</p>
              </div>
              <a 
                href="mailto:Info@CozyCup.com.pk?subject=Job Application - Cozy Cup"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#BDD390] text-[#2D231F] text-xs font-black shadow hover:bg-white transition whitespace-nowrap"
              >
                <Mail className="h-4 w-4" /> Apply via Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}