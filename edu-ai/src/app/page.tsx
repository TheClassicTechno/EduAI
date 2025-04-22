import React from "react";

export default function ServicesPage() {
  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-300 p-6">
        <nav className="text-base">
          <div className="flex flex-col gap-5"> {/* gap between home, about, tools */}
            <MenuItem label="HOME" icon="/images/home.png" />
            <MenuItem label="ABOUT" icon="/images/about.png" />
            <MenuItem label="TOOLS" icon="/images/tools.png" hasChildren>
              <SubItem label="ESSAY" icon="/images/essay.png" />
              <SubItem label="RESUME" icon="/images/resume.png" />
              <SubItem label="SCHOOL INFO" icon="/images/school.png" />
            </MenuItem>
            <MenuItem label="GUIDES" icon="/images/guides.png" hasChildren>
              <SubItem label="FAQ" icon="/images/faq.png" />
              <SubItem label="FINANCIAL AID" icon="/images/aid.png" />
            </MenuItem>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white">
        <div className="flex flex-col items-center mt-24">
          <div className="flex items-center space-x-4">
            {/*<img src="" alt="Services icon" className="w-20 h-20 object-contain" />*/}
            <h1 className="text-6xl font-extrabold text-blue-900 tracking-wide">SERVICES</h1>
          </div>
          <p className="mt-4 text-xl font-semibold">HELP ME WITH...</p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          <ServiceCard title="CREATING COLLEGE ESSAYS" icon="/images/essay_editing.png" />
          <ServiceCard title="WRITING RESUME / ACTIVITIES" icon="/images/frame34.png" />
          <ServiceCard title="FINDING SCHOOL INFO" icon="/images/frame35.png" />
        </div>
      </main>
    </div>
  );
}

function MenuItem({ label, icon, hasChildren, children }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <img src={icon} alt={label} className="w-10 h-10 object-contain" />
        <span className="font-semibold text-gray-800">{label}</span>
      </div>
      {hasChildren && (
        <div className="ml-6 mt-1 space-y-1 text-sm text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}

function SubItem({ label, icon }) {
  return (
    <div className="flex items-center gap-2 hover:underline cursor-pointer text-gray-700">
      <img src={icon} alt={label} className="w-10 h-10 object-contain" />
      <span>{label}</span>
    </div>
  );
}

function ServiceCard({ title, icon }) {
  return (
    <div className="w-64 h-64 flex flex-col items-center justify-start pt-5 shadow-md border border-gray-300">
      <img src={icon} alt={title} className="w-40 h-40 object-contain" />
      <p className="text-center font-semibold text-sm px-2 mt-4">{title}</p>
    </div>
  );
}
