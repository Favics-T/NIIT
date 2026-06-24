import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import type { UniversityEvent } from "@/types/event";
import { formatShortDate, formatDate } from "@/lib/utils";
import { MapPin, ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

interface UpcomingEventsProps {
  events: UniversityEvent[];
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Events"
            title="Upcoming Events"
            description="Mark your calendar for these key NIIT events and activities."
          />
          <Link
            href="/events"
            className="flex items-center gap-1.5 text-sm font-semibold text-red-700 hover:text-red-800 whitespace-nowrap"
          >
            View All Events <ArrowRight size={15} />
          </Link>
        </div>

        {/* Event list */}
        <div className="space-y-4">
          {events.map((event) => {
            const { day, month } = formatShortDate(event.startDate);
            return (
              <Link
                key={event.id}
                href={event.registrationLink ?? `/events/${event.slug}`}
                className="group flex items-start gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-red-100 hover:shadow-lg"
              >
                {/* Date badge */}
                <div className="flex w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-red-700 py-3 text-white shadow-md shadow-red-700/20">
                  <span className="text-xl font-extrabold leading-none">{day}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-red-200 mt-0.5">
                    {month}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="gray">{event.category}</Badge>
                    {event.isFeatured && (
                      <Badge variant="red">Featured</Badge>
                    )}
                  </div>
                  <h3 className="mb-1 text-sm font-bold text-[#1A1A2E] transition-colors group-hover:text-red-700 truncate">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{event.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={11} className="text-red-500" />
                      {formatDate(event.startDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-red-500" />
                      {event.location}
                    </span>
                  </div>
                </div>

                <ArrowRight
                  size={18}
                  className="mt-1 flex-shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-red-600"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
