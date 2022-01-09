import type { PracticeSettingNameAdvanced } from 'keycap-foundation';
import React, { ReactNode } from 'react';
import { actionCreatorPracticeSettingsCurrentConfigPinnedUpdate } from '../../../../../redux/actions/practice/practiceActionsSettings';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { SPACE } from '../../../../../utility/constants';
import './PracticeSettingsAdvancedItem.css';

interface IProps {
  children: ReactNode;
  classes?: string;
  name: PracticeSettingNameAdvanced;
  title: string;
}

export default function PracticeSettingsAdvancedItem(props: IProps) {
  function getClassName() {
    const classes = ['item px-1'];
    if (props.classes !== undefined) {
      classes.push(props.classes);
    }
    return classes.join(SPACE);
  }

  return (
    <div className={getClassName()}>
      <Title content={props.title} name={props.name} />
      {props.children}
    </div>
  );
}

interface ITitleProps {
  content: string;
  name: PracticeSettingNameAdvanced;
}
function Title(props: ITitleProps) {
  const pinnedSettings = useAppSelector(
    (state) => state.practice.settings.currentConfig.advanced.pinned,
  );
  const isPinned = pinnedSettings.includes(props.name);
  const dispatch = useAppDispatch();

  return (
    <div className="d-flex align-items-center gap-2">
      <h4 className="m-0">{props.content}</h4>
      <i
        className={`bi text-warning bi-pin${isPinned ? '-fill' : ''}`}
        onClick={() =>
          dispatch(
            actionCreatorPracticeSettingsCurrentConfigPinnedUpdate({
              action: isPinned ? 'unpin' : 'pin',
              category: 'advanced',
              name: props.name,
            }),
          )
        }
        title={`Click to ${isPinned ? 'un' : ''}pin`}
      ></i>
    </div>
  );
}
