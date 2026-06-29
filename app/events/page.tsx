import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllEvents } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming NIIT events, ceremonies, conferences, and open days.",
};

async function getRequestTimestamp() {
  return Date.now();
}

export default async function EventsPage() {
  await connection();
  const events = await getAllEvents();
  const now = await getRequestTimestamp();

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Events"
            title="Fresh upcoming events."
            description="Events use SSR because dates, registration state, and time-sensitive displays need to be fresh on each request."
            light
          />
        </div>
      </section>
      <section className="container mx-auto grid gap-6 px-4 py-20 md:grid-cols-2 lg:px-8">
        {events.map((event) => {
          const days = Math.max(0, Math.ceil((new Date(event.startDate).getTime() - now) / 86400000));
          return (
            <article key={event.id} className="overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="relative aspect-[16/9] bg-gray-100">
                <Image src={event.coverImage.includes("placeholder") ? "/images/NIIT.webp" : event.coverImage} alt={event.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">{event.category}</p>
                <h2 className="mt-3 text-2xl font-extrabold text-[#1A1A2E]">{event.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{event.description}</p>
                <div className="mt-5 space-y-2 text-sm text-gray-600">
                  <p className="flex gap-2"><CalendarDays size={16} className="text-red-700" />{new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date(event.startDate))}</p>
                  <p className="flex gap-2"><Clock size={16} className="text-red-700" />{days} days remaining</p>
                  <p className="flex gap-2"><MapPin size={16} className="text-red-700" />{event.location}</p>
                </div>
                {event.registrationLink && (
                  <Link href={event.registrationLink} className="mt-6 inline-flex bg-red-700 px-5 py-3 text-sm font-bold text-white">
                    Register / Learn more
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
