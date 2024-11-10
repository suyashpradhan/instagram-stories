import React, {useEffect, useState} from 'react';
import StoryViewer from "./components/StoryViewer/StoryViewer";
import StoryList from "./components/StoryList/StoryList";
import {Story} from "./types/story";

function App() {

    // 1: State Declarations
    const [stories, setStories] = useState<Story[]>([]);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
        null
    );

    // 2. API Call
    // Effect for fetching data from external files
    useEffect(() => {
        fetch(`/data/stories.json`)
            .then((response) => response.json())
            .then((data) => setStories(data));
    }, []);

    // 3. Event Handlers
    const handleSelectStory = (index: number) => {
        setSelectedStoryIndex(index);
    };

    const handleCloseViewer = () => {
        setSelectedStoryIndex(null);
    };

    // 4. JSX
    return (
        <div className="app">
            <h1 className="title">StageGram</h1>
            <StoryList stories={stories} onSelectStory={handleSelectStory}/>
            {selectedStoryIndex !== null && (
                <StoryViewer
                    stories={stories}
                    initialIndex={selectedStoryIndex}
                    onClose={handleCloseViewer}
                />
            )}
        </div>
    );
}

export default App;
