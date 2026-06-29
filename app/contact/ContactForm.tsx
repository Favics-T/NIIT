"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  department: z.string().min(1, "Choose a department"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormData = z.infer<typeof schema>;

const departments = [
  "Admissions",
  "Engineering",
  "Computer Science",
  "Business Administration",
  "Information Technology",
  "General Enquiry",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      message: "",
    },
  });

  async function onSubmit() {
    setStatus("idle");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold text-[#1A1A2E]">
          Full name
        </label>
        <input id="name" {...register("name")} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-red-700" />
        {errors.name && <p className="mt-2 text-sm text-red-700">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#1A1A2E]">
          Email address
        </label>
        <input id="email" type="email" {...register("email")} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-red-700" />
        {errors.email && <p className="mt-2 text-sm text-red-700">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="department" className="mb-2 block text-sm font-bold text-[#1A1A2E]">
          Department
        </label>
        <select id="department" {...register("department")} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-red-700">
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        {errors.department && <p className="mt-2 text-sm text-red-700">{errors.department.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-bold text-[#1A1A2E]">
          Message
        </label>
        <textarea id="message" rows={6} {...register("message")} className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-red-700" />
        {errors.message && <p className="mt-2 text-sm text-red-700">{errors.message.message}</p>}
      </div>

      <button disabled={isSubmitting} className="inline-flex items-center gap-2 bg-red-700 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-400">
        <Send size={16} />
        {isSubmitting ? "Sending..." : "Send enquiry"}
      </button>

      {status === "success" && (
        <p className="border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Message sent. Our admissions team will reply soon.
        </p>
      )}
      {status === "error" && (
        <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

