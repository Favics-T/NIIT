import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT } from "@/constants/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact NIIT admissions, departments, and support teams.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Contact" title="Send an enquiry to the right team." description="The form uses a client component with React Hook Form and Zod validation for immediate UX feedback." light />
        </div>
      </section> */}
      <section className="container mx-auto grid gap-12 px-4 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <aside className="space-y-5">
          {[
            { icon: MapPin, label: "Address", value: CONTACT.address },
            { icon: Phone, label: "Phone", value: CONTACT.phone },
            { icon: Mail, label: "Email", value: CONTACT.email },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="border border-gray-200 p-5">
              <Icon className="mb-3 text-red-700" />
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-gray-400">{label}</p>
              <p className="mt-2 font-semibold text-[#1A1A2E]">{value}</p>
            </div>
          ))}
        </aside>
        <div className="border border-gray-200 p-6">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

