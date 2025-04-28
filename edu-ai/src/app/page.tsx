"use client";

import { useState, useEffect } from 'react';
import collegeData, { College } from './collegeData';
import './styles.css';

export default function CollegeInfoApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSchool, setSelectedSchool] = useState<College | null>(null);
  const [comparisonSchool, setComparisonSchool] = useState<College | null>(null);
  const [activeTab, setActiveTab] = useState('COST OF ENROLLMENT');
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [headerSearch, setHeaderSearch] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [compareSearchQuery, setCompareSearchQuery] = useState('');
  const [compareFilteredColleges, setCompareFilteredColleges] = useState<College[]>([]);
  const [showCompareSearch, setShowCompareSearch] = useState(false);

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

  // Comparison school search functionality
  useEffect(() => {
    if (compareSearchQuery.length > 2) {
      const filtered = collegeData.filter(college => 
        college.INSTNM.toLowerCase().includes(compareSearchQuery.toLowerCase()) &&
        (!selectedSchool || college.UNITID !== selectedSchool.UNITID)
      ).slice(0, 5);
      setCompareFilteredColleges(filtered);
    } else {
      setCompareFilteredColleges([]);
    }
  }, [compareSearchQuery, selectedSchool]);

  const handleCollegeSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() && filteredColleges.length > 0) {
      setSelectedSchool(filteredColleges[0]);
      setCurrentPage('school');
      setActiveTab('COST OF ENROLLMENT');
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
    setActiveTab('COST OF ENROLLMENT');
    setSearchQuery('');
    setFilteredColleges([]);
  };

  const selectComparisonCollege = (college: College) => {
    setComparisonSchool(college);
    setCompareSearchQuery('');
    setCompareFilteredColleges([]);
    setShowCompareSearch(false);
    setCompareMode(true);
  };

  const toggleCompareSearch = () => {
    setShowCompareSearch(!showCompareSearch);
    if (!showCompareSearch) {
      setCompareSearchQuery('');
    }
  };

  const removeComparison = () => {
    setComparisonSchool(null);
    setCompareMode(false);
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

  // Generate mock data for display
  const getMockData = (schoolName: string) => {
    // Use a deterministic approach based on school name for consistent values
    const nameSum = schoolName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    
    const seed = nameSum % 1000;
    const mockData = {
      avgDebt: Math.floor((seed * 31) % 15000) + 5000,
      avgRepayTime: Math.floor((seed * 13) % 5) + 7,
      avgMonthlyRate: Math.floor((seed * 7) % 100) + 30,
      medianEarnings: Math.floor((seed * 19) % 30000) + 40000,
      nationalMedian: Math.floor((seed * 23) % 10000) + 35000,
      earningAdvantage: Math.floor((seed * 11) % 30) + 65,
      totalEnrollment: Math.floor((seed * 41) % 30000) + 5000,
      diversityIndex: Math.floor((seed * 17) % 40) + 40,
      studentFacultyRatio: Math.floor((seed * 13) % 20) + 10
    };
    
    return mockData;
  };

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
            
            {showCompareSearch ? (
              <div className="compare-search-box">
                <input
                  type="text"
                  value={compareSearchQuery}
                  onChange={(e) => setCompareSearchQuery(e.target.value)}
                  className="compare-search-input"
                  placeholder="Search for a school to compare..."
                  autoFocus
                />
                <button className="compare-cancel-button" onClick={toggleCompareSearch}>×</button>
                
                {compareFilteredColleges.length > 0 && (
                  <div className="compare-search-results">
                    {compareFilteredColleges.map((college) => (
                      <div 
                        key={college.UNITID} 
                        className="compare-search-result-item"
                        onClick={() => selectComparisonCollege(college)}
                      >
                        {college.INSTNM} - {college.CITY}, {college.STABBR}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="compare-box" onClick={toggleCompareSearch}>
                <div className="compare-text">
                  {comparisonSchool ? `COMPARING WITH: ${comparisonSchool.INSTNM}` : 'ADD SCHOOL TO COMPARE...'}
                </div>
                <button className="compare-button">
                  {comparisonSchool ? '×' : '+'}
                </button>
              </div>
            )}
            
            {compareMode && comparisonSchool ? (
              <div className="comparison-view">
                <div className="schools-header">
                  <div className="school-header-item">
                    <div className="school-icon">🎓</div>
                    <h2 className="school-name">{selectedSchool?.INSTNM}</h2>
                    <div className="school-location">{selectedSchool?.CITY}, {selectedSchool?.STABBR}</div>
                  </div>
                  <div className="vs-indicator">VS.</div>
                  <div className="school-header-item">
                    <div className="school-icon">🎓</div>
                    <h2 className="school-name">{comparisonSchool.INSTNM}</h2>
                    <div className="school-location">{comparisonSchool.CITY}, {comparisonSchool.STABBR}</div>
                  </div>
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
                      <div className="comparison-financial-info">
                        {selectedSchool && comparisonSchool && (
                          <>
                            <div className="comparison-stats">
                              <div className="comparison-stat-card">
                                <div className="stat-title">AVG. DEBT</div>
                                <div className="stat-comparison">
                                  <div className="stat-school-1">
                                    <div className="stat-value">${getMockData(selectedSchool.INSTNM).avgDebt}</div>
                                    <div className="stat-label">{selectedSchool.INSTNM}</div>
                                  </div>
                                  <div className="stat-difference">
                                    {getMockData(selectedSchool.INSTNM).avgDebt > getMockData(comparisonSchool.INSTNM).avgDebt ? (
                                      <div className="more-debt">
                                        ${getMockData(selectedSchool.INSTNM).avgDebt - getMockData(comparisonSchool.INSTNM).avgDebt} MORE
                                      </div>
                                    ) : (
                                      <div className="less-debt">
                                        ${getMockData(comparisonSchool.INSTNM).avgDebt - getMockData(selectedSchool.INSTNM).avgDebt} LESS
                                      </div>
                                    )}
                                  </div>
                                  <div className="stat-school-2">
                                    <div className="stat-value">${getMockData(comparisonSchool.INSTNM).avgDebt}</div>
                                    <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="comparison-stat-card">
                                <div className="stat-title">AVG. REPAY TIME</div>
                                <div className="stat-comparison">
                                  <div className="stat-school-1">
                                    <div className="stat-value">{getMockData(selectedSchool.INSTNM).avgRepayTime} years</div>
                                    <div className="stat-label">{selectedSchool.INSTNM}</div>
                                  </div>
                                  <div className="stat-difference">
                                    {getMockData(selectedSchool.INSTNM).avgRepayTime > getMockData(comparisonSchool.INSTNM).avgRepayTime ? (
                                      <div className="more-time">
                                        {getMockData(selectedSchool.INSTNM).avgRepayTime - getMockData(comparisonSchool.INSTNM).avgRepayTime} YEARS MORE
                                      </div>
                                    ) : (
                                      <div className="less-time">
                                        {getMockData(comparisonSchool.INSTNM).avgRepayTime - getMockData(selectedSchool.INSTNM).avgRepayTime} YEARS LESS
                                      </div>
                                    )}
                                  </div>
                                  <div className="stat-school-2">
                                    <div className="stat-value">{getMockData(comparisonSchool.INSTNM).avgRepayTime} years</div>
                                    <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="comparison-stat-card">
                                <div className="stat-title">AVG. MONTHLY RATE</div>
                                <div className="stat-comparison">
                                  <div className="stat-school-1">
                                    <div className="stat-value">${getMockData(selectedSchool.INSTNM).avgMonthlyRate}</div>
                                    <div className="stat-label">{selectedSchool.INSTNM}</div>
                                  </div>
                                  <div className="stat-difference">
                                    {getMockData(selectedSchool.INSTNM).avgMonthlyRate > getMockData(comparisonSchool.INSTNM).avgMonthlyRate ? (
                                      <div className="more-cost">
                                        ${getMockData(selectedSchool.INSTNM).avgMonthlyRate - getMockData(comparisonSchool.INSTNM).avgMonthlyRate} MORE
                                      </div>
                                    ) : (
                                      <div className="less-cost">
                                        ${getMockData(comparisonSchool.INSTNM).avgMonthlyRate - getMockData(selectedSchool.INSTNM).avgMonthlyRate} LESS
                                      </div>
                                    )}
                                  </div>
                                  <div className="stat-school-2">
                                    <div className="stat-value">${getMockData(comparisonSchool.INSTNM).avgMonthlyRate}</div>
                                    <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="action-buttons">
                              <button className="action-button">VIEW EXPECTED AID</button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'WHAT\'S THE VALUE OF GOING' && (
                      <div className="comparison-value-info">
                        {selectedSchool && comparisonSchool && (
                          <div className="comparison-stats">
                            <div className="comparison-stat-card">
                              <div className="stat-title">MEDIAN EARNINGS</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">${getMockData(selectedSchool.INSTNM).medianEarnings}</div>
                                  <div className="stat-label">{selectedSchool.INSTNM}</div>
                                </div>
                                <div className="stat-difference">
                                  {getMockData(selectedSchool.INSTNM).medianEarnings > getMockData(comparisonSchool.INSTNM).medianEarnings ? (
                                    <div className="more-earnings">
                                      ${getMockData(selectedSchool.INSTNM).medianEarnings - getMockData(comparisonSchool.INSTNM).medianEarnings} MORE
                                    </div>
                                  ) : (
                                    <div className="less-earnings">
                                      ${getMockData(comparisonSchool.INSTNM).medianEarnings - getMockData(selectedSchool.INSTNM).medianEarnings} LESS
                                    </div>
                                  )}
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">${getMockData(comparisonSchool.INSTNM).medianEarnings}</div>
                                  <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="comparison-stat-card">
                              <div className="stat-title">EARNINGS ADVANTAGE</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.INSTNM).earningAdvantage}%</div>
                                  <div className="stat-label">{selectedSchool.INSTNM}</div>
                                </div>
                                <div className="stat-difference">
                                  {getMockData(selectedSchool.INSTNM).earningAdvantage > getMockData(comparisonSchool.INSTNM).earningAdvantage ? (
                                    <div className="more-advantage">
                                      {getMockData(selectedSchool.INSTNM).earningAdvantage - getMockData(comparisonSchool.INSTNM).earningAdvantage}% MORE
                                    </div>
                                  ) : (
                                    <div className="less-advantage">
                                      {getMockData(comparisonSchool.INSTNM).earningAdvantage - getMockData(selectedSchool.INSTNM).earningAdvantage}% LESS
                                    </div>
                                  )}
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.INSTNM).earningAdvantage}%</div>
                                  <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'DEMOGRAPHICS' && (
                      <div className="comparison-demographics-info">
                        {selectedSchool && comparisonSchool && (
                          <div className="comparison-stats">
                            <div className="comparison-stat-card">
                              <div className="stat-title">TOTAL ENROLLMENT</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.INSTNM).totalEnrollment}</div>
                                  <div className="stat-label">{selectedSchool.INSTNM}</div>
                                </div>
                                <div className="stat-difference">
                                  {getMockData(selectedSchool.INSTNM).totalEnrollment > getMockData(comparisonSchool.INSTNM).totalEnrollment ? (
                                    <div className="more-students">
                                      {getMockData(selectedSchool.INSTNM).totalEnrollment - getMockData(comparisonSchool.INSTNM).totalEnrollment} MORE
                                    </div>
                                  ) : (
                                    <div className="less-students">
                                      {getMockData(comparisonSchool.INSTNM).totalEnrollment - getMockData(selectedSchool.INSTNM).totalEnrollment} LESS
                                    </div>
                                  )}
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.INSTNM).totalEnrollment}</div>
                                  <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="comparison-stat-card">
                              <div className="stat-title">DIVERSITY INDEX</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.INSTNM).diversityIndex}%</div>
                                  <div className="stat-label">{selectedSchool.INSTNM}</div>
                                </div>
                                <div className="stat-difference">
                                  {getMockData(selectedSchool.INSTNM).diversityIndex > getMockData(comparisonSchool.INSTNM).diversityIndex ? (
                                    <div className="more-diverse">
                                      {getMockData(selectedSchool.INSTNM).diversityIndex - getMockData(comparisonSchool.INSTNM).diversityIndex}% MORE
                                    </div>
                                  ) : (
                                    <div className="less-diverse">
                                      {getMockData(comparisonSchool.INSTNM).diversityIndex - getMockData(selectedSchool.INSTNM).diversityIndex}% LESS
                                    </div>
                                  )}
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.INSTNM).diversityIndex}%</div>
                                  <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="comparison-stat-card">
                              <div className="stat-title">STUDENT:FACULTY RATIO</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.INSTNM).studentFacultyRatio}:1</div>
                                  <div className="stat-label">{selectedSchool.INSTNM}</div>
                                </div>
                                <div className="stat-difference">
                                  {getMockData(selectedSchool.INSTNM).studentFacultyRatio > getMockData(comparisonSchool.INSTNM).studentFacultyRatio ? (
                                    <div className="more-ratio">
                                      {getMockData(selectedSchool.INSTNM).studentFacultyRatio - getMockData(comparisonSchool.INSTNM).studentFacultyRatio} MORE
                                    </div>
                                  ) : (
                                    <div className="less-ratio">
                                      {getMockData(comparisonSchool.INSTNM).studentFacultyRatio - getMockData(selectedSchool.INSTNM).studentFacultyRatio} LESS
                                    </div>
                                  )}
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.INSTNM).studentFacultyRatio}:1</div>
                                  <div className="stat-label">{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
            ) : (
              <>
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
                    {activeTab === 'COST OF ENROLLMENT' && selectedSchool && (
                      <div className="financial-info">
                        <div className="stat-cards">
                          <div className="stat-card">
                            <div className="stat-value">${getMockData(selectedSchool.INSTNM).avgDebt}</div>
                            <div className="stat-label">AVG. DEBT</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.INSTNM} student receives federal aid to help with college costs.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.INSTNM).avgRepayTime} years</div>
                            <div className="stat-label">AVG. REPAY TIME</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.INSTNM} student pays off their debt in this timeframe.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">${getMockData(selectedSchool.INSTNM).avgMonthlyRate}</div>
                            <div className="stat-label">AVG. MONTHLY RATE</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.INSTNM} student pays this amount monthly. This requires less than 5% of annual income.
                            </p>
                          </div>
                        </div>
                        
                        <div className="action-buttons">
                          <button className="action-button">VIEW EXPECTED AID</button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'WHAT\'S THE VALUE OF GOING' && selectedSchool && (
                      <div className="value-info">
                        <div className="stat-cards">
                          <div className="stat-card">
                            <div className="stat-value">${getMockData(selectedSchool.INSTNM).medianEarnings}</div>
                            <div className="stat-label">MEDIAN EARNINGS</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The median earnings of {selectedSchool.INSTNM} graduates 10 years after graduation.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">${getMockData(selectedSchool.INSTNM).nationalMedian}</div>
                            <div className="stat-label">NATIONAL MEDIAN</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The national median earnings for all college graduates 10 years after graduation.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.INSTNM).earningAdvantage}%</div>
                            <div className="stat-label">EARNINGS ADVANTAGE</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              Percentage of {selectedSchool.INSTNM} graduates who earn more than high school graduates.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'DEMOGRAPHICS' && selectedSchool && (
                      <div className="demographics-info">
                        <div className="stat-cards">
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.INSTNM).totalEnrollment}</div>
                            <div className="stat-label">TOTAL ENROLLMENT</div>
                            <div className="info-icon">📊</div>
                            <p className="stat-description">
                              Total undergraduate students enrolled at {selectedSchool.INSTNM}.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.INSTNM).diversityIndex}%</div>
                            <div className="stat-label">DIVERSITY INDEX</div>
                            <div className="info-icon">👥</div>
                            <p className="stat-description">
                              Measure of racial and ethnic diversity at {selectedSchool.INSTNM}.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.INSTNM).studentFacultyRatio}:1</div>
                            <div className="stat-label">STUDENT:FACULTY RATIO</div>
                            <div className="info-icon">👩‍🏫</div>
                            <p className="stat-description">
                              The ratio of students to faculty at {selectedSchool.INSTNM}.
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}