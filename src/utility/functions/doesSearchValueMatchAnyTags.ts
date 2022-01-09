import escapeStringForRegExp from './escapeStringForRegExp';

export default function doesSearchValueMatchAnyTags(
  str: string,
  tags: string[],
) {
  const regex = new RegExp(
    `(.*)${escapeStringForRegExp(str.toLowerCase())}(.*)`,
  );
  return tags.some((tag) => tag.match(regex));
}
