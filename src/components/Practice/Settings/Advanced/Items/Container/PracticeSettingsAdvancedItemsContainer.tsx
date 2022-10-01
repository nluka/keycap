import React from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../../../../redux/hooks';
import doesSearchValueMatchAnyTags from '../../../../../../utility/functions/doesSearchValueMatchAnyTags';
import settingNameToItemMap from '../practiceSettingNameAdvancedToItemMap';

interface IProps {
  searchValue: string;
  onlyShowPinned: boolean;
}

export default function PracticeSettingsAdvancedItemsContainer(props: IProps) {
  const pinnedSettings = useAppSelector(
    (state) => state.practice.settings.pinned,
    shallowEqual,
  );

  function getContent() {
    const items = getVisibleItems();
    return items.length > 0 ? (
      items
    ) : (
      <p className="m-0">No matching items found.</p>
    );
  }

  function getVisibleItems() {
    const items: JSX.Element[] = [];

    settingNameToItemMap.forEach((item, name) => {
      if (
        (props.onlyShowPinned && !pinnedSettings.includes(name)) ||
        !doesSearchValueMatchAnyTags(props.searchValue.trim(), item.tags)
      ) {
        return;
      }

      items.push(item.element);
    });

    return items;
  }

  return <div className="d-flex flex-column gap-3">{getContent()}</div>;
}
