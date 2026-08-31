"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ChevronUp } from "lucide-react";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="relative bg-[#3D2E24] text-[#F4F6F0] py-12 px-6 border-t border-[#98AB81]/20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Logo & Contact Info Side by Side */}
        <div className="md:col-span-5">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Logo without duplicate text */}
            <div className="inline-flex items-center gap-3 w-fit shrink-0">
              <Logo light size={56} />
            </div>

            {/* Contact Details - Side by side with logo */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-[#F4F6F0]">Contact Us</h3>
              
              <div className="space-y-2.5 text-sm">
                {/* Phone */}
                <a 
                  href="tel:+923004805000" 
                  className="flex items-start gap-3 p-1.5 rounded-xl transition-all duration-300 hover:bg-[#98AB81]/10 hover:translate-x-1 group w-full"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#98AB81] text-[#3D2E24] transition-transform duration-300 group-hover:scale-110">
                    <Phone className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#F4F6F0]/60 tracking-wide">PHONE</p>
                    <p className="font-semibold text-[#F4F6F0] group-hover:text-[#98AB81] transition-colors">+923004805000</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Info@CozyCup.com.pk&su=Inquiry%20from%20Website&body=Hello%20Cozy%20Cup%20Team," 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-1.5 rounded-xl transition-all duration-300 hover:bg-[#98AB81]/10 hover:translate-x-1 group w-full"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#98AB81] text-[#3D2E24] transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#F4F6F0]/60 tracking-wide">EMAIL</p>
                    <p className="font-semibold text-[#F4F6F0] group-hover:text-[#98AB81] transition-colors">Info@CozyCup.com.pk</p>
                  </div>
                </a>

                {/* Address */}
                <a 
                  href="https://maps.google.com/?q=Bucha+Arcade+Near+Buch+Villas+Multan" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-1.5 rounded-xl transition-all duration-300 hover:bg-[#98AB81]/10 hover:translate-x-1 group w-full"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#98AB81] text-[#3D2E24] transition-transform duration-300 group-hover:scale-110">
                    <MapPin className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-[#F4F6F0]/60 tracking-wide">ADDRESS</p>
                    <p className="font-semibold text-[#F4F6F0] leading-snug group-hover:text-[#98AB81] transition-colors">
                      Cozy Cup - Bucha Arcade, Near Buch Villas, Multan
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timings, Terms, Socials, Apps */}
        <div className="md:col-span-7 space-y-6">
          {/* Timings Header */}
          <div className="flex items-center gap-2 text-xl font-bold text-[#F4F6F0]">
            <Clock className="h-5 w-5 text-[#98AB81]" />
            <h3>Our Timings</h3>
          </div>

          {/* Timing Cards */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center rounded-xl border border-[#98AB81]/20 bg-[#F4F6F0] p-3.5 shadow-sm text-[#3D2E24] transition-transform duration-300 hover:scale-[1.01]">
              <span className="font-bold">Monday - Thursday</span>
              <span className="font-semibold">09:00 AM - 12:30 AM</span>
            </div>

            <div className="flex justify-between items-start rounded-xl border border-[#98AB81]/20 bg-[#F4F6F0] p-3.5 shadow-sm text-[#3D2E24] transition-transform duration-300 hover:scale-[1.01]">
              <span className="font-bold">Friday</span>
              <div className="text-right font-semibold">
                <p>09:00 AM - 12:30 PM</p>
                <p>02:00 PM - 12:30 AM</p>
              </div>
            </div>

            <div className="flex justify-between items-center rounded-xl border border-[#98AB81]/20 bg-[#F4F6F0] p-3.5 shadow-sm text-[#3D2E24] transition-transform duration-300 hover:scale-[1.01]">
              <span className="font-bold">Saturday - Sunday</span>
              <span className="font-semibold">09:00 AM - 12:30 AM</span>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex gap-3 text-sm pt-1">
            <Link
              href="/terms"
              className="rounded-xl border border-[#98AB81] bg-[#98AB81] px-4 py-2 text-[#3D2E24] font-bold hover:bg-[#F4F6F0] transition-all duration-300 hover:scale-105 shadow-sm"
            >
              Terms and conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="rounded-xl border border-[#98AB81] bg-[#98AB81] px-4 py-2 text-[#3D2E24] font-bold hover:bg-[#F4F6F0] transition-all duration-300 hover:scale-105 shadow-sm"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Follow Us & Apps Section */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-[#F4F6F0]">Follow Us</h4>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <div className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
              </a>
              
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </a>

              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                <div className="w-9 h-9 rounded-xl bg-[#F4F6F0] flex items-center justify-center text-[#3D2E24] transition-all duration-300 hover:bg-[#98AB81] hover:scale-110 hover:shadow-lg">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <div className="w-9 h-9 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
              </a>

              <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
                <div className="w-9 h-9 rounded-xl bg-[#FFFC00] flex items-center justify-center text-black transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.002 2c-3.921 0-6.284 2.825-6.284 5.753 0 1.58.625 2.81 1.252 3.755.195.295.321.485.321.72 0 .34-.346.545-.75.785-1.07.635-2.348 1.393-2.348 2.875 0 1.18 1.01 1.838 2.15 2.153.282.078.435.321.36.6-.145.54-.42 1.562-1.3 1.95-.31.137-.4.383-.23.63.26.38 1.71 1.25 4.19 1.25 1.09 0 2.05-.18 2.639-.338.22-.06.44-.06.66 0 .589.158 1.549.338 2.639.338 2.48 0 3.93-.87 4.19-1.25.17-.247.08-.493-.23-.63-.88-.388-1.155-1.41-1.3-1.95-.075-.279.078-.522.36-.6 1.14-.315 2.15-.973 2.15-2.153 0-1.482-1.278-2.24-2.348-2.875-.404-.24-.75-.445-.75-.785 0-.235.126-.425.321-.72.627-.945 1.252-2.175 1.252-3.755 0-2.928-2.363-5.753-6.284-5.753z"/></svg>
                </div>
              </a>

              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <div className="w-9 h-9 rounded-xl bg-[#F4F6F0] flex items-center justify-center text-[#3D2E24] transition-all duration-300 hover:bg-[#98AB81] hover:scale-110 hover:shadow-lg">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.29-2.26.51-4.5 2.13-6.09 1.39-1.38 3.32-2.18 5.27-2.18.12 0 .24 0 .36.01v4.08c-.12 0-.24-.01-.36 0-1.07.03-2.13.48-2.85 1.28-.78.83-1.11 2.01-.9 3.12.18 1.02.83 1.92 1.74 2.39.92.49 2.05.51 3 .07.96-.44 1.64-1.35 1.83-2.39.09-.57.08-1.16.08-1.74V.02z"/></svg>
                </div>
              </a>
            </div>

            {/* App Store Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="inline-block transition-transform duration-300 hover:scale-105">
                <div className="bg-[#F4F6F0] text-[#3D2E24] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#98AB81]/30 hover:bg-[#98AB81] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.61-.343V2.157c.18-.12.388-.236.609-.343zm11.297 11.297l2.873 2.873-12.015 6.94c-.452.26-.91.332-1.31.258l10.452-10.071zm0-2.222L4.454.818C4.854.744 5.312.816 5.764 10.077l12.015 6.94-2.873 2.873Z"/></svg>
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider leading-none font-medium">GET IT ON</p>
                    <p className="text-xs font-bold leading-tight">Google Play</p>
                  </div>
                </div>
              </a>

              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="inline-block transition-transform duration-300 hover:scale-105">
                <div className="bg-[#F4F6F0] text-[#3D2E24] px-3 py-1.5 rounded-lg flex items-center gap-2 border border-[#98AB81]/30 hover:bg-[#98AB81] transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.21.67-2.9 1.48-.62.72-1.16 1.88-1.01 3.01 1.12.09 2.25-.55 2.92-1.37Z"/></svg>
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider leading-none font-medium">Download on the</p>
                    <p className="text-xs font-bold leading-tight">App Store</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#98AB81] text-[#3D2E24] shadow-md hover:bg-[#F4F6F0] transition-all duration-300 hover:scale-110"
        aria-label="Back to top"
      >
        <ChevronUp className="h-6 w-6 stroke-[2.5]" />
      </button>
    </footer>
  );
}