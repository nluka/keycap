import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../../../redux/hooks';
import doesSearchValueMatchAnyTags from '../../../../../utility/functions/doesSearchValueMatchAnyTags';
import practiceSettingNameBasicToCardMap from './practiceSettingNameBasicToCardMap';
import './PracticeSettingsBasicCardsContainer.css';

interface IProps {
  searchValue: string;
  onlyShowPinned: boolean;
}

export default function PracticeSettingsBasicCardsContainer(props: IProps) {
  const pinned = useAppSelector(
    (state) => state.practice.settings.pinned,
    shallowEqual,
  );

  function getContent() {
    const cards = getVisibleCards();
    return cards.length > 0 ? (
      cards
    ) : (
      <p className="m-0">No matching cards found.</p>
    );
  }

  function getVisibleCards() {
    const cards: JSX.Element[] = [];

    practiceSettingNameBasicToCardMap.forEach((card, name) => {
      if (
        (props.onlyShowPinned && !pinned.includes(name)) ||
        !doesSearchValueMatchAnyTags(props.searchValue.trim(), card.tags)
      ) {
        return;
      }
      cards.push(card.element);
    });

    return cards;
  }

  return (
    <div className="cards-container d-flex gap-2 pb-2">{getContent()}</div>
  );
}
