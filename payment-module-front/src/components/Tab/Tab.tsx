import React, { useState } from 'react';
import './Tab.css';

interface TabProps {
    navigationTabs: string[];
    navigationContent: JSX.Element[];
}

const Tab = ({ navigationTabs, navigationContent }: TabProps) => {

    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    const onTabClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const clickedTab = event.currentTarget as HTMLDivElement;
        const clickedTabIndex = Number(clickedTab.getAttribute('tab-id'));
        setActiveTabIndex(clickedTabIndex);
    }

    return (
        <div className="tabs">
            <div className="tab-bar">
                {navigationTabs.map((navigTab, index) => {

                    return (
                        <div
                            className={`tab${activeTabIndex === index ? ' active-tab' : ''}`}
                            key={index}
                            tab-id={index}
                            onClick={onTabClick}
                        >
                            <span>{navigTab}</span>
                        </div>
                    );
                })}
            </div>
            <div className="tab-content">
                {navigationContent[activeTabIndex] && navigationContent[activeTabIndex]}
            </div>
        </div>
    );
}

export default Tab;