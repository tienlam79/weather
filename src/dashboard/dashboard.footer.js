import React from 'react';

const DashboardFooter = () => {
  return (
    <div className='dashboardFooter-container'>
      <InfoItem label='PSI' footer='Good'>
        <div className='dashboardFooter-psi dashboardFooter-info-value'>
          23
        </div>
      </InfoItem>
      <InfoItem label='RAIN' footer='mm'>
        <div className='dashboardFooter-info-value'>
          0
        </div>
      </InfoItem>
      <InfoItem label='DENGUE'>
        <div className='dashboardFooter-info-value'>
          0
        </div>
      </InfoItem>
      <div className='dashboardFooter-add-view'>
        Add
      </div>
    </div>
  )
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