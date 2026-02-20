// Google Cloud Credits Pitch - Chart.js Visualizations

// Wait for DOM and Chart.js to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }
    
    // ============================================
    // 1. Cost Forecast Chart (Monthly Burn Rate)
    // ============================================
    
    const costForecastCtx = document.getElementById('costForecastChart');
    
    if (costForecastCtx) {
        // Data for 24 months (2 years)
        const months = [
            'Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6',
            'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12',
            'Month 13', 'Month 14', 'Month 15', 'Month 16', 'Month 17', 'Month 18',
            'Month 19', 'Month 20', 'Month 21', 'Month 22', 'Month 23', 'Month 24'
        ];
        
        // Year 1: $180,000 / 12 = $15,000/month (Vertex AI + Gemini agents + data processing)
        // Year 2: $200,000 / 12 = $16,667/month (full scale + multi-region + client platform)
        const year1Monthly = 15000;
        const year2Monthly = 16667;
        
        const monthlySpend = [
            ...Array(12).fill(year1Monthly),
            ...Array(12).fill(year2Monthly)
        ];
        
        // Cumulative spend
        let cumulativeSpend = [];
        let total = 0;
        monthlySpend.forEach(spend => {
            total += spend;
            cumulativeSpend.push(total);
        });
        
        // Credits remaining (starting with $350,000)
        const creditsTotal = 350000;
        const creditsRemaining = monthlySpend.map((_, index) => {
            const spent = cumulativeSpend[index];
            return creditsTotal - spent;
        });
        
        new Chart(costForecastCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Monthly Spend ($)',
                        data: monthlySpend,
                        borderColor: '#1a73e8',
                        backgroundColor: 'rgba(26, 115, 232, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Cumulative Spend ($)',
                        data: cumulativeSpend,
                        borderColor: '#34a853',
                        backgroundColor: 'rgba(52, 168, 83, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Credits Remaining ($)',
                        data: creditsRemaining,
                        borderColor: '#9334e6',
                        backgroundColor: 'rgba(147, 52, 230, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
                plugins: {
                    title: {
                        display: true,
                        text: '2-Year Cost Forecast & Credit Burn Rate',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Roboto'
                        },
                        color: '#202124',
                        padding: 20
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Roboto'
                            },
                            color: '#5f6368',
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(32, 33, 36, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#1a73e8',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.parsed.y.toLocaleString();
                                return label;
                            },
                            footer: function(tooltipItems) {
                                if (tooltipItems[0].dataIndex === 11) {
                                    return 'End of Year 1';
                                } else if (tooltipItems[0].dataIndex === 23) {
                                    return 'End of Year 2';
                                }
                                return '';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'K';
                            },
                            font: {
                                size: 12,
                                family: 'Roboto'
                            },
                            color: '#5f6368'
                        },
                        grid: {
                            color: 'rgba(218, 220, 224, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: {
                                size: 10,
                                family: 'Roboto'
                            },
                            color: '#5f6368'
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
    
    // ============================================
    // 2. Service Cost Breakdown Chart (Optional)
    // ============================================
    
    const serviceCostCtx = document.getElementById('serviceCostChart');
    
    if (serviceCostCtx) {
        new Chart(serviceCostCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Cloud Run Jobs',
                    'Cloud Storage',
                    'Cloud Build',
                    'BigQuery',
                    'Artifact Registry',
                    'Other Services'
                ],
                datasets: [{
                    data: [19854, 2025, 3000, 829, 600, 1305],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#fbbc04',
                        '#ea4335',
                        '#9334e6',
                        '#5f6368'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Year 1 Service Cost Breakdown',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Roboto'
                        },
                        color: '#202124',
                        padding: 20
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Roboto'
                            },
                            color: '#5f6368',
                            padding: 15
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(32, 33, 36, 0.9)',
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // ============================================
    // 3. Growth Projections Chart
    // ============================================
    
    const growthProjectionsCtx = document.getElementById('growthProjectionsChart');
    
    if (growthProjectionsCtx) {
        new Chart(growthProjectionsCtx, {
            type: 'bar',
            data: {
                labels: [
                    'Instruments',
                    'DeFi Protocols',
                    'Blockchains',
                    'Fund Managers',
                    'ML Models'
                ],
                datasets: [
                    {
                        label: 'Current (MVP)',
                        data: [4, 10, 6, 5, 16],
                        backgroundColor: 'rgba(234, 67, 53, 0.7)',
                        borderColor: '#ea4335',
                        borderWidth: 1
                    },
                    {
                        label: 'Year 1',
                        data: [20, 18, 10, 20, 80],
                        backgroundColor: 'rgba(251, 188, 4, 0.7)',
                        borderColor: '#fbbc04',
                        borderWidth: 1
                    },
                    {
                        label: 'Year 2',
                        data: [100, 25, 15, 50, 400],
                        backgroundColor: 'rgba(52, 168, 83, 0.7)',
                        borderColor: '#34a853',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: '2-Year Growth Projections',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Roboto'
                        },
                        color: '#202124',
                        padding: 20
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Roboto'
                            },
                            color: '#5f6368',
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(32, 33, 36, 0.9)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Roboto'
                            },
                            color: '#5f6368'
                        },
                        grid: {
                            color: 'rgba(218, 220, 224, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Roboto'
                            },
                            color: '#5f6368'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // ============================================
    // 4. AUM Growth Chart
    // ============================================
    
    const aumGrowthCtx = document.getElementById('aumGrowthChart');
    
    if (aumGrowthCtx) {
        new Chart(aumGrowthCtx, {
            type: 'line',
            data: {
                labels: ['MVP', 'Q1', 'Q2', 'Q3', 'Q4', 'Year 1', 'Q5', 'Q6', 'Q7', 'Q8', 'Year 2'],
                datasets: [{
                    label: 'AUM ($ Millions)',
                    data: [10, 20, 35, 55, 80, 100, 150, 225, 325, 450, 500],
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#34a853',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'AUM Growth Projection (2 Years)',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Roboto'
                        },
                        color: '#202124',
                        padding: 20
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(32, 33, 36, 0.9)',
                        callbacks: {
                            label: function(context) {
                                return 'AUM: $' + context.parsed.y + 'M';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value + 'M';
                            },
                            font: {
                                size: 12,
                                family: 'Roboto'
                            },
                            color: '#5f6368'
                        },
                        grid: {
                            color: 'rgba(218, 220, 224, 0.5)'
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                size: 12,
                                family: 'Roboto'
                            },
                            color: '#5f6368'
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // ============================================
    // 5. Credit Utilization Gauge
    // ============================================
    
    const creditUtilizationCtx = document.getElementById('creditUtilizationChart');
    
    if (creditUtilizationCtx) {
        const totalCredits = 350000;
        const usedCredits = 350000; // Full utilization
        const remainingCredits = 0;
        const utilizationPercent = 100;
        
        new Chart(creditUtilizationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Year 1 Credits ($180K)', 'Year 2 Credits ($170K)', 'Revenue-Funded ($30K)'],
                datasets: [{
                    data: [180000, 170000, 30000],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#9334e6'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Credit Utilization: ${utilizationPercent}% (2-Year)`,
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: 'Roboto'
                        },
                        color: '#202124',
                        padding: 20
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Roboto'
                            },
                            color: '#5f6368',
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(32, 33, 36, 0.9)',
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const percentage = ((value / totalCredits) * 100).toFixed(1);
                                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    console.log('Charts initialized successfully');
});
