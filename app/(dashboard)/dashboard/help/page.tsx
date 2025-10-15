"use client";

import { Book, MessageCircle, FileText, Video } from 'lucide-react';

const helpResources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of using Regtime Builder',
    icon: Book,
    href: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: Video,
    href: '#',
  },
  {
    title: 'Documentation',
    description: 'Detailed technical documentation',
    icon: FileText,
    href: '#',
  },
  {
    title: 'Contact Support',
    description: 'Get help from our support team',
    icon: MessageCircle,
    href: '#',
  },
];

const faqs = [
  {
    question: 'How do I search for a property?',
    answer: 'Navigate to Property Search and enter either a BBL number or property address. The system will retrieve all available data from NYC Open Data.',
  },
  {
    question: 'What is a BBL?',
    answer: 'BBL (Borough-Block-Lot) is a unique identifier for NYC properties. The borough is represented by 1-5 (Manhattan, Bronx, Brooklyn, Queens, Staten Island).',
  },
  {
    question: 'How do I calculate FAR?',
    answer: 'Use the FAR Calculator tool. Enter your lot size and the zoning FAR ratio to calculate the maximum allowable floor area.',
  },
  {
    question: 'Can I import data from Excel?',
    answer: 'Yes, use the Import/Export page to upload Excel files with property or project data.',
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#111111]">Help & Support</h2>
        <p className="text-[#636363] mt-1">Find answers and get assistance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helpResources.map((resource) => (
          <a
            key={resource.title}
            href={resource.href}
            className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 hover:border-[#78C7EA] hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start space-x-4">
              <div className="bg-[#78C7EA]/10 p-3 rounded-lg group-hover:bg-[#78C7EA] transition-colors">
                <resource.icon className="h-6 w-6 text-[#78C7EA] group-hover:text-white transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#111111] group-hover:text-[#78C7EA] transition-colors mb-1">
                  {resource.title}
                </h3>
                <p className="text-sm text-[#636363]">{resource.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#9CB2BC]/20">
        <div className="p-6 border-b border-[#EBEBEB]">
          <h3 className="text-lg font-bold text-[#111111]">Frequently Asked Questions</h3>
        </div>

        <div className="divide-y divide-[#EBEBEB]">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6">
              <h4 className="font-semibold text-[#111111] mb-2">{faq.question}</h4>
              <p className="text-sm text-[#636363]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#78C7EA]/5 border border-[#78C7EA]/20 rounded-xl p-6">
        <h3 className="font-semibold text-[#111111] mb-2">Still need help?</h3>
        <p className="text-sm text-[#636363] mb-4">
          Our support team is available Monday-Friday, 9AM-5PM EST
        </p>
        <button className="bg-[#78C7EA] hover:bg-[#496671] text-white px-6 py-2 rounded-lg transition-colors duration-200">
          Contact Support
        </button>
      </div>
    </div>
  );
}
