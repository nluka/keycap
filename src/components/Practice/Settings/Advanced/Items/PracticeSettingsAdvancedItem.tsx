import React, { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { actionCreatorPracticeSettingsCurrentConfigPinnedUpdate } from '../../../../../redux/settingsActions';
import { SPACE } from '../../../../../utility/constants';
import type { PracticeSettingName } from '../../../../../utility/types/practice';
import './PracticeSettingsAdvancedItem.css';

interface IProps {
  children: ReactNode;
  classes?: string;
  name: PracticeSettingName;
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
  name: PracticeSettingName;
}
function Title(props: ITitleProps) {
  const pinnedSettings = useAppSelector(
    (state) => state.practice.settings.pinned,
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
              name: props.name,
            }),
          )
        }
        title={`Click to ${isPinned ? 'un' : ''}pin`}
      ></i>
    </div>
  );
}
