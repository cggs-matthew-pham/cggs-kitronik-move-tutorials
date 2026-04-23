# Choosing Your Techniques

Your scenario doesn't need every tutorial. Most scenarios fit into one of five families, each with a different set of tutorials that matter.

Pick the family that fits your idea. Focus on the tutorials listed. Ignore the rest unless you want to.

## 1. Patrol and Alert

The bot moves along a path and reports what it sees.

**Examples:**
- Snake spotter on bushwalks
- Perimeter check for school buildings
- Leaking pipe detector in a plant room
- Spill detection in a canteen
- Fence line inspection on a farm

**How it works:** the bot drives or line-follows a route. When the ultrasonic sensor sees something, the bot sends a message back to the operator.

**Tutorials you need:**
- **T1 Radio Remote Control** - basic communication
- **T2 Radio Channels** - so your pair doesn't interfere with others
- **T3 State and Forever Loop** - continuous behaviour
- **T4 Adapting Line Following** - so the bot can patrol autonomously
- **T6 Two-Way Radio with Roles** - the bot reports to you

**Tutorials you don't need:**
- T5 Cycle-and-Select (a simple start/stop remote is fine - you're not issuing many different commands)

## 2. Delivery and Retrieval

The bot moves to a destination, possibly carries something, returns.

**Examples:**
- Grocery fetch from different aisles
- Medical supply delivery to hospital rooms
- Tool delivery to workstations
- Library book return between sections
- Mail between classrooms

**How it works:** you select a destination on the remote, send the command, the bot follows a line to get there, and stops (or confirms arrival).

**Tutorials you need:**
- **T1-T4** - core techniques for remote-triggered movement
- **T5 Cycle-and-Select Controller** - different destinations = different menu items
- **T6 Two-Way Radio** (optional) - if you want the bot to confirm it arrived

**Tutorials you don't need:**
- None strictly, but if your scenario only has *one* destination, you can skip T5

## 3. Detection and Response

The bot operates autonomously and reacts to what it detects.

**Examples:**
- Animal presence detection in bushland
- Finding dropped items on a warehouse floor
- Automatic obstacle mapping
- Colour-change detection (with line sensors)
- Temperature hotspot finding

**How it works:** the bot moves around (line-follow or patrol pattern), and when the sensors detect something, the bot changes behaviour automatically - maybe stops, maybe backs up, maybe sends an alert.

**Tutorials you need:**
- **T1-T4** - core techniques
- **T6 Two-Way Radio with Roles** - essential for sensor-triggered alerts back to the operator

**Tutorials you don't need:**
- T5 Cycle-and-Select (the bot is mostly autonomous, you don't need many commands)

## 4. Remote Operation

A human driver controls the bot from a distance to do a task the bot can't decide on its own.

**Examples:**
- Cleaning a floor (you decide where)
- Exploring under desks or in confined spaces
- Bomb disposal simulation
- Investigation of hazardous areas
- Performance or demonstration (dancing, choreographed movement)

**How it works:** the operator holds the remote and drives the bot manually with a rich command palette. The bot just listens.

**Tutorials you need:**
- **T1 Radio Remote Control** - core
- **T2 Radio Channels** - no interference
- **T5 Cycle-and-Select Controller** - rich command palette

**Tutorials you don't need:**
- T3 State pattern (optional - useful if you want continuous behaviours)
- T4 Line Following (you're driving, not following a line)
- T6 Two-Way Radio (the bot doesn't need to report back)

## 5. Mixed Autonomy

The bot operates mostly independently but hands control back when needed.

**Examples:**
- Autonomous vehicle simulation with manual override
- Supervised inspection (bot scans, you intervene)
- Robot pet that asks for help when stuck
- Semi-autonomous cleaning (bot cleans, you redirect)
- Tourist guide robot (bot runs a route, stops on cue)

**How it works:** the bot line-follows or patrols by default. Sensors trigger alerts. The operator can override at any time with a rich command set. Both directions are in play.

**Tutorials you need:**
- **All of them** - this is the most complex scenario type

## How this maps to your assessment

For **Criterion Cii** (demonstrating technical skills):

- Getting to T4 and applying it thoughtfully to your scenario is a solid **5-6**
- Including T5 or T6 content, applied properly to your scenario, gets you into **7-8**

The key phrase is "applied to your scenario." Copy-pasting T5's menu when your project only has two commands isn't *using* T5 well - it's using it unnecessarily. Rewriting T5's menu with three commands specific to your scenario *is* using it well, even though you've technically done less.

Pick the techniques that match your scenario. Leave out the ones that don't.

## Still not sure which family fits?

Ask yourself:

- **Does the bot move along a fixed path?** → Patrol / Delivery / Detection
- **Does the bot move to different destinations?** → Delivery
- **Does the user decide where the bot goes?** → Remote Operation / Mixed Autonomy
- **Does the bot need to tell me what it sees?** → Patrol / Detection / Mixed Autonomy
- **Can the bot decide on its own when to do something?** → Detection / Mixed Autonomy

If your scenario is a mix of two families, pick the one that covers the bigger half of the project. The tutorials overlap - starting with one family doesn't lock you out of the other.
