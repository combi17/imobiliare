import React, { useState, useRef, useEffect } from 'react';

const groupedLocations = [
    {
        label: 'Dubai',
        code: 'AE',
        value: 'city_Dubai',
        items: [
            { label: 'Dubai Marina', value: 'zone_DubaiMarina' },
            { label: 'Jumeirah Village Circle (JVC)', value: 'zone_JVC' },
            { label: 'Downtown Dubai', value: 'zone_Downtown' }
        ]
    },
    {
        label: 'București',
        code: 'RO',
        value: 'city_Bucharest',
        items: [
            { label: 'Sector 1 (Kiseleff)', value: 'zone_Sector 1' },
            { label: 'Floreasca', value: 'zone_Floreasca' },
            { label: 'Băneasa', value: 'zone_Baneasa' }
        ]
    }
];

const flagUAEUrl = "https://flagcdn.com/16x12/ae.png";
const flagROUrl = "https://flagcdn.com/16x12/ro.png";
const flagMap = { 'AE': flagUAEUrl, 'RO': flagROUrl };

const CustomGroupedLocationFilter = ({ onFilterChange, currentCity, currentZone }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const getSelectedValue = () => {
        if (currentCity) {
            return `city_${currentCity}`;
        }
        if (currentZone) {
            return `zone_${currentZone}`;
        }
        return null;
    };

    const selectedValue = getSelectedValue();

    const getDisplayLabel = () => {
        if (!selectedValue) return "Toate";
        for (const group of groupedLocations) {
            if (group.value === selectedValue) return group.label;
            const item = group.items.find(i => i.value === selectedValue);
            if (item) return item.label;
        }
        return "Toate";
    };

    const handleSelection = (value) => {
        onFilterChange(value);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const renderOptions = () => {
        return groupedLocations.map((group) => (
            <React.Fragment key={group.label}>
                <div 
                    className="dropdown-group-header"
                    onClick={() => handleSelection(group.value)}
                >
                    {group.code === 'AE' && <img src={flagMap[group.code]} alt="UAE Flag" className="flag-icon-small" />}
                    <span className={group.value === selectedValue ? 'selected-item' : ''}>
                        {group.label} 
                    </span>
                    {group.code === 'RO' && <img src={flagMap[group.code]} alt="RO Flag" className="flag-icon-small" />}
                </div>

                {group.items.map((item) => (
                    <div
                        key={item.value}
                        className={`dropdown-item dropdown-item-zone ${item.value === selectedValue ? 'selected-item' : ''}`}
                        onClick={() => handleSelection(item.value)}
                    >
                        {item.label}
                    </div>
                ))}
            </React.Fragment>
        ));
    };

    return (
        <div className="filter-group">
            <label>Oraș / Zonă</label>
            <div 
                className="custom-dropdown-container" 
                ref={dropdownRef}
                style={{ position: 'relative' }}
            >
                <div 
                    className={`dropdown-display-area ${isOpen ? 'active' : ''}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {getDisplayLabel()}
                    <svg className={`chevron-icon ${isOpen ? 'rotate-up' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                
                {isOpen && (
                    <div className="dropdown-options-list">
                        {renderOptions()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomGroupedLocationFilter;