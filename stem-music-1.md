# Melody Composer

```template
radio.setGroup(1)
music.setBuiltInSpeakerEnabled(true)
basic.showIcon(IconNames.SmallSquare)

function phraseA () {
    radio.sendNumber(0)
    basic.showString("A")
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}

function twinkle () {
    phraseA()
}
```

## Introduction @showdialog

In this tutorial you will program a micro:bit to play **Twinkle Twinkle Little Star** and broadcast which phrase is playing over radio.

A second micro:bit (or robot) can listen and respond — but first, you need to build the melody.

The song has three distinct phrases:

- **A** — Twinkle twinkle little star
- **B** — How I wonder what you are
- **C** — Up above the world so high

Phrase A is already in your workspace. Your job is to build B and C, then connect all three in the right order.

## Step 1: Add a Button to Play

From ``||input:Input||``, drag ``||input:on button A pressed||``. Inside it, call ``||functions:twinkle||``, then show a ``||basic:small square||`` when it finishes.

Download and press **A** — you should hear just the first phrase playing.

```blocks
input.onButtonPressed(Button.A, function () {
    twinkle()
    basic.showIcon(IconNames.SmallSquare)
})

// @hide
function twinkle() {
    
}
```

## Step 2: Set Your Radio Group

Find ``||radio:radio set group||`` in ``||basic:on start||``. Change the number to your agreed group — every micro:bit in your pair must use the same number, but different from other pairs in the room.

```blocks
radio.setGroup(1)
music.setBuiltInSpeakerEnabled(true)
basic.showIcon(IconNames.SmallSquare)
```

## Step 3: Explore Phrase A

Find the ``||functions:phraseA||`` function already in your workspace. It:
- Sends radio number **0**
- Shows the letter **A**
- Plays: **C C G G A A G -**

```blocks
function phraseA () {
    radio.sendNumber(0)
    basic.showString("A")
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
```

## Step 4: Create Phrase B

Right-click ``||functions:phraseA||`` and duplicate it. Rename it **phraseB** and change:
- Radio number to **1**
- Show string to **"B"**
- Notes to **F F E E D D C -**

```blocks
function phraseB () {
    radio.sendNumber(1)
    basic.showString("B")
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.UntilDone)
}
```

## Step 5: Create Phrase C

Duplicate again, rename **phraseC** and change:
- Radio number to **2**
- Show string to **"C"**
- Notes to **G G F F E E D -**

```blocks
function phraseC () {
    radio.sendNumber(2)
    basic.showString("C")
    music.play(music.stringPlayable("G G F F E E D - ", 120), music.PlaybackMode.UntilDone)
}
```

## Step 6: Build the Song

Find the ``||functions:twinkle||`` function. It currently only calls ``||functions:phraseA||``.

Add the remaining calls in order: **A B C C A B**

Press **A** again — you should now hear the full song.

```blocks
function twinkle () {
    phraseA()
    phraseB()
    phraseC()
    phraseC()
    phraseA()
    phraseB()
}

// @hide
function phraseA () {}
// @hide
function phraseB () {}
// @hide
function phraseC () {}
```

## Step 7: Download and Test

Download to your micro:bit. Press **A** and listen.

Check that:
- The melody plays through all six phrases without gaps
- The display shows A, B, or C as each phrase plays
- The song ends and the square icon returns

If phrases overlap or cut off, check that every play block is set to **until done**.

## Complete! @showdialog

Your micro:bit is now a conductor — it plays the melody and broadcasts which phrase is playing over radio.

In the next tutorial, a second micro:bit will listen and respond.
