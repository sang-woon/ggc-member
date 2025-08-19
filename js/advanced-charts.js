// 고급 차트 및 데이터 시각화 시스템
// Chart.js 기반의 인터랙티브 차트 및 대시보드

class AdvancedCharts {
    constructor() {
        this.charts = new Map();
        this.chartConfigs = new Map();
        this.defaultColors = {
            primary: '#3b82f6',
            secondary: '#10b981',
            accent: '#f59e0b',
            danger: '#ef4444',
            warning: '#f97316',
            info: '#06b6d4',
            success: '#22c55e',
            gradient: {
                blue: ['#3b82f6', '#1d4ed8'],
                green: ['#10b981', '#059669'],
                purple: ['#8b5cf6', '#7c3aed'],
                orange: ['#f59e0b', '#d97706']
            }
        };
        
        this.isInitialized = false;
        this.init();
    }

    init() {
        try {
            // Chart.js 글로벌 설정
            this.setupChartDefaults();
            
            // 반응형 차트 리스너 설정
            this.setupResponsiveListeners();
            
            this.isInitialized = true;
            console.log('고급 차트 시스템 초기화 완료');
        } catch (error) {
            console.error('고급 차트 시스템 초기화 실패:', error);
        }
    }

    setupChartDefaults() {
        if (typeof Chart !== 'undefined') {
            Chart.defaults.font.family = "'Noto Sans KR', 'Inter', sans-serif";
            Chart.defaults.font.size = 12;
            Chart.defaults.color = '#6b7280';
            Chart.defaults.borderColor = '#e5e7eb';
            Chart.defaults.backgroundColor = 'rgba(59, 130, 246, 0.1)';
            
            // 애니메이션 설정
            Chart.defaults.animation.duration = 1000;
            Chart.defaults.animation.easing = 'easeInOutQuart';
            
            // 반응형 설정
            Chart.defaults.responsive = true;
            Chart.defaults.maintainAspectRatio = false;
        }
    }

    setupResponsiveListeners() {
        // 화면 크기 변경시 차트 리사이즈
        window.addEventListener('resize', this.debounce(() => {
            this.charts.forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    chart.resize();
                }
            });
        }, 300));
    }

    // 의정활동 월별 트렌드 차트
    createActivityTrendChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const chartData = data || this.generateMockActivityData();
        
        const config = {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        label: '의안 발의',
                        data: chartData.bills,
                        borderColor: this.defaultColors.primary,
                        backgroundColor: this.createGradient(ctx, this.defaultColors.gradient.blue),
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#ffffff',
                        pointBorderWidth: 2
                    },
                    {
                        label: '민원 처리',
                        data: chartData.complaints,
                        borderColor: this.defaultColors.secondary,
                        backgroundColor: this.createGradient(ctx, this.defaultColors.gradient.green),
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#ffffff',
                        pointBorderWidth: 2
                    },
                    {
                        label: '발언 기록',
                        data: chartData.speeches,
                        borderColor: this.defaultColors.accent,
                        backgroundColor: this.createGradient(ctx, this.defaultColors.gradient.orange),
                        tension: 0.4,
                        fill: true,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#ffffff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '월별 의정활동 트렌드',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937',
                        padding: 20
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: (context) => `${context[0].label}월`,
                            label: (context) => `${context.dataset.label}: ${context.parsed.y}건`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            callback: function(value, index) {
                                return this.getLabelForValue(value) + '월';
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '건';
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        this.chartConfigs.set(canvasId, config);
        
        return chart;
    }

    // 출석률 도넛 차트
    createAttendanceChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const attendanceData = data || {
            plenary: 98.5,
            standing: 96.2,
            special: 100
        };

        const config = {
            type: 'doughnut',
            data: {
                labels: ['본회의', '상임위', '특별위'],
                datasets: [{
                    data: Object.values(attendanceData),
                    backgroundColor: [
                        this.defaultColors.primary,
                        this.defaultColors.secondary,
                        this.defaultColors.accent
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '60%',
                plugins: {
                    title: {
                        display: true,
                        text: '회의별 출석률',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937',
                        padding: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => `${context.label}: ${context.parsed}%`
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            },
            plugins: [{
                id: 'centerText',
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    const centerX = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
                    const centerY = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
                    
                    ctx.save();
                    ctx.font = 'bold 20px "Noto Sans KR"';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#1f2937';
                    
                    const avgAttendance = (attendanceData.plenary + attendanceData.standing + attendanceData.special) / 3;
                    ctx.fillText(`${avgAttendance.toFixed(1)}%`, centerX, centerY - 5);
                    
                    ctx.font = '12px "Noto Sans KR"';
                    ctx.fillStyle = '#6b7280';
                    ctx.fillText('평균 출석률', centerX, centerY + 15);
                    ctx.restore();
                }
            }]
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        this.chartConfigs.set(canvasId, config);
        
        return chart;
    }

    // 예산 심사 현황 바 차트
    createBudgetChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const budgetData = data || this.generateMockBudgetData();

        const config = {
            type: 'bar',
            data: {
                labels: budgetData.labels,
                datasets: [
                    {
                        label: '심사 완료',
                        data: budgetData.completed,
                        backgroundColor: this.defaultColors.secondary,
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: '심사 중',
                        data: budgetData.inProgress,
                        backgroundColor: this.defaultColors.accent,
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: '대기 중',
                        data: budgetData.pending,
                        backgroundColor: '#e5e7eb',
                        borderRadius: 6,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '예산 심사 현황',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937',
                        padding: 20
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.parsed.y}건`
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '건';
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        this.chartConfigs.set(canvasId, config);
        
        return chart;
    }

    // 민원 처리 현황 레이더 차트
    createComplaintRadarChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const radarData = data || {
            categories: ['교통', '환경', '복지', '교육', '안전', '경제'],
            current: [85, 90, 78, 92, 88, 83],
            average: [75, 80, 70, 85, 80, 78]
        };

        const config = {
            type: 'radar',
            data: {
                labels: radarData.categories,
                datasets: [
                    {
                        label: '내 처리율',
                        data: radarData.current,
                        borderColor: this.defaultColors.primary,
                        backgroundColor: this.hexToRgba(this.defaultColors.primary, 0.2),
                        pointBackgroundColor: this.defaultColors.primary,
                        pointBorderColor: '#ffffff',
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 3
                    },
                    {
                        label: '평균 처리율',
                        data: radarData.average,
                        borderColor: this.defaultColors.secondary,
                        backgroundColor: this.hexToRgba(this.defaultColors.secondary, 0.1),
                        pointBackgroundColor: this.defaultColors.secondary,
                        pointBorderColor: '#ffffff',
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        borderWidth: 2,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '분야별 민원 처리 현황',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937',
                        padding: 20
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        cornerRadius: 8,
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.parsed.r}%`
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: '#f3f4f6'
                        },
                        angleLines: {
                            color: '#e5e7eb'
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        this.chartConfigs.set(canvasId, config);
        
        return chart;
    }

    // 실시간 업데이트 차트
    createRealTimeChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const config = {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: '실시간 활동',
                    data: [],
                    borderColor: this.defaultColors.primary,
                    backgroundColor: this.hexToRgba(this.defaultColors.primary, 0.1),
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '실시간 의정활동',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937',
                        padding: 20
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        }
                    }
                },
                animation: {
                    duration: 0
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        this.chartConfigs.set(canvasId, config);
        
        // 실시간 데이터 업데이트 시뮬레이션
        this.startRealTimeUpdate(chart);
        
        return chart;
    }

    // 혼합형 차트 (의정활동 종합)
    createMixedChart(canvasId, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return null;

        const mixedData = data || this.generateMockMixedData();

        const config = {
            type: 'bar',
            data: {
                labels: mixedData.labels,
                datasets: [
                    {
                        type: 'bar',
                        label: '의안 발의',
                        data: mixedData.bills,
                        backgroundColor: this.defaultColors.primary,
                        borderRadius: 4,
                        yAxisID: 'y'
                    },
                    {
                        type: 'bar',
                        label: '민원 처리',
                        data: mixedData.complaints,
                        backgroundColor: this.defaultColors.secondary,
                        borderRadius: 4,
                        yAxisID: 'y'
                    },
                    {
                        type: 'line',
                        label: '출석률',
                        data: mixedData.attendance,
                        borderColor: this.defaultColors.accent,
                        backgroundColor: 'transparent',
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '종합 의정활동 현황',
                        font: { size: 16, weight: 'bold' },
                        color: '#1f2937',
                        padding: 20
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        grid: {
                            color: '#f3f4f6'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '건';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min: 0,
                        max: 100,
                        grid: {
                            drawOnChartArea: false,
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        };

        const chart = new Chart(ctx, config);
        this.charts.set(canvasId, chart);
        this.chartConfigs.set(canvasId, config);
        
        return chart;
    }

    // 유틸리티 메서드들

    createGradient(ctx, colors) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, this.hexToRgba(colors[0], 0.8));
        gradient.addColorStop(1, this.hexToRgba(colors[1], 0.1));
        return gradient;
    }

    hexToRgba(hex, alpha = 1) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if (!result) return hex;
        
        const r = parseInt(result[1], 16);
        const g = parseInt(result[2], 16);
        const b = parseInt(result[3], 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 실시간 차트 업데이트
    startRealTimeUpdate(chart) {
        setInterval(() => {
            const now = new Date();
            const timeLabel = now.toLocaleTimeString('ko-KR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            
            // 최대 10개 데이터 포인트 유지
            if (chart.data.labels.length >= 10) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }
            
            chart.data.labels.push(timeLabel);
            chart.data.datasets[0].data.push(Math.floor(Math.random() * 10) + 1);
            
            chart.update('none');
        }, 5000);
    }

    // 모의 데이터 생성
    generateMockActivityData() {
        return {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            bills: [2, 3, 1, 4, 2, 3, 5, 2, 3, 4, 2, 1],
            complaints: [15, 20, 18, 25, 22, 28, 30, 26, 24, 27, 23, 19],
            speeches: [3, 4, 2, 5, 3, 4, 6, 4, 3, 5, 4, 2]
        };
    }

    generateMockBudgetData() {
        return {
            labels: ['교육', '복지', '환경', '교통', '안전', '문화'],
            completed: [12, 8, 15, 10, 6, 9],
            inProgress: [3, 5, 2, 4, 8, 3],
            pending: [2, 3, 1, 2, 1, 4]
        };
    }

    generateMockMixedData() {
        return {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            bills: [2, 3, 1, 4, 2, 3],
            complaints: [15, 20, 18, 25, 22, 28],
            attendance: [95, 98, 92, 97, 96, 99]
        };
    }

    // 차트 관리 메서드들

    updateChart(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (!chart) return;

        chart.data = newData;
        chart.update();
    }

    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.destroy();
            this.charts.delete(chartId);
            this.chartConfigs.delete(chartId);
        }
    }

    exportChart(chartId, format = 'png') {
        const chart = this.charts.get(chartId);
        if (!chart) return null;

        return chart.toBase64Image(format);
    }

    // 차트 데이터 내보내기
    exportChartData(chartId) {
        const config = this.chartConfigs.get(chartId);
        if (!config) return null;

        return {
            data: config.data,
            timestamp: new Date().toISOString()
        };
    }

    // 차트 리사이즈
    resizeChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.resize();
        }
    }

    // 모든 차트 리사이즈
    resizeAllCharts() {
        this.charts.forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    // 정리
    destroy() {
        this.charts.forEach(chart => {
            chart.destroy();
        });
        
        this.charts.clear();
        this.chartConfigs.clear();
    }
}

// 전역 인스턴스 생성
window.advancedCharts = new AdvancedCharts();