// Web Vitals performance monitoring

// Core Web Vitals metrics
export const webVitalsMetrics = {
  CLS: 'Cumulative Layout Shift',
  FID: 'First Input Delay',
  LCP: 'Largest Contentful Paint',
  FCP: 'First Contentful Paint',
  TTFB: 'Time to First Byte',
  INP: 'Interaction to Next Paint'
};

// Performance thresholds (Google's recommendations)
export const performanceThresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  LCP: { good: 2500, needsImprovement: 4000 },
  FCP: { good: 1800, needsImprovement: 3000 },
  TTFB: { good: 800, needsImprovement: 1800 },
  INP: { good: 200, needsImprovement: 500 }
};

// Get performance rating
export const getPerformanceRating = (metric, value) => {
  const thresholds = performanceThresholds[metric];
  if (!thresholds) return 'unknown';
  
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needs-improvement';
  return 'poor';
};

// Performance metrics collector
export class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      reportInterval: 30000, // 30 seconds
      maxReports: 100,
      enableConsoleLog: process.env.NODE_ENV === 'development',
      ...options
    };
    
    this.metrics = new Map();
    this.reports = [];
    this.observers = new Map();
    
    this.init();
  }
  
  init() {
    // Initialize performance observers
    this.initPerformanceObserver();
    this.initNavigationTiming();
    this.initResourceTiming();
    this.initUserTiming();
    
    // Start periodic reporting
    if (this.options.reportInterval > 0) {
      this.startPeriodicReporting();
    }
  }
  
  initPerformanceObserver() {
    if (!('PerformanceObserver' in window)) return;
    
    // Observe Core Web Vitals
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric(entry.name, entry.value, entry);
        });
      });
      
      observer.observe({ entryTypes: ['measure', 'navigation', 'resource', 'paint'] });
      this.observers.set('main', observer);
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }
  
  initNavigationTiming() {
    if (!('performance' in window) || !performance.timing) return;
    
    window.addEventListener('load', () => {
      const timing = performance.timing;
      const navigation = performance.navigation;
      
      // Calculate key metrics
      const metrics = {
        'dns-lookup': timing.domainLookupEnd - timing.domainLookupStart,
        'tcp-connection': timing.connectEnd - timing.connectStart,
        'ssl-negotiation': timing.connectEnd - timing.secureConnectionStart,
        'request-response': timing.responseEnd - timing.requestStart,
        'dom-processing': timing.domComplete - timing.domLoading,
        'page-load': timing.loadEventEnd - timing.navigationStart,
        'dom-ready': timing.domContentLoadedEventEnd - timing.navigationStart,
        'first-byte': timing.responseStart - timing.navigationStart
      };
      
      Object.entries(metrics).forEach(([name, value]) => {
        if (value >= 0) {
          this.recordMetric(name, value);
        }
      });
      
      // Navigation type
      this.recordMetric('navigation-type', navigation.type);
    });
  }
  
  initResourceTiming() {
    if (!('performance' in window)) return;
    
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          this.recordResourceMetric(entry);
        }
      });
    });
    
    try {
      observer.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', observer);
    } catch (error) {
      console.warn('Resource timing observer not supported:', error);
    }
  }
  
  initUserTiming() {
    // Custom performance marks and measures
    this.mark = (name) => {
      if ('performance' in window && performance.mark) {
        performance.mark(name);
      }
    };
    
    this.measure = (name, startMark, endMark) => {
      if ('performance' in window && performance.measure) {
        try {
          performance.measure(name, startMark, endMark);
          const measure = performance.getEntriesByName(name, 'measure')[0];
          if (measure) {
            this.recordMetric(name, measure.duration);
          }
        } catch (error) {
          console.warn('Performance measure failed:', error);
        }
      }
    };
  }
  
  recordMetric(name, value, entry = null) {
    const timestamp = Date.now();
    const metric = {
      name,
      value,
      timestamp,
      rating: this.getMetricRating(name, value),
      entry
    };
    
    this.metrics.set(`${name}-${timestamp}`, metric);
    
    if (this.options.enableConsoleLog) {
      console.log(`📊 ${name}: ${value}ms (${metric.rating})`);
    }
    
    // Trigger custom event
    this.dispatchMetricEvent(metric);
  }
  
  recordResourceMetric(entry) {
    const metrics = {
      'resource-load': entry.duration,
      'resource-size': entry.transferSize || entry.encodedBodySize,
      'resource-type': this.getResourceType(entry.name)
    };
    
    Object.entries(metrics).forEach(([name, value]) => {
      this.recordMetric(`${name}-${entry.name}`, value, entry);
    });
  }
  
  getResourceType(url) {
    if (url.match(/\.(js|jsx|ts|tsx)$/)) return 'script';
    if (url.match(/\.(css|scss|sass)$/)) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font';
    return 'other';
  }
  
  getMetricRating(name, value) {
    // Map metric names to standard names
    const metricMap = {
      'page-load': 'LCP',
      'first-byte': 'TTFB',
      'dom-ready': 'FCP'
    };
    
    const standardName = metricMap[name] || name.toUpperCase();
    return getPerformanceRating(standardName, value);
  }
  
  dispatchMetricEvent(metric) {
    const event = new CustomEvent('performance-metric', {
      detail: metric
    });
    window.dispatchEvent(event);
  }
  
  startPeriodicReporting() {
    setInterval(() => {
      this.generateReport();
    }, this.options.reportInterval);
  }
  
  generateReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: this.getConnectionInfo(),
      metrics: this.getMetricsSummary(),
      resources: this.getResourcesSummary()
    };
    
    this.reports.push(report);
    
    // Keep only recent reports
    if (this.reports.length > this.options.maxReports) {
      this.reports = this.reports.slice(-this.options.maxReports);
    }
    
    if (this.options.enableConsoleLog) {
      console.table(report.metrics);
    }
    
    return report;
  }
  
  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      };
    }
    return null;
  }
  
  getMetricsSummary() {
    const summary = {};
    
    this.metrics.forEach((metric) => {
      const baseName = metric.name.split('-')[0];
      if (!summary[baseName]) {
        summary[baseName] = {
          count: 0,
          total: 0,
          min: Infinity,
          max: -Infinity,
          avg: 0
        };
      }
      
      const stat = summary[baseName];
      stat.count++;
      stat.total += metric.value;
      stat.min = Math.min(stat.min, metric.value);
      stat.max = Math.max(stat.max, metric.value);
      stat.avg = stat.total / stat.count;
    });
    
    return summary;
  }
  
  getResourcesSummary() {
    const resources = {};
    
    this.metrics.forEach((metric) => {
      if (metric.name.startsWith('resource-type-')) {
        const type = metric.value;
        if (!resources[type]) {
          resources[type] = { count: 0, totalSize: 0, totalTime: 0 };
        }
        resources[type].count++;
      }
    });
    
    return resources;
  }
  
  exportData() {
    return {
      metrics: Array.from(this.metrics.values()),
      reports: this.reports,
      summary: this.getMetricsSummary()
    };
  }
  
  clearData() {
    this.metrics.clear();
    this.reports = [];
  }
  
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.clearData();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Convenience functions for manual tracking
export const markPerformance = (name) => performanceMonitor.mark(name);
export const measurePerformance = (name, start, end) => performanceMonitor.measure(name, start, end);

// Track specific user interactions
export const trackInteraction = (name, startTime = performance.now()) => {
  const endTime = performance.now();
  const duration = endTime - startTime;
  performanceMonitor.recordMetric(`interaction-${name}`, duration);
  return duration;
};

// Track component render times
export const trackComponentRender = (componentName) => {
  const startMark = `${componentName}-render-start`;
  const endMark = `${componentName}-render-end`;
  const measureName = `${componentName}-render-time`;
  
  return {
    start: () => performanceMonitor.mark(startMark),
    end: () => {
      performanceMonitor.mark(endMark);
      performanceMonitor.measure(measureName, startMark, endMark);
    }
  };
};

// Get current performance score
export const getPerformanceScore = () => {
  const summary = performanceMonitor.getMetricsSummary();
  const scores = {};
  
  Object.entries(summary).forEach(([metric, stats]) => {
    const rating = getPerformanceRating(metric.toUpperCase(), stats.avg);
    scores[metric] = {
      value: stats.avg,
      rating,
      score: rating === 'good' ? 100 : rating === 'needs-improvement' ? 50 : 0
    };
  });
  
  return scores;
};
