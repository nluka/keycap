import createUniqueArray from '../../../../../../../../utility/functions/createUniqueArray';

export default function getValidCollections(
  value: string,
  definedCollections: string[],
) {
  if (definedCollections.length === 0 || !value.match(/[a-zA-Z0-9]/)) {
    return [];
  }

  const collections = value.split(/[^a-zA-Z0-9-]+/g);

  const validCollectionRegex = new RegExp(definedCollections.join('|'));
  const validCollections: string[] = [];
  for (const coll of collections) {
    if (coll.match(validCollectionRegex)) {
      validCollections.push(coll.trim());
    }
  }

  const uniqueValidCollections = createUniqueArray(validCollections);
  return uniqueValidCollections;
}
