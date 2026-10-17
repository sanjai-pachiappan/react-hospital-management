import React from 'react';

const StatCard = ({
  title,
  value,
  icon,
  iconBg = "#e0f2fe",
  iconColor = "#0284c7",
  trend,
  trendPositive = true,
  subtitle,
  onClick
}) => {
  return (
    <div 
      className={`stat-card ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        <div 
          className="stat-icon-wrapper"
          style={{ backgroundColor: iconBg, color: iconColor }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
      </div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-desc">
        {trend && (
          <span className={`fw-bold d-inline-flex align-items-center gap-1 ${trendPositive ? 'text-success' : 'text-danger'}`}>
            <i className={`bi ${trendPositive ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`}></i>
            {trend}
          </span>
        )}
        <span className="text-muted">{subtitle}</span>
      </div>
    </div>
  );
};

export default StatCard;
