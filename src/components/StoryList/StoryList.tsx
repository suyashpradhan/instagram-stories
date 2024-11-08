import React from "react";
import "./StoryList.module.css"

interface StoryListProps {
    stories: any[];
    onSelectStory: (index: number) => void;
}

const StoryList = ({stories, onSelectStory}: StoryListProps) => {
    return (
        <div className="story-list">
            {stories?.map((story, index) => (
                <img
                    key={story.id}
                    src={story.imageUrl}
                    alt={`Story ${story.id}`}
                    onClick={() => onSelectStory(index)}
                    className="story-thumbnail"
                />
            ))}
        </div>
    )
}

export default StoryList