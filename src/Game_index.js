import Phaser from 'phaser';
import Gamebackground from './scenes/Gamebackground';
import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';

// --- SECURE PROGRESS REPORTING ---
// Call this function from your GameOver scene when the player wins
window.saveProgress = async function(chapterName) {
    const dashScriptURL = 'https://script.google.com/macros/s/AKfycbxfRdHnp52wlgIP-CQIYHq_YyYoEqlHaOTigIj4-Xik2QhKbbrvp9q38Cr9GKQrNRap/exec';
    
    try {
        const response = await fetch(dashScriptURL, {
            method: 'POST',
            body: JSON.stringify({
                action: 'save_xp_and_progress',
                email: localStorage.getItem('userEmail'),
                token: localStorage.getItem('sessionToken'), // Server validates this
                chapterCompleted: chapterName // Only send the event, not the points!
            })
        });
        const result = await response.json();
        console.log("Progress saved securely:", result);
        return result;
    } catch (err) {
        console.error("Network error saving progress:", err);
    }
};

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game-container',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1000,
        height: 500
    },
    resolution: Math.max(window.devicePixelRatio, 2),
    roundPixels: false,
    antialias: true,
    antialiasGL: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 900 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

// Add scenes
game.scene.add('gamebackground', Gamebackground);
game.scene.add('game', Game);
game.scene.add('titlescreen', TitleScreen);
game.scene.add('gameover', GameOver);

game.scene.start('titlescreen');