import React from 'react';
import plusIcon from './images/plus.svg';

const DashboardFooter = ({ psi, rain }) => {
  return (
    <div className='dashboardFooter-container'>
      <InfoItem label='PSI' footer={psi.status}>
        <div className='dashboardFooter-psi dashboardFooter-info-value'>
          {psi.value}
        </div>
      </InfoItem>
      <InfoItem label='RAIN' footer={rain.units}>
        <div className='dashboardFooter-info-value'>
          {rain.value}
        </div>
      </InfoItem>
      <InfoItem label='DENGUE'>
        <div className='dashboardFooter-info-value'>
          0
        </div>
      </InfoItem>
      <div className='dashboardFooter-add-view'>
        <img src={plusIcon} className='dashboardFooter-add-icon' alt='add-icon' />
        <span className='dashboardFooter-add'>Add</span>
      </div>
    </div>
  );
}

const InfoItem = ({ label, children,  footer }) => {
  return (
    <div className='dashboardFooter-info-item'>
      <div className='dashboardFooter-info-label'>{label}</div>
      <div className='dashboardFooter-info-body'>
        {children}
      </div>
      <div className='dashboardFooter-info-status'>
        {footer}
      </div>
    </div>
  );
}

export default DashboardFooter;