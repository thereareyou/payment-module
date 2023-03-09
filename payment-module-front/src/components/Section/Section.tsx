import React from 'react';
import './Section.css';

interface SectionPorps {
    children: React.ReactNode;
    sectionHeader?: string;
}

function Section({ children, sectionHeader }: SectionPorps) {
    return (
        <div className="section">
            {sectionHeader && (
                <div className="section__header-wrapper">
                    <div className="section__header-decoration"></div>
                    <span className='section__header'>{sectionHeader}</span>
                </div>
            )}
            <div className="section-content">
                {children}
            </div>
        </div>
    );   
}

export default Section;