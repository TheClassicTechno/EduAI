"use client";

import { useState, useEffect } from 'react';
import collegeData, { College } from './collegeData';
import './styles.css';

export default function CollegeInfoApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSchool, setSelectedSchool] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState('CAN I AFFORD TO GO HERE');
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [headerSearch, setHeaderSearch] = useState('');

  // College search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filtered = collegeData.filter(college => 
        college.INSTNM.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges([]);
    }
  }, [searchQuery]);

  const handleCollegeSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() && filteredColleges.length > 0) {
      setSelectedSchool(filteredColleges[0]);
      setCurrentPage('school');
      setActiveTab('CAN I AFFORD TO GO HERE');
    }
  };

  const handleHeaderSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add header search/navigation functionality here
    console.log('Header search:', headerSearch);
    setHeaderSearch('');
  };

  const selectCollege = (college: College) => {
    setSelectedSchool(college);
    setCurrentPage('school');
    setActiveTab('CAN I AFFORD TO GO HERE');
    setSearchQuery('');
    setFilteredColleges([]);
  };

  const goToHome = () => {
    setCurrentPage('home');
    setSearchQuery('');
    setFilteredColleges([]);
  };

  const schoolTabs = [
    'COST OF ENROLLMENT',
    'WHAT\'S THE VALUE OF GOING',
    'DEMOGRAPHICS',
    'SCHOLARSHIPS',
    'STEPS TO APPLY'
  ];

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <div className="edu-logo" onClick={goToHome}>
              <span className="edu-icon">👨‍🎓</span>
              <span className="edu-text">EDU AI</span>
            </div>
            <div className="durham-logo">
              <span>DURHAM</span>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="search-container">
              <form onSubmit={handleHeaderSearch}>
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  className="search-input"
                  placeholder="Search..."
                />
                <button type="submit" className="search-button">→</button>
              </form>
            </div>
            <button className="header-button">ESSAY FAQ</button>
            <button className="header-button">FINANCIAL AID GUIDE</button>
          </div>
        </div>
      </header>
      
      {currentPage === 'home' ? (
        <div className="home-content">
          <div className="banner">
            <div className="banner-container">
              <h1 className="banner-title">FIND COLLEGE INFO</h1>
            </div>
          </div>
          
          <div className="main-container">
            <div className="search-intro">
              <div className="telescope-icon">🔭</div>
              <h2 className="search-prompt">Type in a school's name to find information about...</h2>
              
              <div className="info-categories">
                <div className="info-category">
                  <div className="category-icon green">💰</div>
                  <div className="category-text">
                    <div className="category-title">Debt, Aid,</div>
                    <div className="category-subtitle green">Scholarships</div>
                  </div>
                </div>
                
                <div className="info-category">
                  <div className="category-icon blue">👥</div>
                  <div className="category-text">
                    <div className="category-title">College</div>
                    <div className="category-subtitle blue">Demographics</div>
                  </div>
                </div>
                
                <div className="info-category">
                  <div className="category-icon yellow">📋</div>
                  <div className="category-text">
                    <div className="category-title">Chances of</div>
                    <div className="category-subtitle yellow">Admission</div>
                  </div>
                </div>
                
                <div className="info-category">
                  <div className="category-icon purple">👣</div>
                  <div className="category-text">
                    <div className="category-title">Steps to</div>
                    <div className="category-subtitle purple">Apply</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="main-search">
              <form onSubmit={handleCollegeSearch} className="main-search-form">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="main-search-input"
                  placeholder="SEARCH SCHOOL..."
                />
                <button type="submit" className="main-search-button">🔍</button>
              </form>
              <p className="search-note">**Information available for 15-20 most popular universities in Durham</p>
              
              {filteredColleges.length > 0 && (
                <div className="main-search-results">
                  {filteredColleges.map((college) => (
                    <div 
                      key={college.UNITID} 
                      className="main-search-result-item"
                      onClick={() => selectCollege(college)}
                    >
                      {college.INSTNM} - {college.CITY}, {college.STABBR}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="school-content">
          <div className="banner">
            <div className="banner-container">
              <h1 className="banner-title">FIND COLLEGE INFO</h1>
              <div className="banner-icon">🎓</div>
            </div>
          </div>
          
          <div className="main-container">
            <p className="info-link">
              Click to explore more tuition, financial aid, & demographic info about any college: 
              <a href="https://collegescorecard.ed.gov/" className="link">https://collegescorecard.ed.gov/</a>
            </p>
            
            <div className="compare-box">
              <div className="compare-text">ADD SCHOOL TO COMPARE...</div>
              <button className="compare-button">+</button>
            </div>
            
            <div className="school-header">
              <div className="school-icon">🎓</div>
              <h2 className="school-name">{selectedSchool?.INSTNM}</h2>
              <div className="school-location">{selectedSchool?.CITY}, {selectedSchool?.STABBR}</div>
            </div>
            
            <div className="school-tabs">
              <div className="tabs-container">
                {schoolTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab ${activeTab === tab ? 'active-tab' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="tab-content">
                {activeTab === 'COST OF ENROLLMENT' && (
                  <div className="financial-info">
                    <div className="stat-cards">
                      <div className="stat-card">
                        <div className="stat-value">${Math.floor(Math.random() * 15000) + 5000}</div>
                        <div className="stat-label">AVG. DEBT</div>
                        <div className="info-icon">💡</div>
                        <p className="stat-description">
                          The typical {selectedSchool?.INSTNM} student receives federal aid to help with college costs.
                        </p>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-value">{Math.floor(Math.random() * 5) + 7} years</div>
                        <div className="stat-label">AVG. REPAY TIME</div>
                        <div className="info-icon">💡</div>
                        <p className="stat-description">
                          The typical {selectedSchool?.INSTNM} student pays off their debt in this timeframe.
                        </p>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-value">${Math.floor(Math.random() * 100) + 30}</div>
                        <div className="stat-label">AVG. MONTHLY RATE</div>
                        <div className="info-icon">💡</div>
                        <p className="stat-description">
                          The typical {selectedSchool?.INSTNM} student pays this amount monthly. This requires less than 5% of annual income.
                        </p>
                      </div>
                    </div>
                    
                    <div className="action-buttons">
                      <button className="action-button">VIEW EXPECTED AID</button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'WHAT\'S THE VALUE OF GOING' && (
                  <div className="value-info">
                    <div className="stat-cards">
                      <div className="stat-card">
                        <div className="stat-value">${Math.floor(Math.random() * 30000) + 40000}</div>
                        <div className="stat-label">MEDIAN EARNINGS</div>
                        <div className="info-icon">💡</div>
                        <p className="stat-description">
                          The median earnings of {selectedSchool?.INSTNM} graduates 10 years after graduation.
                        </p>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-value">${Math.floor(Math.random() * 10000) + 35000}</div>
                        <div className="stat-label">NATIONAL MEDIAN</div>
                        <div className="info-icon">💡</div>
                        <p className="stat-description">
                          The national median earnings for all college graduates 10 years after graduation.
                        </p>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-value">{Math.floor(Math.random() * 30) + 65}%</div>
                        <div className="stat-label">EARNINGS ADVANTAGE</div>
                        <div className="info-icon">💡</div>
                        <p className="stat-description">
                          Percentage of {selectedSchool?.INSTNM} graduates who earn more than high school graduates.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'DEMOGRAPHICS' && (
                  <div className="demographics-info">
                    <div className="stat-cards">
                      <div className="stat-card">
                        <div className="stat-value">{Math.floor(Math.random() * 30000) + 5000}</div>
                        <div className="stat-label">TOTAL ENROLLMENT</div>
                        <div className="info-icon">📊</div>
                        <p className="stat-description">
                          Total undergraduate students enrolled at {selectedSchool?.INSTNM}.
                        </p>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-value">{Math.floor(Math.random() * 40) + 40}%</div>
                        <div className="stat-label">DIVERSITY INDEX</div>
                        <div className="info-icon">👥</div>
                        <p className="stat-description">
                          Measure of racial and ethnic diversity at {selectedSchool?.INSTNM}.
                        </p>
                      </div>
                      
                      <div className="stat-card">
                        <div className="stat-value">{Math.floor(Math.random() * 20) + 10}:1</div>
                        <div className="stat-label">STUDENT:FACULTY RATIO</div>
                        <div className="info-icon">👩‍🏫</div>
                        <p className="stat-description">
                          The ratio of students to faculty at {selectedSchool?.INSTNM}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {(activeTab === 'SCHOLARSHIPS' || activeTab === 'STEPS TO APPLY') && (
                  <div className="coming-soon">
                    <div className="coming-soon-icon">🚧</div>
                    <h3 className="coming-soon-text">Coming Soon</h3>
                    <p className="coming-soon-description">
                      We're working on gathering detailed information for this section.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      
    </div>
  );
}