"use client";

import { useState, useEffect } from 'react';
/*import collegeData, { College } from './collegeData';*/
import './styles.css';
import Papa from 'papaparse';

type SchoolData = {
  NAME: string;
  WEBSITE_LINK: string;
  AVG_DEBT: string;
  AVG_MONTHLY_REPAY: string;
  FINANCIAL_AID_CALC: string;
  SCHOOL_MEDIAN_EARNINGS: string;
  NATIONAL_4_YEAR_MEDIAN: string;
  EARNINGS_VS_HS_GRAD: number;
  WHITE_POP: number;
  BLACK_POP: number;
  HISPANIC_POP: number;
  ASIAN_POP: number;
  HAWAIIAN_PACIFIC_ISLANDER_POP: number;
  MULTIRACIAL_POP: number;
  UNKNOWN_RACE_POP: number;
  INTERNATIONAL_POP: number;
  COST_AFTER_AID_0_30: string;
  COST_AFTER_AID_30_48: string;
  COST_AFTER_AID_48_75: string;
  COST_AFTER_AID_75_110: string;
  COST_AFTER_AID_110: string;
  MONTHLY_REPAY_PERCENTAGE: number;
};


export default function CollegeInfoApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);
  const [comparisonSchool, setComparisonSchool] = useState<SchoolData | null>(null);
  const [activeTab, setActiveTab] = useState('COST OF ENROLLMENT');
  const [filteredColleges, setFilteredColleges] = useState<SchoolData[]>([]);
  const [headerSearch, setHeaderSearch] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [compareSearchQuery, setCompareSearchQuery] = useState('');
  const [compareFilteredColleges, setCompareFilteredColleges] = useState<SchoolData[]>([]);
  const [showCompareSearch, setShowCompareSearch] = useState(false);
  const [csvData, setCsvData] = useState<SchoolData[]>([]); // Moved here from SchoolDataViewer
  const [isLoading, setIsLoading] = useState(true);

  // Load CSV data on component mount
  useEffect(() => {
    const loadCsvData = async () => {
      try {
        const response = await fetch('/empowering_educ_data.csv');
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setCsvData(result.data as SchoolData[]);
            setIsLoading(false);
          },
          error: (err: any) => {
            console.error('CSV parsing error:', err);
            setIsLoading(false);
          }
        });
      } catch (err) {
        console.error('Failed to load CSV:', err);
        setIsLoading(false);
      }
    };

    loadCsvData();
  }, []);

  // Update filtered colleges when search query changes
  useEffect(() => {
    if (searchQuery.length > 2 && csvData.length > 0) {
      const filtered = csvData.filter(college => 
        college.NAME.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setFilteredColleges(filtered);
    } else {
      setFilteredColleges([]);
    }
  }, [searchQuery, csvData]);

  /*
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

  const loadCsvData = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      fetch('public/empowering_educ_data.csv')
        .then((res) => res.text())
        .then((text) => {
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => resolve(result.data),
            error: (err: Error) => reject(err),
          });
        });
    });
  };*/

  useEffect(() => {
    if (compareSearchQuery.length > 2) {
      const filtered = csvData.filter(college => 
        college.NAME.toLowerCase().includes(compareSearchQuery.toLowerCase()) &&
        (!selectedSchool/* || college.UNITID !== selectedSchool.UNITID*/)
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
    console.log('Header search:', headerSearch);
    setHeaderSearch('');
  };

  const selectCollege = (college: SchoolData) => {
    setSelectedSchool(college);
    setCurrentPage('school');
    setActiveTab('COST OF ENROLLMENT');
    setSearchQuery('');
    setFilteredColleges([]);
  };

  /*
  const selectComparisonCollege = (college: College) => {
    setComparisonSchool(college);
    setCompareSearchQuery('');
    setCompareFilteredColleges([]);
    setShowCompareSearch(false);
    setCompareMode(true);
  };*/

  const resetComparison = () => {
    setComparisonSchool(null);
    setCompareMode(false);
    setShowCompareSearch(false);
  };

  const returnToHome = () => {
    setCurrentPage('home');
    setSearchQuery('');
    setSelectedSchool(null);
    setComparisonSchool(null);
    setCompareMode(false);
    setFilteredColleges([]);
  };

  const toggleCompareSearch = () => {
    setShowCompareSearch(!showCompareSearch);
    if (!showCompareSearch) {
      setCompareSearchQuery('');
    }
  };


  const getMockData = (schoolName: string) => {
    if (!csvData || csvData.length === 0) {
      console.warn('CSV data not loaded yet.');
      return null;
    }
  
    const row = csvData.find(
      (college) => college.NAME?.toLowerCase().trim() === schoolName.toLowerCase().trim()
    );
  
    if (!row) {
      console.warn(`No data found for school: ${schoolName}`);
      return null;
    }
  
    return {
      NAME: schoolName,
      WEBSITE_LINK: row.WEBSITE_LINK,
      AVG_DEBT: (Math.round(Number(row.AVG_DEBT) * 100) / 100).toLocaleString('en-US'),
      AVG_MONTHLY_REPAY: (Math.round(Number(row.AVG_MONTHLY_REPAY) * 100) / 100).toLocaleString('en-US'),
      FINANCIAL_AID_CALC: Math.round(Number(row.FINANCIAL_AID_CALC) * 100) / 100,
      SCHOOL_MEDIAN_EARNINGS: (Math.round(Number(row.SCHOOL_MEDIAN_EARNINGS) * 100) / 100).toLocaleString('en-US'),
      NATIONAL_4_YEAR_MEDIAN: (Math.round(Number(row.NATIONAL_4_YEAR_MEDIAN) * 100) / 100).toLocaleString('en-US'),
      EARNINGS_VS_HS_GRAD: Math.round(Number(row.EARNINGS_VS_HS_GRAD) * 100 * 100) / 100,
      WHITE_POP: Math.round(Number(row.WHITE_POP)* 100 * 100) / 100,
      BLACK_POP: Math.round(Number(row.BLACK_POP) * 100 * 100) / 100,
      HISPANIC_POP: Math.round(Number(row.HISPANIC_POP) * 100 * 100) / 100,
      ASIAN_POP: Math.round(Number(row.ASIAN_POP) * 100 * 100) / 100,
      HAWAIIAN_PACIFIC_ISLANDER_POP: Math.round(Number(row.HAWAIIAN_PACIFIC_ISLANDER_POP) * 100 * 100) / 100,
      MULTIRACIAL_POP: Math.round(Number(row.MULTIRACIAL_POP) * 100 * 100) / 100,
      UNKNOWN_RACE_POP: Math.round(Number(row.UNKNOWN_RACE_POP) * 100 * 100) / 100,
      INTERNATIONAL_POP: Math.round(Number(row.INTERNATIONAL_POP) * 100 * 100) / 100,
      COST_AFTER_AID_0_30: (Number(row.COST_AFTER_AID_0_30)) .toLocaleString('en-US'),
      COST_AFTER_AID_30_48: (Number(row.COST_AFTER_AID_30_48)).toLocaleString('en-US'),
      COST_AFTER_AID_48_75: (Number(row.COST_AFTER_AID_48_75)).toLocaleString('en-US'),
      COST_AFTER_AID_75_110: (Number(row.COST_AFTER_AID_75_110)).toLocaleString('en-US'),
      COST_AFTER_AID_110: (Number(row.COST_AFTER_AID_110)).toLocaleString('en-US'),
      MONTHLY_REPAY_PERCENTAGE: Math.round(Number(row.MONTHLY_REPAY_PERCENTAGE) * 100 * 100) / 100,
    };
    /*
    const nameSum = schoolName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const seed = nameSum % 1000;
    return {
      avgDebt: Math.floor((seed * 31) % 15000) + 5000,
      avgRepayTime: Math.floor((seed * 13) % 5) + 7,
      avgMonthlyRate: Math.floor((seed * 7) % 100) + 30,
      medianEarnings: Math.floor((seed * 19) % 30000) + 40000,
      nationalMedian: Math.floor((seed * 23) % 10000) + 35000,
      earningAdvantage: Math.floor((seed * 11) % 30) + 65,
      totalEnrollment: Math.floor((seed * 41) % 30000) + 5000,
      diversityIndex: Math.floor((seed * 17) % 40) + 40,
      studentFacultyRatio: Math.floor((seed * 13) % 20) + 10
    };*/
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
            <div className="edu-logo" onClick={returnToHome}>
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
                      key={college.NAME} 
                      className="main-search-result-item"
                      onClick={() => selectCollege(college)}
                    >
                      {college.NAME}
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
              <div 
                className="banner-back-arrow"
                onClick={returnToHome}
              >
                ←
              </div>
              <h1 className="banner-title">FIND COLLEGE INFO</h1>
              {!compareMode && <div className="banner-icon">🎓</div>}
            </div>
          </div>
          
          <div className="main-container">
            <p className="info-link">
              Click to explore more tuition, financial aid, & demographic info about any college:{' '} 
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
                <button 
                  className="compare-cancel-button" 
                  onClick={() => {
                    setShowCompareSearch(false);
                    resetComparison();
                  }}
                >
                  ×
                </button>
                
                {compareFilteredColleges.length > 0 && (
                  <div className="compare-search-results">
                    {compareFilteredColleges.map((college) => (
                      <div 
                        key={college.NAME} 
                        className="compare-search-result-item"
                        /*onClick={() => selectComparisonCollege(college)}*/
                      >
                        {college.NAME}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="compare-box" onClick={!comparisonSchool ? toggleCompareSearch : undefined}>
                <div className="compare-text">
                  {comparisonSchool ? `COMPARING WITH: ${comparisonSchool.NAME}` : 'ADD SCHOOL TO COMPARE...'}
                </div>
                <button 
                  className="compare-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    comparisonSchool ? resetComparison() : toggleCompareSearch();
                  }}
                >
                  {comparisonSchool ? '×' : '+'}
                </button>
              </div>
            )}
            
            {compareMode && comparisonSchool ? (
              <div className="comparison-view">
              <div className="schools-header">
                  <div className="school-header-item">
                    <div className="school-icon">🎓</div>
                    <h2 className="school-name">{selectedSchool?.NAME}</h2>
                    <div className="school-location">{selectedSchool?.NAME}, {selectedSchool?.NAME}</div>
                  </div>
                  <div className="vs-indicator">VS.</div>
                  <div className="school-header-item">
                    <div className="school-icon">🎓</div>
                    <h2 className="school-name">{comparisonSchool.NAME}</h2>
                    <div className="school-location">{comparisonSchool.NAME}, {comparisonSchool.NAME}</div>
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
                                    <div className="stat-value">${getMockData(selectedSchool?.NAME || '')?.AVG_DEBT}</div>
                                    <div className="stat-label">{selectedSchool.NAME}</div>
                                  </div> {/* ✅ this was missing */}
                                  <div className="stat-school-2">
                                    <div className="stat-value">${getMockData(comparisonSchool.NAME)?.AVG_DEBT}</div>
                                    <div className="stat-label">{comparisonSchool.NAME}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="comparison-stat-card">
                                <div className="stat-title">AVG. REPAY TIME</div>
                                <div className="stat-comparison">
                                  <div className="stat-school-1">
                                    <div className="stat-value">{getMockData(selectedSchool.NAME)?.AVG_MONTHLY_REPAY} years</div>
                                    <div className="stat-label">{selectedSchool.NAME}</div>
                                  </div> {/* ✅ this was missing */}
                                  <div className="stat-school-2">
                                    <div className="stat-value">{getMockData(comparisonSchool.NAME)?.AVG_MONTHLY_REPAY} years</div>
                                    <div className="stat-label">{comparisonSchool.NAME}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="comparison-stat-card">
                                <div className="stat-title">AVG. MONTHLY RATE</div>
                                <div className="stat-comparison">
                                  <div className="stat-school-1">
                                    <div className="stat-value">${getMockData(selectedSchool.NAME)?.AVG_MONTHLY_REPAY}</div>
                                    <div className="stat-label">{selectedSchool.NAME}</div>
                                  </div> {/* ✅ this was missing */}
                                  <div className="stat-school-2">
                                    <div className="stat-value">${getMockData(comparisonSchool.NAME)?.AVG_MONTHLY_REPAY}</div>
                                    <div className="stat-label">{comparisonSchool.NAME}</div>
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
                                  <div className="stat-value">${getMockData(selectedSchool.NAME)?.SCHOOL_MEDIAN_EARNINGS}</div>
                                  <div className="stat-label">{selectedSchool.NAME}</div>
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">${getMockData(comparisonSchool.NAME)?.SCHOOL_MEDIAN_EARNINGS}</div>
                                  <div className="stat-label">{comparisonSchool.NAME}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="comparison-stat-card">
                              <div className="stat-title">EARNINGS ADVANTAGE</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.NAME)?.EARNINGS_VS_HS_GRAD}%</div>
                                  <div className="stat-label">{selectedSchool.NAME}</div>
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.NAME)?.EARNINGS_VS_HS_GRAD}%</div>
                                  <div className="stat-label">{comparisonSchool.NAME}</div>
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
                              <div className="stat-title">WHITE POP</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.NAME)?.WHITE_POP}%</div>
                                  <div className="stat-label">{selectedSchool.NAME}</div>
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.NAME)?.WHITE_POP}%</div>
                                  <div className="stat-label">{comparisonSchool.NAME}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="comparison-stat-card">
                              <div className="stat-title">BLACK POP</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.NAME)?.BLACK_POP}%</div>
                                  <div className="stat-label">{selectedSchool.NAME}</div>
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.NAME)?.BLACK_POP}%</div>
                                  <div className="stat-label">{comparisonSchool.NAME}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="comparison-stat-card">
                              <div className="stat-title">ASIAN POP</div>
                              <div className="stat-comparison">
                                <div className="stat-school-1">
                                  <div className="stat-value">{getMockData(selectedSchool.NAME)?.ASIAN_POP}%</div>
                                  <div className="stat-label">{selectedSchool.NAME}</div>
                                </div>
                                <div className="stat-school-2">
                                  <div className="stat-value">{getMockData(comparisonSchool.NAME)?.ASIAN_POP}%</div>
                                  <div className="stat-label">{comparisonSchool.NAME}</div>
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
                  <h2 className="school-name">{selectedSchool?.NAME}</h2>
                  <div className="school-location">{selectedSchool?.NAME}, {selectedSchool?.NAME}</div>
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
                            <div className="stat-value">${getMockData(selectedSchool.NAME)?.AVG_DEBT}</div>
                            <div className="stat-label">AVG. DEBT</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.NAME} student takes out 
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> ${getMockData(selectedSchool.NAME)?.AVG_DEBT} </span> 
                              of loans to help with college costs. This means they owe the government 
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> ${getMockData(selectedSchool.NAME)?.AVG_DEBT} </span> 
                              after college.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{Math.round((Number(selectedSchool.AVG_DEBT) / Number(selectedSchool.AVG_MONTHLY_REPAY)) / 12)} years</div>
                            <div className="stat-label">AVG. REPAY TIME</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.NAME} student pays off their debt in 
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> {Math.round((Number(selectedSchool.AVG_DEBT) / Number(selectedSchool.AVG_MONTHLY_REPAY)) / 12)} years after graduating.</span>
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">${getMockData(selectedSchool.NAME)?.AVG_MONTHLY_REPAY}</div>
                            <div className="stat-label">AVG. MONTHLY RATE</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.NAME} student pays off
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> ${getMockData(selectedSchool.NAME)?.AVG_MONTHLY_REPAY} of their debt each month</span>
                              . This requires less than
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> {getMockData(selectedSchool.NAME)?.MONTHLY_REPAY_PERCENTAGE}% of their annual income</span>.
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
                            <div className="stat-value">${getMockData(selectedSchool.NAME)?.SCHOOL_MEDIAN_EARNINGS}</div>
                            <div className="stat-label">MEDIAN EARNINGS</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical {selectedSchool.NAME} student makes about
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> ${getMockData(selectedSchool.NAME)?.SCHOOL_MEDIAN_EARNINGS} in a year after 10 years have passed </span>
                              since they attended {selectedSchool.NAME}.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">${getMockData(selectedSchool.NAME)?.NATIONAL_4_YEAR_MEDIAN}</div>
                            <div className="stat-label">NATIONAL MEDIAN</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              The typical American citizen makes about
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> ${getMockData(selectedSchool.NAME)?.NATIONAL_4_YEAR_MEDIAN} in a year after 10 years have passed </span>
                              since they attended college.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.NAME)?.EARNINGS_VS_HS_GRAD}%</div>
                            <div className="stat-label">EARNINGS ADVANTAGE</div>
                            <div className="info-icon">💡</div>
                            <p className="stat-description">
                              About {getMockData(selectedSchool.NAME)?.EARNINGS_VS_HS_GRAD}% of students that attended {selectedSchool.NAME}
                              <span style={{ color: '#f59e0b', fontWeight: 'bold' }}> earn more than the typical high school graduate.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'DEMOGRAPHICS' && selectedSchool && (
                      <div className="demographics-info">
                        <div className="stat-cards">
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.NAME)?.WHITE_POP}%</div>
                            <div className="stat-label">WHITE POP</div>
                            <div className="info-icon">📊</div>
                            <p className="stat-description">
                              Total undergraduate students enrolled at {selectedSchool.NAME}.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.NAME)?.BLACK_POP}%</div>
                            <div className="stat-label">BLACK POP</div>
                            <div className="info-icon">👥</div>
                            <p className="stat-description">
                              Measure of racial and ethnic diversity at {selectedSchool.NAME}.
                            </p>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-value">{getMockData(selectedSchool.NAME)?.ASIAN_POP}%</div>
                            <div className="stat-label">ASIAN POP</div>
                            <div className="info-icon">👩‍🏫</div>
                            <p className="stat-description">
                              The ratio of students to faculty at {selectedSchool.NAME}.
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