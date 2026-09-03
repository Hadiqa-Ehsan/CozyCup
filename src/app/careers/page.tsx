"use client";

import Link from "next/link";
import { ArrowLeft, Briefcase, Mail, MapPin, Clock } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      title: "Barista / Coffee Maker",
      type: "Full-time / Part-time",
      location: "Bucha Arcade, Multan",
      description: "Looking for an experienced barista passionate about crafting exceptional coffee and delivering great customer service.",
    },
    {
      title: "Delivery Rider",
      type: "Full-time",
      location: "Multan City",
      description: "Fast and reliable delivery riders needed with own transport to ensure hot food and drinks reach customers safely.",
    },
    {
      title: "Baker & Kitchen Assistant",
      type: "Full-time",
      location: "Bucha Arcade, Multan",
      description: "Assist in preparing fresh daily bakery items, pastries, and managing kitchen stock inventory.",
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

        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98AB81] text-[#3D2E24] shadow-md">
            <Briefcase className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Join Our Team</h1>
          <p className="text-sm text-[#3D2E24]/70 max-w-lg mx-auto">
            Be a part of Cozy Cup family! We are always looking for passionate individuals who love great coffee and warm hospitality.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-6 rounded-3xl border border-[#98AB81]/30 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <span className="text-xs font-bold px-3 py-1 bg-[#98AB81]/20 text-[#3D2E24] rounded-full w-fit">
                  {job.type}
                </span>
              </div>
              <p className="text-sm text-[#3D2E24]/80 leading-relaxed">{job.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#3D2E24]/60 pt-2 border-t border-gray-100">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#98AB81]" /> {job.location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Apply Section with Working Email Button */}
        <div className="bg-[#3D2E24] text-[#F4F6F0] p-8 rounded-3xl text-center space-y-4 shadow-lg">
          <h3 className="text-xl font-bold">Don't see your role?</h3>
          <p className="text-xs text-[#F4F6F0]/80 max-w-md mx-auto leading-relaxed">
            We are always open to meeting talented people. Send your CV directly to our HR team via email!
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@CozyCup.com.pk&su=Job%20Application%20-%20Careers&body=Hello%20Cozy%20Cup%20Team,%0A%0AI%20am%20interested%20in%20applying%20for%20a%20position%20at%20your%20company.%20Attached%20is%20my%20intro."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#98AB81] text-[#3D2E24] font-bold px-6 py-3 rounded-xl hover:bg-white transition-all shadow-md text-sm"
          >
            <Mail className="h-4 w-4" /> Apply via Email
          </a>
        </div>

      </div>
    </div>
  );
}