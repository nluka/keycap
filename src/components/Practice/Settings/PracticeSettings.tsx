import React from 'react';
import PracticeSettingsAdvanced from './Advanced/PracticeSettingsAdvanced';
import PracticeSettingsBasic from './Basic/PracticeSettingsBasic';
import PracticeSettingsDangerZone from './DangerZone/PracticeSettingsDangerZone';
import './PracticeSettings.css';
import PracticeSettingsProfiles from './Profiles/PracticeSettingsProfiles';

export default function PracticeSettingsArea() {
  return (
    <div className="d-flex flex-column gap-3 px-0 py-2">
      <h2 className="text-norm m-0" style={{ userSelect: 'none' }}>
        Settings
      </h2>
      <PracticeSettingsProfiles />
      <PracticeSettingsBasic />
      <PracticeSettingsAdvanced />
      <PracticeSettingsDangerZone />
    </div>
  );
}
