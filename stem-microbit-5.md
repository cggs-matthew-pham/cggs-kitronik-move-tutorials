```template
music.setBuiltInSpeakerEnabled(true)
music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
basic.showIcon(IconNames.SmallSquare)

input.onSound(DetectedSound.Loud, function () {
    basic.showIcon(IconNames.Square)
})
```

## Introduction @showdialog

In this tutorial you will program a micro:bit to play **Twinkle Twinkle Little Star** and broadcast which phrase is playing over radio.

A second micro:bit (or robot) can listen and respond — but first, you need to build the melody.

The song has three distinct phrases:

- **A** — Twinkle twinkle little star
- **B** — How I wonder what you are
- **C** — Up above the world so high

## Step 1: Set Radio Group

From ``||radio:Radio||``, drag ``||radio:radio set group||`` into ``||basic:on start||``. Set it to **1** (or your agreed group number).
Also add ``||basic.showIcon(IconNames.SmallSquare)||``

```blocks
radio.setGroup(1)
music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
basic.showIcon(IconNames.SmallSquare)

input.onSound(DetectedSound.Loud, function () {
    basic.showIcon(IconNames.Square)
})
```

## Step 2: Create Phrase A

Create a new function called **phraseA**.

Inside it:
- Add ``||radio:radio send number 0||``
- Add ``||basic:show string "A"||``
- Add a ``||music:play melody||`` block set to ``||music:until done||``

Enter the notes: **C C G G A A G -**

```blocks
function phraseA () {
    radio.sendNumber(0)
    basic.showString("A")
    music.play(music.stringPlayable("C C G G A A G - ", 120), music.PlaybackMode.UntilDone)
}
```

## Step 3: Create Phrase B

Create a new function called **phraseB**.

Inside it:
- Add ``||radio:radio send number 1||``
- Add ``||basic:show string "B"||``
- Add a ``||music:play melody||`` block set to ``||music:until done||``

Enter the notes: **F F E E D D C -**

```blocks
function phraseB () {
    radio.sendNumber(1)
    basic.showString("B")
    music.play(music.stringPlayable("F F E E D D C - ", 120), music.PlaybackMode.UntilDone)
}
```

## Step 4: Create Phrase C

Create a new function called **phraseC**.

Inside it:
- Add ``||radio:radio send number 2||``
- Add ``||basic:show string "C"||``
- Add a ``||music:play melody||`` block set to ``||music:until done||``

Enter the notes: **G G F F E E D -**

```blocks
function phraseC () {
    radio.sendNumber(2)
    basic.showString("C")
    music.play(music.stringPlayable("G G F F E E D - ", 120), music.PlaybackMode.UntilDone)
}
```

## Step 5: Build the Song

Create a new function called **twinkle**.

Call the phrase functions in order: **A B C C A B**

Each phrase uses ``||music:until done||`` so they play one after another automatically.

```blocks
function twinkle () {
    phraseA()
    phraseB()
    phraseC()
    phraseC()
    phraseA()
    phraseB()
}
```

## Step 6: Play on Button A

From ``||input:Input||``, drag ``||input:on button A pressed||``.

Inside it, call ``||functions:twinkle||``, then show a ``||basic:small square||`` when it finishes.

```blocks
input.onButtonPressed(Button.A, function () {
    twinkle()
    basic.showIcon(IconNames.SmallSquare)
})
```

## Step 7: Download and Test

Download to your micro:bit. Press **A** and listen.

Check that:
- The melody plays through all six phrases without gaps
- The display shows A, B, or C as each phrase plays
- The song ends and the square icon returns

If phrases overlap or cut off, check that every ``||music:play melody||`` block is set to ``||music:until done||``.

## Complete! @showdialog

Your micro:bit is now a conductor — it plays the melody and broadcasts which phrase is playing over radio.

In the next tutorial, a second micro:bit will listen and respond.
