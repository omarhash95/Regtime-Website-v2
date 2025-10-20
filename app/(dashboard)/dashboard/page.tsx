"use client";

import Link from 'next/link';
import {
  FolderKanban,
  Search,
  Calculator,
  Building2,
  FileText,
  TrendingUp,
  Users,
  CheckCircle2,
} from 'lucide-react';

const dashboardCards = [
  {
    title: 'Active Projects',
    value: '12',
    change: '+2 this month',
    icon: FolderKanban,
    href: '/dashboard/projects',
    color: 'bg-[#78C7EA]',
  },
  {
    title: 'Properties Analyzed',
    value: '48',
    change: '+8 this week',
    icon: Building2,
    href: '/dashboard/property-search',
    color: 'bg-[#496671]',
  },
  {
    title: 'Compliance Checks',
    value: '156',
    change: '+24 this month',
    icon: CheckCircle2,
    href: '/dashboard/projects',
    color: 'bg-[#9CB2BC]',
  },
  {
    title: 'Team Members',
    value: '6',
    change: '2 active now',
    icon: Users,
    href: '/dashboard/projects',
    color: 'bg-[#78C7EA]',
  },
];

const quickActions = [
  {
    title: 'Property Search',
    description: 'Search NYC properties by BBL or address',
    icon: Search,
    href: '/dashboard/property-search',
  },
  {
    title: 'FAR Calculator',
    description: 'Calculate floor area ratio for development',
    icon: Calculator,
    href: '/dashboard/far-calculator',
  },
  {
    title: 'Project Management',
    description: 'Manage timelines and milestones',
    icon: Building2,
    href: '/dashboard/project-management',
  },
  {
    title: 'Import/Export',
    description: 'Import data from Excel or export reports',
    icon: FileText,
    href: '/dashboard/import-export',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#111111]">Dashboard Overview</h2>
        <p className="text-[#636363] mt-2">
          Welcome back! Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 hover:border-[#78C7EA] hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-[#636363] group-hover:text-[#111111] transition-colors">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-[#111111] mt-2">
                  {card.value}
                </p>
                <p className="text-xs text-[#78C7EA] mt-2 font-medium">
                  {card.change}
                </p>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-bold text-[#111111] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20 hover:border-[#78C7EA] hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-[#78C7EA]/10 p-3 rounded-lg group-hover:bg-[#78C7EA] transition-colors">
                  <action.icon className="h-6 w-6 text-[#78C7EA] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-[#111111] group-hover:text-[#78C7EA] transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-sm text-[#636363] mt-1">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-[#9CB2BC]/20">
        <h3 className="text-xl font-bold text-[#111111] mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 pb-4 border-b border-[#EBEBEB] last:border-0 last:pb-0"
            >
              <div className="h-2 w-2 rounded-full bg-[#78C7EA] mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-[#111111]">
                  Property analysis completed for Project #{index + 1}
                </p>
                <p className="text-xs text-[#636363] mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
