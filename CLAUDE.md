# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**경기도의회 의원 의정활동 관리시스템** - A comprehensive mobile-first web application for managing Korean National Assembly members' legislative activities.

- **Primary Language**: Korean (UI, documentation, comments)
- **Technology Stack**: Vanilla HTML5, CSS3, JavaScript ES6+, Tailwind CSS
- **Target Platform**: Mobile-first (430px optimized), responsive to desktop
- **Design System**: Korean government standard colors (#003d7a, #0056b3) with KRDS compliance
- **Current Version**: 2.0.0 (Enhanced with comprehensive features)
- **Last Major Update**: 2025-01-17

## Development Commands

### Running the Application
```bash
# Open directly in browser (no build process required)
# Simply open index.html or index (1).html in any modern browser

# For live development with auto-reload (if using VS Code)
# Use Live Server extension or similar

# No npm/yarn commands needed - pure static site
```

### Testing & Validation
```bash
# HTML validation
# Use W3C HTML Validator on index (1).html

# CSS validation  
# Check style (1).css with W3C CSS Validator

# JavaScript linting
# Manually check main (1).js for console errors in browser DevTools

# Mobile responsiveness
# Test at 320px, 430px (primary), 768px, 1024px+ breakpoints
```

## Architecture & Code Organization

### Application Structure
The app follows a single-page application pattern with vanilla JavaScript:

- **app object** (`window.app`): Central controller managing:
  - Page navigation and routing
  - Authentication state management
  - Data binding for member information
  - Modal/overlay control system
  - Event listener coordination

### Data Flow
1. **Member Data**: Stored in `app.memberData` object, persisted to localStorage
2. **Page Navigation**: Handled by `app.navigateTo()` and `app.loadPage()`
3. **Authentication**: Token-based with localStorage persistence
4. **Real-time Updates**: Chart.js for data visualization, QRious for QR generation

### Key UI Components
- **Hamburger Menu**: Touch-optimized side navigation with overlay
- **Digital ID Card**: Premium gradient design with real-time QR code
- **Dashboard Cards**: Interactive statistics with click navigation
- **Modal System**: 20+ modals for detailed views and actions
- **Bottom Navigation**: Fixed mobile navigation bar

## Critical Implementation Details

### Mobile Optimization Requirements
- **Touch targets**: Minimum 44px × 44px (Apple HIG standard)
- **Animations**: Must maintain 60fps, use CSS transforms
- **Scroll control**: Disable body scroll when modals/menus open
- **Viewport**: Fixed at 430px width for mobile consistency

### Government Compliance
- **Accessibility**: WCAG 2.1 AA compliance required
- **Security**: Authentication tokens, secure data handling
- **Colors**: Must use official government blue (#003d7a, #0056b3)
- **Typography**: Noto Sans KR for Korean text support

### Performance Considerations
- **Page Load**: Target < 3 seconds on 3G networks
- **CDN Dependencies**: Chart.js, QRious, Font Awesome, Google Fonts
- **Caching**: Utilize localStorage for member data and settings
- **Bundle Size**: Keep initial load < 500KB

## Page Structure

The application consists of 13 main pages, each loaded dynamically:
- `home`: Main dashboard with comprehensive statistics and performance reporting
- `digital-id`: Digital member ID card with premium design and real-time QR  
- `attendance`: Attendance tracking with detailed progress bars
- `info`: Member profile details with complete information
- `bill`: Legislative bill management with status tracking
- `speech`: Speech records and comprehensive statistics
- `civil`: Enhanced citizen complaint handling with AI assistance
- `budget`: Budget examination with detailed review tracking
- `committee-members`: Committee member lookup with filtering
- `staff-directory`: Office directory with complete contact information
- `education`: Education course tracking with progress monitoring
- `location-tracking`: Enhanced location-based activities with GPS verification
- `report`: Comprehensive statistical analysis and reporting
- `settings`: Application settings with advanced preferences

## External Dependencies

All libraries are loaded via CDN (check availability before modifying):
- **Chart.js**: Monthly activity charts on dashboard
- **QRious**: QR code generation for digital ID
- **Font Awesome**: Icon system throughout the app
- **Tailwind CSS**: Utility-first CSS framework
- **Google Fonts**: Noto Sans KR for Korean typography

## Common Development Tasks

### Adding a New Page
1. Create page content in `app.pages` object
2. Add navigation item to hamburger menu
3. Update bottom navigation if needed
4. Implement page-specific functionality in load handler

### Modifying Member Data
Update the `app.memberData` object and ensure localStorage sync:
```javascript
app.memberData.property = value;
localStorage.setItem('memberData', JSON.stringify(app.memberData));
```

### Creating New Modals
Use the existing modal system pattern:
```javascript
app.showModal('modalId', {
    title: 'Modal Title',
    content: 'Modal Content',
    onConfirm: () => { /* handler */ }
});
```

## Recent Major Enhancements (2025-01-17)

### ✅ Civil Complaint Processing System
- Enhanced smart dashboard with real-time status tracking
- One-click response buttons for common actions
- AI-powered automatic response generation
- Improved filtering and comprehensive statistics
- Intuitive design optimized for council member workflows

### ✅ Location-Based Activity System
- Comprehensive GPS-verified activity tracking (28 detailed activities)
- Google Maps integration for location verification
- Activity certificates with digital signatures
- Rich statistical reporting and filtering capabilities
- Real-time location validation and proof generation

### ✅ Performance Reporting System
- Comprehensive performance dashboard with detailed statistics
- Achievement tracking with visual progress indicators
- PDF export functionality for official reports
- Future planning integration with goal setting
- Comparative analysis with peer benchmarking

### ✅ Calendar System Improvements
- Fixed date display issues in meeting schedule modals
- Added fallback calendar styling for reliability
- Enhanced FullCalendar integration with proper CSS
- Improved mobile responsiveness for calendar views

## File Structure & Conventions

### Core Application Files
- `index (1).html`: Main application entry point
- `style (1).css`: Enhanced styling with government standards
- `js/app-core.js`: Core application logic and routing
- `js/app-modals.js`: Modal system and interactions
- `js/app-calendar.js`: Calendar functionality
- `js/app-location-enhanced.js`: Enhanced location tracking system
- `js/app-pages.js`: Page templates and performance reporting
- `js/app-civil.js`: Enhanced civil complaint processing

### Important Implementation Notes
- The application is production-ready with comprehensive mock data
- All file names maintain "(1)" suffix convention
- Hamburger menu functionality is fully operational
- Digital ID card includes real-time clock and QR code updates
- All 20+ modals are fully interactive and functional
- Enhanced mobile optimization with 44px minimum touch targets
- Performance optimized for 3-second load times on 3G networks
- WCAG 2.1 AA accessibility compliance maintained

## Data Management

### Enhanced Data Binding
The system now includes comprehensive data management:
```javascript
// Enhanced member data structure
app.memberData = {
    personal: { name, party, district, committees },
    statistics: { attendance, bills, speeches, complaints },
    activities: { location_based, performance_metrics },
    settings: { preferences, notifications, security }
};
```

### Location Data Integration
- GPS coordinates for all tracked activities
- Google Maps integration for verification
- Activity certificates with timestamps
- Comprehensive statistics and filtering

### Performance Metrics
- Real-time activity tracking
- Achievement progress monitoring
- Comparative analysis capabilities
- PDF report generation functionality