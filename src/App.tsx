import React, {useEffect, useState} from 'react';
import StoryViewer from "./components/StoryViewer/StoryViewer";
import StoryList from "./components/StoryList/StoryList";

function App() {
    const [stories, setStories] = useState<any>();
    const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
        null
    );

    useEffect(() => {
        fetch(`${process.env.PUBLIC_URL}/data/stories.json`)
            .then((response) => response.json())
            .then((data) => setStories(data));
    }, []);

    const handleSelectStory = (index: number) => {
        setSelectedStoryIndex(index);
    };

    const handleCloseViewer = () => {
        setSelectedStoryIndex(null);
    };

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
