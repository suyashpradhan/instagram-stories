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
                <div key={story.id} className={styles.storyContainer}>
                    <img

                        src={story.imageUrl}
                        alt={`Story ${story.id}`}
                        onClick={() => onSelectStory(index)}
                        className={styles.storyThumbnail}
                    />
                    <h1 className={styles.storyTitle}>{story?.name}</h1>
                </div>
            ))}
        </div>
    )
}

export default StoryList