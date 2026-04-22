import React from "react";

const BrowserMockup = ({ title, stack }: { title: string; stack: string[] }) => (
  <div className="w-full rounded-t-lg overflow-hidden bg-[#1a1a1a]">
    {/* Browser chrome */}
    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111]">
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="flex-1 mx-3 h-4 bg-white/5 rounded-sm flex items-center px-2">
        <span className="text-[7px] text-white/20 font-body truncate">{"https://" + title.toLowerCase().replace(/\s+/g, "-") + ".app"}</span>
      </div>
    </div>
    {/* Page content mockup */}
    <div className="p-4 space-y-3 min-h-[120px]">
      {/* Nav bar */}
      <div className="flex justify-between items-center">
        <div className="w-12 h-2 bg-white/10 rounded" />
        <div className="flex gap-2">
          <div className="w-8 h-1.5 bg-white/5 rounded" />
          <div className="w-8 h-1.5 bg-white/5 rounded" />
          <div className="w-8 h-1.5 bg-white/5 rounded" />
        </div>
      </div>
      {/* Hero */}
      <div className="pt-3 space-y-2">
        <div className="w-3/4 h-3 bg-white/10 rounded" />
        <div className="w-1/2 h-2 bg-white/5 rounded" />
      </div>
      {/* Cards row */}
      <div className="flex gap-2 pt-2">
        <div className="flex-1 h-10 bg-white/5 rounded" />
        <div className="flex-1 h-10 bg-white/5 rounded" />
        <div className="flex-1 h-10 bg-white/5 rounded hidden md:block" />
      </div>
      {/* Stack pills */}
      <div className="flex gap-1 pt-1">
        {stack.slice(0, 3).map((s, i) => (
          <span key={i} className="text-[6px] bg-white/10 text-white/30 rounded px-1.5 py-0.5">{s}</span>
        ))}
      </div>
    </div>
  </div>
);

const PhoneMockup = ({ title, stack }: { title: string; stack: string[] }) => (
  <div className="w-full flex justify-center py-2">
    <div className="w-[100px] rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/10">
      {/* Status bar */}
      <div className="flex justify-between items-center px-2 py-1">
        <span className="text-[5px] text-white/20">9:41</span>
        <div className="w-8 h-1.5 bg-white/10 rounded-full" />
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1.5 bg-white/10 rounded-sm" />
          <div className="w-1.5 h-1.5 bg-white/10 rounded-sm" />
        </div>
      </div>
      {/* App content */}
      <div className="p-2 space-y-2 min-h-[130px]">
        <div className="w-3/4 h-2 bg-white/10 rounded" />
        <div className="w-full h-12 bg-white/5 rounded-lg" />
        <div className="space-y-1">
          <div className="w-full h-1.5 bg-white/5 rounded" />
          <div className="w-2/3 h-1.5 bg-white/5 rounded" />
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-6 bg-white/8 rounded" />
          <div className="flex-1 h-6 bg-white/5 rounded" />
        </div>
        <div className="flex gap-0.5 pt-1">
          {stack.slice(0, 2).map((s, i) => (
            <span key={i} className="text-[5px] bg-white/10 text-white/30 rounded px-1 py-0.5">{s}</span>
          ))}
        </div>
      </div>
      {/* Home indicator */}
      <div className="flex justify-center pb-1">
        <div className="w-8 h-0.5 bg-white/15 rounded-full" />
      </div>
    </div>
  </div>
);

const DesignMockup = ({ title }: { title: string }) => (
  <div className="w-full rounded-t-lg overflow-hidden bg-[#1a1a1a]">
    {/* Figma-like toolbar */}
    <div className="flex items-center gap-2 px-3 py-2 bg-[#111]">
      <div className="w-3 h-3 rounded-sm bg-white/10" />
      <div className="w-16 h-3 bg-white/5 rounded-sm" />
      <div className="flex-1" />
      <div className="flex gap-1">
        <div className="w-3 h-3 rounded-full bg-white/10" />
        <div className="w-3 h-3 rounded-full bg-white/10" />
      </div>
    </div>
    {/* Canvas */}
    <div className="p-4 min-h-[120px] relative">
      {/* Artboard */}
      <div className="border border-dashed border-white/10 rounded-lg p-3 space-y-2">
        <div className="flex gap-2">
          <div className="w-1/3 h-16 bg-white/5 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <div className="w-full h-2.5 bg-white/8 rounded" />
            <div className="w-3/4 h-2 bg-white/5 rounded" />
            <div className="w-1/2 h-2 bg-white/5 rounded" />
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="w-8 h-4 bg-white/10 rounded" />
          <div className="w-8 h-4 bg-white/5 rounded" />
        </div>
      </div>
      {/* Selection handles */}
      <div className="absolute top-3 right-3 w-1 h-1 bg-blue-400/40 rounded-full" />
      <div className="absolute bottom-3 left-3 w-1 h-1 bg-blue-400/40 rounded-full" />
    </div>
  </div>
);

const FullstackMockup = ({ title, stack }: { title: string; stack: string[] }) => (
  <div className="w-full rounded-t-lg overflow-hidden bg-[#1a1a1a]">
    {/* Terminal + browser split */}
    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111]">
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="w-2 h-2 rounded-full bg-white/10" />
      <div className="flex-1 flex gap-1 ml-2">
        <div className="px-2 py-0.5 bg-white/5 rounded-t-sm">
          <span className="text-[6px] text-white/30">Frontend</span>
        </div>
        <div className="px-2 py-0.5 bg-white/10 rounded-t-sm">
          <span className="text-[6px] text-white/50">API</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 min-h-[120px]">
      {/* Frontend side */}
      <div className="p-3 space-y-2 border-r border-white/5">
        <div className="w-full h-2 bg-white/8 rounded" />
        <div className="w-3/4 h-1.5 bg-white/5 rounded" />
        <div className="flex gap-1 pt-1">
          <div className="flex-1 h-8 bg-white/5 rounded" />
          <div className="flex-1 h-8 bg-white/5 rounded" />
        </div>
      </div>
      {/* Backend/terminal side */}
      <div className="p-3 space-y-1.5 bg-[#111]">
        <div className="flex items-center gap-1">
          <span className="text-[6px] text-green-400/40">$</span>
          <div className="w-16 h-1.5 bg-white/5 rounded" />
        </div>
        <div className="w-12 h-1.5 bg-white/5 rounded ml-2" />
        <div className="flex items-center gap-1">
          <span className="text-[6px] text-green-400/40">$</span>
          <div className="w-20 h-1.5 bg-white/5 rounded" />
        </div>
        <div className="flex gap-0.5 pt-2">
          {stack.filter(s => ["PHP", "Symfony", "MySQL", "PostgreSQL", "Node.js"].includes(s)).slice(0, 2).map((s, i) => (
            <span key={i} className="text-[5px] bg-white/10 text-white/30 rounded px-1 py-0.5">{s}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function ProjectMockup({ type, title, stack }: { type: string; title: string; stack: string[] }) {
  switch (type) {
    case "mobile":
      return <PhoneMockup title={title} stack={stack} />;
    case "design":
      return <DesignMockup title={title} />;
    case "fullstack":
      return <FullstackMockup title={title} stack={stack} />;
    default:
      return <BrowserMockup title={title} stack={stack} />;
  }
}
