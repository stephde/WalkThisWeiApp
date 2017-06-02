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
    const { nextChapterIndex } = activeProgress;
    return activeStory.chapters
      ? activeStory.chapters[nextChapterIndex-1].subChapters
      : [];
  } else return [];
};

export function getActiveSubChapter(activeStory, activeProgress) {
  if(activeProgress) {
    const { activeSubChapterIndex } = activeProgress;
    activeSubChapters = getActiveSubChapters(activeStory, activeProgress);
    if(activeSubChapters.length > 0) {
      return activeSubChapters[activeSubChapterIndex - 1];
    }
    return {};
  }
  return {};
};
