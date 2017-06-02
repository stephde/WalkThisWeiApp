export function getActiveStory(stories, user) {
  if (!user || !stories) return null;
  if (!user.activeStoryId) return null;

  return stories[user.activeStoryId];
};

export function getActiveStoryProgress(stories, user, progress) {
  if (!user || !stories || !progress) return null;
  if (!user.activeStoryId) return null;
  return progress[user.activeStoryId]
    ? progress[user.activeStoryId]
    : null;
};

export function getActiveSubChapters(activeStory, activeProgress) {
  if (activeStory && activeProgress) {
    const { activeChapterIndex } = activeProgress;
    return activeStory.chapters
      ? activeStory.chapters[activeChapterIndex-1].subChapters
      : [];
  } else return [];
};
