"use client";

import { useState, useEffect } from 'react';
import collegeData, { College } from './collegeData';
import styles from './styles.module.css';

import Link from 'next/link'; // Add this for Essay Feedback link

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
    };
  };

  const schoolTabs = [
    'COST OF ENROLLMENT',
    'WHAT\'S THE VALUE OF GOING',
    'DEMOGRAPHICS',
    'SCHOLARSHIPS',
    'STEPS TO APPLY'
  ];

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <div className={styles.eduLogo} onClick={returnToHome}>
              <span className={styles.eduIcon}>👨‍🎓</span>
              <span className={styles.eduText}>EDU AI</span>
            </div>
            <div className={styles.durhamLogo}>
              <span>DURHAM</span>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.searchContainer}>
              <form onSubmit={handleHeaderSearch}>
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  className={styles.searchInput}
                  placeholder="Search..."
                />
                <button type="submit" className={styles.searchButton}>→</button>
              </form>
            </div>
            <button className={styles.headerButton}>ESSAY FAQ</button>
            
            <Link href="/essay-feedback" className={styles.headerButton}>
              ESSAY FEEDBACK
            </Link>
            <button className={styles.headerButton}>FINANCIAL AID GUIDE</button>
          </div>
        </div>
      </header>
      
      {currentPage === 'home' ? (
        <div className={styles.homeContent}>
          <div className={styles.banner}>
            <div className={styles.bannerContainer}>
              <h1 className={styles.bannerTitle}>FIND COLLEGE INFO</h1>
            </div>
          </div>
          
          <div className={styles.mainContainer}>
            <div className={styles.searchIntro}>
              <div className={styles.telescopeIcon}>🔭</div>
              <h2 className={styles.searchPrompt}>Type in a school's name to find information about...</h2>
              
              <div className={styles.infoCategories}>
                <div className={styles.infoCategory}>
                  <div className={`${styles.categoryIcon} ${styles.green}`}>💰</div>
                  <div className={styles.categoryText}>
                    <div className={styles.categoryTitle}>Debt, Aid,</div>
                    <div className={`${styles.categorySubtitle} ${styles.green}`}>Scholarships</div>
                  </div>
                </div>
                
                <div className={styles.infoCategory}>
                  <div className={`${styles.categoryIcon} ${styles.blue}`}>👥</div>
                  <div className={styles.categoryText}>
                    <div className={styles.categoryTitle}>College</div>
                    <div className={`${styles.categorySubtitle} ${styles.blue}`}>Demographics</div>
                  </div>
                </div>
                
                <div className={styles.infoCategory}>
                  <div className={`${styles.categoryIcon} ${styles.yellow}`}>📋</div>
                  <div className={styles.categoryText}>
                    <div className={styles.categoryTitle}>Chances of</div>
                    <div className={`${styles.categorySubtitle} ${styles.yellow}`}>Admission</div>
                  </div>
                </div>
                
                <div className={styles.infoCategory}>
                  <div className={`${styles.categoryIcon} ${styles.purple}`}>👣</div>
                  <div className={styles.categoryText}>
                    <div className={styles.categoryTitle}>Steps to</div>
                    <div className={`${styles.categorySubtitle} ${styles.purple}`}>Apply</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.mainSearch}>
              <form onSubmit={handleCollegeSearch} className={styles.mainSearchForm}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.mainSearchInput}
                  placeholder="SEARCH SCHOOL..."
                />
                <button type="submit" className={styles.mainSearchButton}>🔍</button>
              </form>
              <p className={styles.searchNote}>**Information available for 15-20 most popular universities in Durham</p>
              
              {filteredColleges.length > 0 && (
                <div className={styles.mainSearchResults}>
                  {filteredColleges.map((college) => (
                    <div 
                      key={college.UNITID} 
                      className={styles.mainSearchResultItem}
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
        <div className={styles.schoolContent}>
          <div className={styles.banner}>
            <div className={styles.bannerContainer}>
              <div 
                className={styles.bannerBackArrow}
                onClick={returnToHome}
              >
                ←
              </div>
              <h1 className={styles.bannerTitle}>FIND COLLEGE INFO</h1>
              {!compareMode && <div className={styles.bannerIcon}>🎓</div>}
            </div>
          </div>
          
          <div className={styles.mainContainer}>
            <p className={styles.infoLink}>
              Click to explore more tuition, financial aid, & demographic info about any college:{' '} 
              <a href="https://collegescorecard.ed.gov/" className={styles.link}>https://collegescorecard.ed.gov/</a>
            </p>
            
            {showCompareSearch ? (
              <div className={styles.compareSearchBox}>
                <input
                  type="text"
                  value={compareSearchQuery}
                  onChange={(e) => setCompareSearchQuery(e.target.value)}
                  className={styles.compareSearchInput}
                  placeholder="Search for a school to compare..."
                  autoFocus
                />
                <button 
                  className={styles.compareCancelButton} 
                  onClick={() => {
                    setShowCompareSearch(false);
                    resetComparison();
                  }}
                >
                  ×
                </button>
                
                {compareFilteredColleges.length > 0 && (
                  <div className={styles.compareSearchResults}>
                    {compareFilteredColleges.map((college) => (
                      <div 
                        key={college.UNITID} 
                        className={styles.compareSearchResultItem}
                        onClick={() => selectComparisonCollege(college)}
                      >
                        {college.INSTNM} - {college.CITY}, {college.STABBR}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className={styles.compareBox} onClick={!comparisonSchool ? toggleCompareSearch : undefined}>
                <div className={styles.compareText}>
                  {comparisonSchool ? `COMPARING WITH: ${comparisonSchool.INSTNM}` : 'ADD SCHOOL TO COMPARE...'}
                </div>
                <button 
                  className={styles.compareButton}
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
              <div className={styles.comparisonView}>
                <div className={styles.schoolsHeader}>
                  <div className={styles.schoolHeaderItem}>
                    <div className={styles.schoolIcon}>🎓</div>
                    <h2 className={styles.schoolName}>{selectedSchool?.INSTNM}</h2>
                    <div className={styles.schoolLocation}>{selectedSchool?.CITY}, {selectedSchool?.STABBR}</div>
                  </div>
                  <div className={styles.vsIndicator}>VS.</div>
                  <div className={styles.schoolHeaderItem}>
                    <div className={styles.schoolIcon}>🎓</div>
                    <h2 className={styles.schoolName}>{comparisonSchool.INSTNM}</h2>
                    <div className={styles.schoolLocation}>{comparisonSchool.CITY}, {comparisonSchool.STABBR}</div>
                  </div>
                </div>
                
                <div className={styles.schoolTabs}>
                  <div className={styles.tabsContainer}>
                    {schoolTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  
                  <div className={styles.tabContent}>
                    {activeTab === 'COST OF ENROLLMENT' && (
                      <div className={styles.comparisonFinancialInfo}>
                        {selectedSchool && comparisonSchool && (
                          <>
                            <div className={styles.comparisonStats}>
                              <div className={styles.comparisonStatCard}>
                                <div className={styles.statTitle}>AVG. DEBT</div>
                                <div className={styles.statComparison}>
                                  <div className={styles.statSchool1}>
                                    <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).avgDebt}</div>
                                    <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                  </div>
                                  <div className={styles.statDifference}>
                                    {getMockData(selectedSchool.INSTNM).avgDebt > getMockData(comparisonSchool.INSTNM).avgDebt ? (
                                      <div className={styles.moreDebt}>
                                        ${getMockData(selectedSchool.INSTNM).avgDebt - getMockData(comparisonSchool.INSTNM).avgDebt} MORE
                                      </div>
                                    ) : (
                                      <div className={styles.lessDebt}>
                                        ${getMockData(comparisonSchool.INSTNM).avgDebt - getMockData(selectedSchool.INSTNM).avgDebt} LESS
                                      </div>
                                    )}
                                  </div>
                                  <div className={styles.statSchool2}>
                                    <div className={styles.statValue} >${getMockData(comparisonSchool.INSTNM).avgDebt}</div>
                                    <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className={styles.comparisonStatCard}>
                                <div className={styles.statTitle}>AVG. REPAY TIME</div>
                                <div className={styles.statComparison}>
                                  <div className={styles.statSchool1}>
                                    <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).avgRepayTime} years</div>
                                    <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                  </div>
                                  <div className={styles.statDifference}>
                                    {getMockData(selectedSchool.INSTNM).avgRepayTime > getMockData(comparisonSchool.INSTNM).avgRepayTime ? (
                                      <div className={styles.moreTime}>
                                        {getMockData(selectedSchool.INSTNM).avgRepayTime - getMockData(comparisonSchool.INSTNM).avgRepayTime} YEARS MORE
                                      </div>
                                    ) : (
                                      <div className={styles.lessTime}>
                                        {getMockData(comparisonSchool.INSTNM).avgRepayTime - getMockData(selectedSchool.INSTNM).avgRepayTime} YEARS LESS
                                      </div>
                                    )}
                                  </div>
                                  <div className={styles.statSchool2}>
                                    <div className={styles.statValue}>{getMockData(comparisonSchool.INSTNM).avgRepayTime} years</div>
                                    <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className={styles.comparisonStatCard}>
                                <div className={styles.statTitle}>AVG. MONTHLY RATE</div>
                                <div className={styles.statComparison}>
                                  <div className={styles.statSchool1}>
                                    <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).avgMonthlyRate}</div>
                                    <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                  </div>
                                  <div className={styles.statDifference}>
                                    {getMockData(selectedSchool.INSTNM).avgMonthlyRate > getMockData(comparisonSchool.INSTNM).avgMonthlyRate ? (
                                      <div className={styles.moreCost}>
                                        ${getMockData(selectedSchool.INSTNM).avgMonthlyRate - getMockData(comparisonSchool.INSTNM).avgMonthlyRate} MORE
                                      </div>
                                    ) : (
                                      <div className={styles.lessCost}>
                                        ${getMockData(comparisonSchool.INSTNM).avgMonthlyRate - getMockData(selectedSchool.INSTNM).avgMonthlyRate} LESS
                                      </div>
                                    )}
                                  </div>
                                  <div className={styles.statSchool2}>
                                    <div className={styles.statValue}>${getMockData(comparisonSchool.INSTNM).avgMonthlyRate}</div>
                                    <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className={styles.actionButtons}>
                              <button className={styles.actionButton}>VIEW EXPECTED AID</button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'WHAT\'S THE VALUE OF GOING' && (
                      <div className={styles.comparisonValueInfo}>
                        {selectedSchool && comparisonSchool && (
                          <div className={styles.comparisonStats}>
                            <div className={styles.comparisonStatCard}>
                              <div className={styles.statTitle}>MEDIAN EARNINGS</div>
                              <div className={styles.statComparison}>
                                <div className={styles.statSchool1}>
                                  <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).medianEarnings}</div>
                                  <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                </div>
                                <div className={styles.statDifference}>
                                  {getMockData(selectedSchool.INSTNM).medianEarnings > getMockData(comparisonSchool.INSTNM).medianEarnings ? (
                                    <div className={styles.moreEarnings}>
                                      ${getMockData(selectedSchool.INSTNM).medianEarnings - getMockData(comparisonSchool.INSTNM).medianEarnings} MORE
                                    </div>
                                  ) : (
                                    <div className={styles.lessEarnings}>
                                      ${getMockData(comparisonSchool.INSTNM).medianEarnings - getMockData(selectedSchool.INSTNM).medianEarnings} LESS
                                    </div>
                                  )}
                                </div>
                                <div className={styles.statSchool2}>
                                  <div className={styles.statValue}>${getMockData(comparisonSchool.INSTNM).medianEarnings}</div>
                                  <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className={styles.comparisonStatCard}>
                              <div className={styles.statTitle}>EARNINGS ADVANTAGE</div>
                              <div className={styles.statComparison}>
                                <div className={styles.statSchool1}>
                                  <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).earningAdvantage}%</div>
                                  <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                </div>
                                <div className={styles.statDifference}>
                                  {getMockData(selectedSchool.INSTNM).earningAdvantage > getMockData(comparisonSchool.INSTNM).earningAdvantage ? (
                                    <div className={styles.moreAdvantage}>
                                      {getMockData(selectedSchool.INSTNM).earningAdvantage - getMockData(comparisonSchool.INSTNM).earningAdvantage}% MORE
                                    </div>
                                  ) : (
                                    <div className={styles.lessAdvantage}>
                                      {getMockData(comparisonSchool.INSTNM).earningAdvantage - getMockData(selectedSchool.INSTNM).earningAdvantage}% LESS
                                    </div>
                                  )}
                                </div>
                                <div className={styles.statSchool2}>
                                  <div className={styles.statValue}>{getMockData(comparisonSchool.INSTNM).earningAdvantage}%</div>
                                  <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {activeTab === 'DEMOGRAPHICS' && (
                      <div className={styles.comparisonDemographicsInfo}>
                        {selectedSchool && comparisonSchool && (
                          <div className={styles.comparisonStats}>
                            <div className={styles.comparisonStatCard}>
                              <div className={styles.statTitle}>TOTAL ENROLLMENT</div>
                              <div className={styles.statComparison}>
                                <div className={styles.statSchool1}>
                                  <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).totalEnrollment}</div>
                                  <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                </div>
                                <div className={styles.statDifference}>
                                  {getMockData(selectedSchool.INSTNM).totalEnrollment > getMockData(comparisonSchool.INSTNM).totalEnrollment ? (
                                    <div className={styles.moreStudents}>
                                      {getMockData(selectedSchool.INSTNM).totalEnrollment - getMockData(comparisonSchool.INSTNM).totalEnrollment} MORE
                                    </div>
                                  ) : (
                                    <div className={styles.lessStudents}>
                                      {getMockData(comparisonSchool.INSTNM).totalEnrollment - getMockData(selectedSchool.INSTNM).totalEnrollment} LESS
                                    </div>
                                  )}
                                </div>
                                <div className={styles.statSchool2}>
                                  <div className={styles.statValue}>{getMockData(comparisonSchool.INSTNM).totalEnrollment}</div>
                                  <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className={styles.comparisonStatCard}>
                              <div className={styles.statTitle}>DIVERSITY INDEX</div>
                              <div className={styles.statComparison}>
                                <div className={styles.statSchool1}>
                                  <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).diversityIndex}%</div>
                                  <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                </div>
                                <div className={styles.statDifference}>
                                  {getMockData(selectedSchool.INSTNM).diversityIndex > getMockData(comparisonSchool.INSTNM).diversityIndex ? (
                                    <div className={styles.moreDiverse}>
                                      {getMockData(selectedSchool.INSTNM).diversityIndex - getMockData(comparisonSchool.INSTNM).diversityIndex}% MORE
                                    </div>
                                  ) : (
                                    <div className={styles.lessDiverse}>
                                      {getMockData(comparisonSchool.INSTNM).diversityIndex - getMockData(selectedSchool.INSTNM).diversityIndex}% LESS
                                    </div>
                                  )}
                                </div>
                                <div className={styles.statSchool2}>
                                  <div className={styles.statValue}>{getMockData(comparisonSchool.INSTNM).diversityIndex}%</div>
                                  <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className={styles.comparisonStatCard}>
                              <div className={styles.statTitle}>STUDENT:FACULTY RATIO</div>
                              <div className={styles.statComparison}>
                                <div className={styles.statSchool1}>
                                  <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).studentFacultyRatio}:1</div>
                                  <div className={styles.statLabel}>{selectedSchool.INSTNM}</div>
                                </div>
                                <div className={styles.statDifference}>
                                  {getMockData(selectedSchool.INSTNM).studentFacultyRatio > getMockData(comparisonSchool.INSTNM).studentFacultyRatio ? (
                                    <div className={styles.moreRatio}>
                                      {getMockData(selectedSchool.INSTNM).studentFacultyRatio - getMockData(comparisonSchool.INSTNM).studentFacultyRatio} MORE
                                    </div>
                                  ) : (
                                    <div className={styles.lessRatio}>
                                      {getMockData(comparisonSchool.INSTNM).studentFacultyRatio - getMockData(selectedSchool.INSTNM).studentFacultyRatio} LESS
                                    </div>
                                  )}
                                </div>
                                <div className={styles.statSchool2}>
                                  <div className={styles.statValue}>{getMockData(comparisonSchool.INSTNM).studentFacultyRatio}:1</div>
                                  <div className={styles.statLabel}>{comparisonSchool.INSTNM}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(activeTab === 'SCHOLARSHIPS' || activeTab === 'STEPS TO APPLY') && (
                      <div className={styles.comingSoon}>
                        <div className={styles.comingSoonIcon}>🚧</div>
                        <h3 className={styles.comingSoonText}>Coming Soon</h3>
                        <p className={styles.comingSoonDescription}>
                          We're working on gathering detailed information for this section.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.schoolHeader}>
                  <div className={styles.schoolIcon}>🎓</div>
                  <h2 className={styles.schoolName}>{selectedSchool?.INSTNM}</h2>
                  <div className={styles.schoolLocation}>{selectedSchool?.CITY}, {selectedSchool?.STABBR}</div>
                </div>
                
                <div className={styles.schoolTabs}>
                  <div className={styles.tabsContainer}>
                    {schoolTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  
                  <div className={styles.tabContent}>
                    {activeTab === 'COST OF ENROLLMENT' && selectedSchool && (
                      <div className={styles.financialInfo}>
                        <div className={styles.statCards}>
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).avgDebt}</div>
                            <div className={styles.statLabel}>AVG. DEBT</div>
                            <div className={styles.infoIcon}>💡</div>
                            <p className={styles.statDescription}>
                              The typical {selectedSchool.INSTNM} student receives federal aid to help with college costs.
                            </p>
                          </div>
                          
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).avgRepayTime} years</div>
                            <div className={styles.statLabel}>AVG. REPAY TIME</div>
                            <div className={styles.infoIcon}>💡</div>
                            <p className={styles.statDescription}>
                              The typical {selectedSchool.INSTNM} student pays off their debt in this timeframe. </p>
                          </div>
                          
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).avgMonthlyRate}</div>
                            <div className={styles.statLabel}>AVG. MONTHLY RATE</div>
                            <div className={styles.infoIcon}>💡</div>
                            <p className={styles.statDescription}>
                              The typical {selectedSchool.INSTNM} student pays this amount monthly. This requires less than 5% of annual income.
                            </p>
                          </div>
                        </div>
                        
                        <div className={styles.actionButtons}>
                          <button className={styles.actionButton}>VIEW EXPECTED AID</button>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'WHAT\'S THE VALUE OF GOING' && selectedSchool && (
                      <div className={styles.valueInfo}>
                        <div className={styles.statCards}>
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).medianEarnings}</div>
                            <div className={styles.statLabel}>MEDIAN EARNINGS</div>
                            <div className={styles.infoIcon}>💡</div>
                            <p className={styles.statDescription}>
                              The median earnings of {selectedSchool.INSTNM} graduates 10 years after graduation.
                            </p>
                          </div>
                          
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>${getMockData(selectedSchool.INSTNM).nationalMedian}</div>
                            <div className={styles.statLabel}>NATIONAL MEDIAN</div>
                            <div className={styles.infoIcon}>💡</div>
                            <p className={styles.statDescription}>
                              The national median earnings for all college graduates 10 years after graduation.
                            </p>
                          </div>
                          
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).earningAdvantage}%</div>
                            <div className={styles.statLabel}>EARNINGS ADVANTAGE</div>
                            <div className={styles.infoIcon}>💡</div>
                            <p className={styles.statDescription}>
                              Percentage of {selectedSchool.INSTNM} graduates who earn more than high school graduates.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'DEMOGRAPHICS' && selectedSchool && (
                      <div className={styles.demographicsInfo}>
                        <div className={styles.statCards}>
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).totalEnrollment}</div>
                            <div className={styles.statLabel}>TOTAL ENROLLMENT</div>
                            <div className={styles.infoIcon}>📊</div>
                            <p className={styles.statDescription}>
                              Total undergraduate students enrolled at {selectedSchool.INSTNM}.
                            </p>
                          </div>
                          
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).diversityIndex}%</div>
                            <div className={styles.statLabel}>DIVERSITY INDEX</div>
                            <div className={styles.infoIcon}>👥</div>
                            <p className={styles.statDescription}>
                              Measure of racial and ethnic diversity at {selectedSchool.INSTNM}.
                            </p>
                          </div>
                          
                          <div className={styles.statCard}>
                            <div className={styles.statValue}>{getMockData(selectedSchool.INSTNM).studentFacultyRatio}:1</div>
                            <div className={styles.statLabel}>STUDENT:FACULTY RATIO</div>
                            <div className={styles.infoIcon}>👩‍🏫</div>
                            <p className={styles.statDescription}>
                              The ratio of students to faculty at {selectedSchool.INSTNM}.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {(activeTab === 'SCHOLARSHIPS' || activeTab === 'STEPS TO APPLY') && (
                      <div className={styles.comingSoon}>
                        <div className={styles.comingSoonIcon}>🚧</div>
                        <h3 className={styles.comingSoonText}>Coming Soon</h3>
                        <p className={styles.comingSoonDescription}>
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