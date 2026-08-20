"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TBD: no backend email/ticketing service is wired up yet — this just
    // confirms receipt in the UI. Hook up a real notification (email, DB
    // table, or support-desk integration) before treating this as live.
    setSent(true);
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-8">
      <h1 className="mb-2 text-2xl font-semibold">Contact Us</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Have a question or feedback? Send us a message.
      </p>

      {sent ? (
        <div className="rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-800">
          Thanks for reaching out! (Demo only — messages aren&apos;t actually delivered yet. TBD.)
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              required
              rows={5}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button type="submit">Send message</Button>
        </form>
      )}

      <div className="mt-8 border-t pt-6 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">Other ways to reach us</p>
        <p className="mt-1">Phone: TBD (sample project — no real support line)</p>
        <p>Email: TBD (sample project — no real inbox)</p>
      </div>
    </main>
  );
}
