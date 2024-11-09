/// <reference types="cypress" />

describe('StageGram Stories Feature', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display a list of stories', () => {
        cy.get('[data-testid="story-list"]').should('be.visible');
        cy.get('[data-testid^="story-thumbnail-"]').should('have.length.at.least', 1);
    });

    it('should open a story when a thumbnail is clicked', () => {
        cy.get('[data-testid="story-thumbnail-0"]').click();
        cy.get('[data-testid="story-viewer"]').should('be.visible');
        cy.get('[data-testid="story-image"]').should('be.visible');
    });

    it('should automatically navigate to the next story after 5 seconds', () => {
        cy.get('[data-testid="story-thumbnail-0"]').click();

        cy.get('[data-testid="story-image"]')
            .invoke('attr', 'alt')
            .then((firstAltText) => {
                cy.wait(5500); // Wait for 5 seconds plus buffer

                cy.get('[data-testid="story-image"]')
                    .invoke('attr', 'alt')
                    .should((secondAltText) => {
                        expect(secondAltText).not.to.eq(firstAltText);
                    });
            });
    });

    it('should manually navigate between stories using left and right clicks', () => {
        cy.get('[data-testid="story-thumbnail-0"]').click();

        cy.get('[data-testid="story-image"]')
            .invoke('attr', 'alt')
            .then((firstAltText) => {
                cy.get('[data-testid="image-container"]').click('right');

                cy.get('[data-testid="story-image"]')
                    .invoke('attr', 'alt')
                    .should((secondAltText) => {
                        expect(secondAltText).not.to.eq(firstAltText);
                    });

                // Click on the left side (0% to 25%)
                cy.get('[data-testid="image-container"]').click('left');

                cy.get('[data-testid="story-image"]')
                    .invoke('attr', 'alt')
                    .should((thirdAltText) => {
                        expect(thirdAltText).to.eq(firstAltText);
                    });
            });
    });

    it('should close the story viewer when the close button is clicked', () => {
        cy.get('[data-testid="story-thumbnail-0"]').click();
        cy.get('[data-testid="story-viewer"]').should('be.visible');

        cy.get('[data-testid="close-button"]').click();

        cy.get('[data-testid="story-viewer"]').should('not.exist');
    });
});

export {};