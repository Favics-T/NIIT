import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Mail, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllFaculties, getAllStaff } from "@/lib/contentful";

type Props = {
  searchParams: Promise<{ faculty?: string; department?: string }>;
};

export const metadata: Metadata = {
  title: "Staff Directory",
  description: "Find NIIT academic staff and lecturers by faculty or department.",
};

export default async function StaffPage({ searchParams }: Props) {
  await connection();
  const filters = await searchParams;
  const [staff, faculties] = await Promise.all([getAllStaff(filters), getAllFaculties()]);

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Staff"
            title="Staffs and Senior Stffs of NIIT."
            description="            You can search for staff here, our staff are highly educated and are excellent."
            light
          />
        </div>
      </section>
      <section className="container mx-auto px-4 py-12 lg:px-8">
        <form className="mb-10 flex flex-col gap-3 border border-gray-200 p-4 md:flex-row">
          <label className="flex flex-1 items-center gap-2 border border-gray-200 px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <select name="faculty" defaultValue={filters.faculty ?? ""} className="w-full bg-transparent text-sm outline-none">
              <option value="">All faculties</option>
              {faculties.map((faculty) => (
                <option key={faculty.slug} value={faculty.slug}>{faculty.shortName}</option>
              ))}
            </select>
          </label>
          <button className="bg-red-700 px-6 py-3 text-sm font-bold text-white">Apply filter</button>
          <Link href="/staff" className="px-6 py-3 text-center text-sm font-bold text-red-700">Reset</Link>
        </form>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <article key={member.id} className="border border-gray-200 bg-white p-6">
              <div className="relative mb-5 h-24 w-24 overflow-hidden bg-gray-100">
                <Image src={member.profileImage} alt={member.name} fill sizes="96px" className="object-cover" />
              </div>
              <h2 className="text-xl font-extrabold text-[#1A1A2E]">{member.name}</h2>
              <p className="mt-1 text-sm font-semibold text-red-700">{member.title}</p>
              <a href={`mailto:${member.email}`} className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <Mail size={15} /> {member.email}
              </a>
              <div className="mt-5 flex flex-wrap gap-2">
                {member.expertise.map((skill) => (
                  <span key={skill} className="bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
