# From Big to Small

You've picked a scenario. The problem is, "build a bot that checks the school for spills" isn't something you can code directly - it's way too abstract. This guide walks you through breaking big ideas into small buildable pieces.

## The decomposition process

Three layers, in this order:

**1. Scenario** - the real-world story ("my bot finds spills in the canteen")
**2. Behaviours** - what the bot actually does ("drives a route, detects something different, alerts me")
**3. Techniques** - the code patterns that achieve each behaviour ("line-follow, ultrasonic trigger, radio status")

Most students try to jump from scenario straight to code and get stuck. Moving through behaviours in between is where the design thinking happens.

## Worked example: Spill detector

### Step 1: Write the scenario in one sentence
"My bot patrols the canteen looking for spills and alerts the cleaner when it finds one."

That's the scenario. Not codeable yet.

### Step 2: List the concrete behaviours
What does the bot *actually do*? Write these as verbs - things the bot performs.

- Drives around the canteen floor
- Recognises when it sees a spill
- Tells the cleaner when it finds one
- Can be stopped/started by the cleaner
- Returns to base when done (optional)

Each line is a behaviour. You now have 4-5 small problems instead of one big one.

### Step 3: Match each behaviour to a technique
For each behaviour, ask: "which tutorial (or combination) solves this?"

| Behaviour | Technique | Tutorial |
|---|---|---|
| Drives around | Line-follow on a fixed route | T4 |
| Recognises a spill | Stand-in: ultrasonic detects an obstacle representing the spill | T6 pattern |
| Tells the cleaner | Bot sends HELP status | T6 |
| Stopped/started by cleaner | Remote sends STOP, FOLLOW commands | T1, T3 |
| Returns to base | Reverse line-follow, or manual drive back | T3 state or T5 command |

Now each behaviour has a tutorial that addresses it. Your project plan writes itself: T1-T4 + T6 covers everything, T5 is optional.

### Step 4: Plan the order to build in
**Don't try to build it all at once.** Build one behaviour, test it, then add the next.

Good order for this scenario:

1. Get basic drive + stop working (T1) - 1 lesson
2. Add channels so you don't interfere (T2) - 1 lesson
3. Add line-follow so the bot patrols autonomously (T4) - 1 lesson
4. Add the ultrasonic trigger so the bot alerts on obstacle (T6) - 1 lesson
5. Test the whole thing end-to-end - 1 lesson

Each lesson has a clear success criterion. If a lesson fails, you know exactly which step broke.

## The "stand-in" trick

Some behaviours can't be implemented literally with the hardware. That's where stand-ins come in.

**The bot can't actually see a spill.** There's no camera. No colour sensor. So what do you do?

You use a **stand-in**: something the Move *can* sense, representing the thing it can't.

- Spill represented by **a dark patch on the line** (line sensor sees it)
- Spill represented by **a small obstacle** (ultrasonic sees it)
- Spill represented by **reaching a specific point on the line** (you count line crossings)

Stand-ins are not cheating - they're how real design thinking works. You simulate the thing you can't directly build, and you explain the stand-in clearly in your project documentation.

See the **Movement guide** for what the Move can actually detect, and the **Communication guide** for how to represent detection events.

## Worked example: Medical supply delivery

### Step 1: Scenario
"My bot delivers medical supplies to three different rooms in a hospital, triggered by a nurse at a central station."

### Step 2: Behaviours
- Waits for a delivery request
- Receives a destination (Room 1, 2, or 3)
- Navigates to the right room
- Confirms arrival to the sender
- Returns to base
- Can be recalled at any time

### Step 3: Techniques

| Behaviour | Technique | Tutorial |
|---|---|---|
| Waits for request | State = STOP, forever loop does nothing | T3 |
| Receives destination | Menu-driven command from remote | T5 |
| Navigates to right room | Line-follow different branches (tricky - see notes) | T4 + stand-in |
| Confirms arrival | Bot sends ARRIVED when at destination | T6 |
| Returns to base | Operator sends REVERSE or FOLLOW again | T3/T5 |
| Recallable | Operator sends STOP | T1 |

### Step 4: Stand-in for different rooms

The Move can't navigate a real branching hospital floor. But it *can* follow a line that represents Room 1, 2, or 3 by using:

- A single straight line track
- Markers (obstacles) at different distances representing each room
- Bot counts markers: 1st marker = Room 1, 2nd = Room 2, etc.

Or:

- Different patrol routes, each a different line pattern
- Operator sends "go to Room 1" = follow route 1

These are design decisions, not hardware limitations. Different designs give different experiences.

### Step 5: Build order
1. Get drive + stop + channels working (T1-T2)
2. Add the menu for command choice (T5)
3. Add line-follow (T4)
4. Add arrival detection via ultrasonic (T6) - triggered by stand-in obstacles
5. Test end-to-end

Five clear milestones. Each one can be tested before moving on.

## Tips for decomposition

**Be specific about behaviours.** "Bot helps elderly people" is too abstract. "Bot delivers a water bottle to a chair" is buildable.

**Count the commands your bot needs.** If more than 3, you probably want T5 (cycle-and-select). If 3 or fewer, buttons are enough.

**Count the things the bot needs to report.** If 0, you don't need T6 (two-way radio). If more than 0, you do.

**Ask: does the bot decide anything on its own?** If yes, you need T3 state pattern and probably T4 line-follow. If no, you're in remote-operation territory and can skip them.

**Write success criteria for each behaviour.** "Bot follows line" is vague. "Bot follows a line of black electrical tape on white paper at speed 40 without leaving it for 30 seconds" is testable.

## Common decomposition mistakes

### "I'll build it all at once"
You won't. You'll get halfway through and discover something doesn't work, and you won't know which part is broken.

### "I'll start with the exciting part"
Start with the boring part - basic drive and stop. Get the bones working. The exciting behaviours plug in on top.

### "I'll skip the tutorials and figure it out myself"
The tutorials encode design patterns that took people a long time to work out. Using them isn't cheating - it's standing on shoulders.

### "My scenario needs a feature the Move can't do"
Use a stand-in. Document the stand-in clearly. Design around what the hardware *can* do.

## Tutorial references

- T1-T6 Radio tutorials - the techniques you'll combine
- See **Choosing Your Techniques** for scenario-family matching
- See **Combining Techniques** for patterns of combination
- See **Communication** and **Movement** for what each layer can actually do
