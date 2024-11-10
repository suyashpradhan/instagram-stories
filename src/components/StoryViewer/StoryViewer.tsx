import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './StoryViewer.module.css';
import {Story} from "../../types/story";

// Component Types
interface StoryViewerProps {
    stories: Story[];
    initialIndex: number;
    onClose: () => void;
}

const StoryViewer = ({stories, initialIndex, onClose}: StoryViewerProps) => {

    //1. State Declarations
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // 2. Ref for timer
    const timerRef = useRef<number | null>(null);

    // 3. Effects for resetting the value
    useEffect(() => {
        setProgress(0);
        setLoading(true);
        clearTimer();
    }, [currentIndex]);

    // 4. Handlers for navigating the stories
    const goToNextStory = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    }, [currentIndex, stories.length, onClose]);

    const goToPreviousStory = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Effect for handling timer and navigation
    useEffect(() => {
        const startTimer = () => {
            clearTimer();
            const startTime = Date.now();
            const totalDuration = 5000; // 5 seconds

            timerRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const newProgress = (elapsed / totalDuration) * 100;

                if (newProgress >= 100) {
                    clearTimer();
                    setProgress(100);
                    goToNextStory();
                } else {
                    setProgress(newProgress);
                }
            }, 50); // Update every 50ms
        };

        if (!loading) {
            startTimer();
        } else {
            clearTimer();
        }
    }, [loading, goToNextStory]);

    const clearTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    // 6. Handler for navigating the stories
    const handleTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        const {clientX} = event;
        const {left, right} = event.currentTarget.getBoundingClientRect();
        const width = right - left;

        const leftZoneEnd = left + width * 0.25;
        const rightZoneStart = right - width * 0.25;

        if (clientX < leftZoneEnd) {
            goToPreviousStory();
        } else if (clientX > rightZoneStart) {
            goToNextStory();
        }
    };

    // 7. JSX
    return (

        <div className={styles.storyViewerContainer} data-testid="story-viewer">
            {/* Story Header Section (Includes Progress Bar, Title and Avatar */}
            <div className={styles.storyViewer}>
                <div className={styles.progressBarContainer} data-testid="progress-bar">
                    <div
                        className={styles.progressBar}
                        style={{width: `${progress}%`}}
                    />
                </div>
                <div className={styles.storyHeader}>
                    <img
                        className={styles.storyUserAvatar}
                        src={stories[currentIndex].user_info?.avatar}
                        alt={`Avatar-${stories[currentIndex].user_info?.user_name}`}
                    />
                    <h1 className={styles.storyUserName}>{stories[currentIndex]?.user_info?.user_name}</h1>
                </div>

                {/* Story Container (Includes Story Image and Overlay */}
                <div className={styles.imageContainer} onClick={handleTap} data-testid="image-container">
                    <img
                        src={stories[currentIndex].imageUrl}
                        alt={`Story ${stories[currentIndex].id}`}
                        className={`${styles.storyImage} ${loading ? 'hidden' : 'visible'}`}
                        data-testid="story-image"
                        onLoad={() => setLoading(false)}
                    />
                </div>
                <div className={styles.overlay}></div>
            </div>

            {/* Close Story Button */}
            <button type="button" className={styles.closeIcon} onClick={() => onClose()} data-testid="close-button">
                X
            </button>
        </div>
    );
};

export default StoryViewer;
