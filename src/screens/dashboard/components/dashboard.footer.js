import React from 'react';
import { plusIcon } from  'assets/images';
import './dashboard.footer.scss';

const DashboardFooter = ({ psi, rain }) => {
  return (
    <div className='dashboard-footer-container'>
      <InfoItem label='PSI' footer={psi.status}>
        <div className='dashboard-footer-psi dashboard-footer-info-value'>
          {psi.value}
        </div>
      </InfoItem>
      <InfoItem label='RAIN' footer={rain.units}>
        <div className='dashboard-footer-info-value'>
          {rain.value}
        </div>
      </InfoItem>
      <InfoItem label='DENGUE'>
        <div className='dashboard-footer-dengue-view'>
        </div>
      </InfoItem>
      <div className='dashboard-footer-add-view'>
        <img src={plusIcon} className='dashboard-footer-add-icon' alt='add-icon' />
        <span className='dashboard-footer-add'>Add</span>
      </div>
    </div>
  );
}

const InfoItem = ({ label, children,  footer }) => {
  return (
    <div className='dashboard-footer-info-item'>
      <div className='dashboard-footer-info-label'>{label}</div>
      <div className='dashboard-footer-info-body'>
        {children}
      </div>
      <div className='dashboard-footer-info-status'>
        {footer}
      </div>
    </div>
  );
}

export default DashboardFooter;