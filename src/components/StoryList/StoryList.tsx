import React from "react";
import styles from "./StoryList.module.css"
import {Story} from "../../types/story";

// Component Types
interface StoryListProps {
    stories: Story[];
    onSelectStory: (index: number) => void;
}

const StoryList = ({stories, onSelectStory}: StoryListProps) => {
    return (
        <div className={styles.storyList} data-testid="story-list">
            {stories?.map((story, index) => (
                <div onClick={() => onSelectStory(index)} key={story.id} className={styles.storyContainer}
                     data-testid={`story-thumbnail-${index}`}>
                    <img
                        src={story.imageUrl}
                        alt={story?.image_description}
                        className={styles.storyThumbnail}
                    />
                    <h1 className={styles.storyTitle}>{story?.user_info?.user_name}</h1>
                </div>
            ))}
        </div>
    )
}

export default StoryList