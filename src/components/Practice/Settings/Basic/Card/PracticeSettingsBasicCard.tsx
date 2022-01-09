import type { PracticeSettingNameBasic } from 'keycap-foundation';
import React, { ReactNode } from 'react';
import { actionCreatorPracticeSettingsCurrentConfigPinnedUpdate } from '../../../../../redux/actions/practice/practiceActionsSettings';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import BootstrapCard from '../../../../Bootstrap/Card/BootstrapCard';
import './PracticeSettingsBasicCard.css';

interface IProps {
  children: ReactNode;
  name: PracticeSettingNameBasic;
  title: ReactNode;
}

export default function PracticeSettingsBasicCard(props: IProps) {
  return (
    <BootstrapCard
      elevation={2}
      title={<Title content={props.title} name={props.name} />}
    >
      {props.children}
    </BootstrapCard>
  );
}

function Title({
  content,
  name,
}: {
  content: ReactNode;
  name: PracticeSettingNameBasic;
}) {
  const pinnedSettings = useAppSelector(
    (state) => state.practice.settings.currentConfig.basic.pinned,
  );
  const isPinned = pinnedSettings.includes(name);
  const dispatch = useAppDispatch();

  function getClasses() {
    return `bi text-warning bi-pin${isPinned ? '-fill' : ''}`;
  }

  function getTitle() {
    return `Click to ${isPinned ? 'un' : ''}pin`;
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <h4 className="m-0">{content}</h4>
      <i
        className={getClasses()}
        title={getTitle()}
        onClick={() => {
          dispatch(
            actionCreatorPracticeSettingsCurrentConfigPinnedUpdate({
              action: isPinned ? 'unpin' : 'pin',
              category: 'basic',
              name: name,
            }),
          );
        }}
      ></i>
    </div>
  );
}
