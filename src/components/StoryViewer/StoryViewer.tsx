import React, {useEffect, useRef, useState} from 'react';
// @ts-ignore
import styles from "./StoryViewer.module.css"
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface Props {
    stories?: any[];
    initialIndex: number;
    onClose: () => void;
}

const StoryViewer: React.FC<Props> = ({stories, initialIndex, onClose}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [loading, setLoading] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        startTimer();
        return () => {
            clearTimer();
        };
    }, [currentIndex]);

    const startTimer = () => {
        clearTimer();
        timerRef.current = setTimeout(() => {
            goToNextStory();
        }, 5000);
    };

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    };

    const goToNextStory = () => {
        if (currentIndex < stories!.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const goToPreviousStory = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleTap = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {clientX} = event;
        const middle = window.innerWidth / 2;
        if (clientX < middle) {
            goToPreviousStory();
        } else {
            goToNextStory();
        }
    };

    return (
        <div className={styles.storyViewer} onClick={handleTap}>
            {loading && <LoadingSpinner/>}
            <img
                src={stories?.[currentIndex].imageUrl}
                alt={`Story ${stories?.[currentIndex].id}`}
                onLoad={handleImageLoad}
                className={`${styles.storyImage} ${loading ? 'hidden' : 'visible'}`}
            />
        </div>
    );
};

export default StoryViewer;
