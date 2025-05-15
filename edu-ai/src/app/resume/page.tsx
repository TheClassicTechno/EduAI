"use client";

import React, { useState } from 'react';

export default function ResumePage() {
  const [currentTab, setCurrentTab] = useState<'input' | 'feedback' | 'resume'>('input');

  const [activities, setActivities] = useState([
    {
      activityType: '',
      position: '',
      organization: '',
      description: '',
      grades: [],
    },
  ]);

  const [education, setEducation] = useState({
    school: '',
    awards: '',
    gpa: '',
  });

  const handleActivityChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    setActivities((prev) => {
      const updated = [...prev];
      if (type === 'checkbox') {
        const grades = updated[index].grades;
        updated[index].grades = checked
          ? [...grades, value]
          : grades.filter((g) => g !== value);
      } else {
        updated[index][name] = value;
      }
      return updated;
    });
  };

  const addActivity = () => {
    if (activities.length < 10) {
      setActivities((prev) => [...prev, {
        activityType: '',
        position: '',
        organization: '',
        description: '',
        grades: [],
      }]);
    }
  };

  const removeActivity = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetFeedback = () => {
    setCurrentTab('feedback');
  };

  const handleTabSwitch = (tab) => {
    if (tab !== 'input') {
      setCurrentTab(tab);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/3 p-6 border-r border-gray-300 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        <h2 className="text-xl font-bold mb-4">1. Activities & Awards</h2>

        {activities.map((activity, index) => (
          <div key={index} className="mb-6 border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Activity {index + 1}</h3>
              {activities.length > 1 && (
                <button
                  onClick={() => removeActivity(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Activity type*</label>
              <select
                name="activityType"
                value={activity.activityType}
                onChange={(e) => handleActivityChange(index, e)}
                className="w-full p-2 border"
              >
                <option value="">- Choose an option -</option>
                <option value="Club">Club</option>
                <option value="Sports">Sports</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Internship">Internship</option>
                <option value="Research">Research</option>
                <option value="Part-time Job">Part-time Job</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Position/Leadership description*</label>
              <input
                name="position"
                maxLength={50}
                value={activity.position}
                onChange={(e) => handleActivityChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Organization Name</label>
              <input
                name="organization"
                maxLength={100}
                value={activity.organization}
                onChange={(e) => handleActivityChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Activity Description*</label>
              <textarea
                name="description"
                maxLength={150}
                value={activity.description}
                onChange={(e) => handleActivityChange(index, e)}
                className="w-full p-2 border"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Participation grade levels*</label>
              <div className="flex flex-wrap gap-2">
                {[9, 10, 11, 12].map((grade) => (
                  <label key={grade} className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      name="grades"
                      value={grade.toString()}
                      checked={activity.grades.includes(grade.toString())}
                      onChange={(e) => handleActivityChange(index, e)}
                    />
                    <span>{grade}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}

        {activities.length < 10 && (
          <button onClick={addActivity} className="mb-6 bg-gray-200 px-4 py-2 rounded">+ Add Activity</button>
        )}

        <h3 className="text-lg font-semibold mb-2">Education</h3>
        <div className="mb-2">
          <label className="block text-sm font-semibold">School Name</label>
          <input
            name="school"
            value={education.school}
            onChange={handleEducationChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-semibold">Awards</label>
          <textarea
            name="awards"
            value={education.awards}
            onChange={handleEducationChange}
            className="w-full p-2 border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">GPA</label>
          <input
            name="gpa"
            value={education.gpa}
            onChange={handleEducationChange}
            className="w-full p-2 border"
          />
        </div>

        <button onClick={handleGetFeedback} className="bg-blue-500 text-white px-4 py-2 rounded">Get Feedback</button>
      </div>

      {/* Right Panel - Feedback and Resume Tabs */}
      <div className="w-2/3 p-6">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => handleTabSwitch('feedback')}
            className={`px-4 py-2 rounded ${currentTab === 'feedback' ? 'bg-yellow-300' : 'bg-gray-200'}`}
          >
            2. Activities Feedback
          </button>
          <button
            onClick={() => handleTabSwitch('resume')}
            className={`px-4 py-2 rounded ${currentTab === 'resume' ? 'bg-yellow-300' : 'bg-gray-200'}`}
          >
            3. Build Resume
          </button>
        </div>

        {currentTab === 'feedback' && (
          <div className="border border-gray-300 h-full p-4">Feedback Panel (empty for now)</div>
        )}

        {currentTab === 'resume' && (
          <div className="border border-gray-300 h-full p-4">Resume Template (empty for now)</div>
        )}
      </div>
    </div>
  );
}
