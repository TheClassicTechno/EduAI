"use client";

// -----------------------------------------------------------------------------
// ResumePage.tsx – client‑only résumé builder
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import "../school_info/styles.css";

/* ---------- Types ---------- */
interface Activity {
  activityType: string;
  position: string;
  organization: string;
  description: string;
  grades: string[];
  dates: string;
  location: string;
}

/* ---------- Helper ---------- */
const newActivity = (): Activity => ({
  activityType: "",
  position: "",
  organization: "",
  description: "",
  grades: [],
  dates: "",
  location: "",
});

export default function ResumePage() {
  /* --------------- State --------------- */
  const [student, setStudent] = useState({ name: "", email: "", phone: "" });
  const [education, setEducation] = useState({
    school: "",
    gpa: "",
    awards: "",
  });
  const [skills, setSkills] = useState("");
  const [headerSearch, setHeaderSearch] = useState("");
  const handleHeaderSearch = (e: React.FormEvent) => e.preventDefault();
  const returnToHome = () => {};   
  const [activities, setActivities] = useState<Activity[]>([newActivity()]);

  /* ------------- Handlers -------------- */
  const handleStudent = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleEducation = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setEducation({ ...education, [e.target.name]: e.target.value });

  const handleActivity = (
    idx: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setActivities((prev) => {
      const list = [...prev];
      if (type === "checkbox") {
        const s = new Set(list[idx].grades);
        checked ? s.add(value) : s.delete(value);
        list[idx].grades = Array.from(s);
      } else {
        // @ts-ignore dynamic assignment
        list[idx][name] = value;
      }
      return list;
    });
  };

  const addActivity = () =>
    activities.length < 10 && setActivities((p) => [...p, newActivity()]);

  const removeActivity = (i: number) =>
    setActivities((p) => p.filter((_, j) => j !== i));

  /* -------- Preview (forwardRef) -------- */
  const Preview: React.FC = () => (
  <div className="bg-white max-w-3xl mx-auto p-6 font-sans text-sm leading-relaxed">
    {/* Header */}
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{student.name || "Student Name"}</h1>
      <div className="text-right text-gray-600 text-sm whitespace-pre-line">
        {(student.email || "email@example.com") +
          "\n" +
          (student.phone || "555‑123‑4567")}
      </div>
    </div>

    {/* Education */}
    <h2 className="mt-6 mb-1 font-semibold text-lg border-b">Education</h2>
    <div className="flex justify-between">
      <span className="font-medium">
        {education.school || "[School Name]"}
      </span>
      {education.gpa && (
        <span className="text-gray-600">GPA: {education.gpa}</span>
      )}
    </div>
    {education.awards && <p>Awards: {education.awards}</p>}

    {/* Activities */}
    <h2 className="mt-6 mb-1 font-semibold text-lg border-b">Activities</h2>
    {activities.map((a, i) =>
      a.position || a.organization || a.description ? (
        <div key={i} className="mb-3">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">
                {a.position || "[Role]"}
                {a.organization && `, ${a.organization}`}
                {a.activityType &&
                  !["Club", "Volunteering", "Sports", "Internship", "Research", "Job", "Other"].includes(a.activityType) &&
                  ` — ${a.activityType}`}
              </p>
              <p>{a.description}</p>
              {a.grades.length > 0 && (
                <p className="text-xs text-gray-600">
                  Grades: {a.grades.join(", ")}
                </p>
              )}
            </div>
            <div className="text-right text-gray-600 text-sm whitespace-pre-line">
              {a.location && `${a.location}\n`}
              {a.dates}
            </div>
          </div>
        </div>
      ) : null
    )}
  </div>
);


  /* --------------- Render --------------- */
 /* -------------------- RENDER -------------------- */
return (
  <div className="app-container flex flex-col h-screen">
<header className="header">
  <div className="header-container">
    {/* logo block */}
    <div className="logo-container">
      <div className="edu-logo" onClick={returnToHome}>
        <span className="edu-icon">👨‍🎓</span>
        <span className="edu-text">EDU AI</span>
      </div>
      <div className="durham-logo">DURHAM</div>
    </div>

    {/* search + links */}
    <div className="header-actions">
      <div className="search-container">
        <form onSubmit={handleHeaderSearch}>
          <input
            type="text"
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            className="search-input"
            placeholder="Search…"
          />
          <button type="submit" className="search-button">→</button>
        </form>
      </div>
      <button className="header-button">ESSAY FAQ</button>
      <button className="header-button">FINANCIAL AID GUIDE</button>
    </div>
  </div>
</header>

{/* ---------- YELLOW BANNER ---------- */}
<div className="banner">
  <div className="banner-container">
    <h1 className="banner-title">BUILD RESUME</h1>
  </div>
</div>

    {/* ---------- MAIN RESUME LAYOUT ---------- */}
    <div className="flex flex-1 overflow-hidden">
      {/* -------- LEFT PANE / FORM -------- */}
      <div
        className="w-2/5 p-6 border-r overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {/* Student  */}
        <h2 className="font-bold text-xl mb-4">Student Info</h2>
        <input
          name="name"
          value={student.name}
          onChange={handleStudent}
          placeholder="Name"
          className="w-full p-2 border mb-2"
        />
        <input
          name="email"
          value={student.email}
          onChange={handleStudent}
          placeholder="Email"
          className="w-full p-2 border mb-2"
        />
        <input
          name="phone"
          value={student.phone}
          onChange={handleStudent}
          placeholder="Phone"
          className="w-full p-2 border mb-6"
        />

        {/* Education */}
        <h2 className="font-bold text-xl mb-4">Education</h2>
        <input
          name="school"
          value={education.school}
          onChange={handleEducation}
          placeholder="School"
          className="w-full p-2 border mb-2"
        />
        <input
          name="gpa"
          value={education.gpa}
          onChange={handleEducation}
          placeholder="GPA"
          className="w-full p-2 border mb-2"
        />
        <textarea
          name="awards"
          value={education.awards}
          onChange={handleEducation}
          placeholder="Awards"
          className="w-full p-2 border mb-6"
        />

        {/* Activities list */}
        <h2 className="font-bold text-xl mb-4">Activities</h2>
        {activities.map((a, i) => (
          <div key={i} className="border p-2 rounded mb-4">
            <div className="flex justify-between items-center mb-1 text-sm font-semibold">
              Activity {i + 1}
              {activities.length > 1 && (
                <button
                  onClick={() => removeActivity(i)}
                  className="text-red-500 text-xs"
                >
                  remove
                </button>
              )}
            </div>

            <select
              name="activityType"
              value={a.activityType}
              onChange={(e) => handleActivity(i, e)}
              className="w-full p-1 border mb-1 text-sm"
            >
              <option value="">Type</option>
              {[
                "Sports",
                "Internship",
                "Research",
                "Job",
                "Other",
                "Club",
                "Volunteering",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>

            <input
              name="position"
              value={a.position}
              onChange={(e) => handleActivity(i, e)}
              placeholder="Position"
              className="w-full p-1 border mb-1 text-sm"
            />
            <input
              name="organization"
              value={a.organization}
              onChange={(e) => handleActivity(i, e)}
              placeholder="Organization"
              className="w-full p-1 border mb-1 text-sm"
            />
            <textarea
              name="description"
              value={a.description}
              onChange={(e) => handleActivity(i, e)}
              placeholder="Description"
              className="w-full p-1 border mb-1 text-sm"
            />
            <input
              name="location"
              value={a.location}
              onChange={(e) => handleActivity(i, e)}
              placeholder="Location"
              className="w-full p-1 border mb-1 text-sm"
            />
            <input
              name="dates"
              value={a.dates}
              onChange={(e) => handleActivity(i, e)}
              placeholder="Dates (e.g. 2023–24)"
              className="w-full p-1 border mb-1 text-sm"
            />

            <div className="text-xs">
              Grades:&nbsp;
              {[9, 10, 11, 12].map((g) => (
                <label key={g} className="mr-2">
                  <input
                    type="checkbox"
                    name="grades"
                    value={g}
                    checked={a.grades.includes(g.toString())}
                    onChange={(e) => handleActivity(i, e)}
                  />{" "}
                  {g}
                </label>
              ))}
            </div>
          </div>
        ))}

        {activities.length < 10 && (
          <button
            onClick={addActivity}
            className="px-3 py-1 bg-gray-200 rounded mb-6"
          >
            + Add Activity
          </button>
        )}

        {/* Skills */}
        <h2 className="font-bold text-xl mb-4">Skills</h2>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g., Leadership, Web Design, etc."
          className="w-full p-2 border mb-6"
        />

        <button
          onClick={() => window.print()}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Download PDF
        </button>
      </div>

      {/* -------- RIGHT PANE / PREVIEW -------- */}
      <div className="flex-1 h-full overflow-y-auto p-4">
        <div id="print-area">
          <Preview />
        </div>
      </div>
    </div>
  </div>
);
}