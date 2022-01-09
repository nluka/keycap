import React, { useRef } from 'react';
import {
  actionCreatorPracticeRoundAbort,
  actionCreatorPracticeRoundInit,
} from '../../../../redux/actions/practice/practiceActionsRound';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { PracticeStatus } from '../../../../redux/types/IStatePractice';
import BootstrapButton from '../../../Bootstrap/Button/BootstrapButton';
import './PracticePlayAreaActionButton.css';

export default function PracticePlayAreaActionButton() {
  const roundStatus = useAppSelector(
    (state) => state.practice.playArea.roundStatus,
  );
  const element = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  function getTheme() {
    switch (roundStatus) {
      case PracticeStatus.idle:
        return 'primary';
      case PracticeStatus.generatingText:
        return 'secondary';
      case PracticeStatus.countingDown:
      case PracticeStatus.running:
        return 'danger';
    }
  }

  function getTitle() {
    switch (roundStatus) {
      case PracticeStatus.idle:
        return 'Click to start a round';
      case PracticeStatus.running:
      case PracticeStatus.generatingText:
        return 'Click to abort the round';
      default:
        return undefined;
    }
  }

  function getContent() {
    switch (roundStatus) {
      case PracticeStatus.idle:
        return <i className="bi bi-play-fill"></i>;
      case PracticeStatus.generatingText:
        return (
          <>
            <span>Loading</span>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          </>
        );
      case PracticeStatus.countingDown:
      case PracticeStatus.running:
        return <i className="bi bi-x-lg"></i>;
    }
  }

  return (
    <BootstrapButton
      classes="d-flex align-items-center gap-2 px-2 py-1"
      elementRef={element}
      id="practiceActionButton"
      isOutline={
        roundStatus === PracticeStatus.running ||
        roundStatus === PracticeStatus.generatingText ||
        roundStatus === PracticeStatus.countingDown
      }
      onClick={(event) => {
        event.preventDefault();
        if (roundStatus === PracticeStatus.idle) {
          dispatch(actionCreatorPracticeRoundInit());
        } else {
          dispatch(actionCreatorPracticeRoundAbort());
        }
      }}
      theme={getTheme()}
      title={getTitle()}
    >
      {getContent()}
    </BootstrapButton>
  );
}
