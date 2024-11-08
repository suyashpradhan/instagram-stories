import React from "react";
// @ts-ignore
import styles from "./StoryList.module.css"

interface StoryListProps {
    stories: any[];
    onSelectStory: (index: number) => void;
}

const StoryList = ({stories, onSelectStory}: StoryListProps) => {
    return (
        <div className={styles.storyList}>
            {stories?.map((story, index) => (
                <img
                    key={story.id}
                    src={story.imageUrl}
                    alt={`Story ${story.id}`}
                    onClick={() => onSelectStory(index)}
                    className={styles.storyThumbnail}
                />
            ))}
        </div>
    )
}

export default StoryList