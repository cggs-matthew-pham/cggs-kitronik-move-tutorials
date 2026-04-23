# Communication

How the Move and your remote actually talk to each other over radio. The concepts here underpin every tutorial in the series.

## The three levels of addressing

When a micro:bit sends a radio message, anyone nearby can hear it. Three things decide *who acts on the message*:

### 1. Radio group
Set with `radio.setGroup(N)`. N is a number from 0 to 255.

A micro:bit can only listen to one group at a time. Micro:bits on different groups are **completely invisible** to each other.

**Why it's not enough on its own**: in a classroom, multiple pairs all set group 1 and interfere. Switching to group 2, 3, 4 helps but only to a point - groups aren't infinite, and you can't coordinate with 15 pairs.

### 2. Channel (a name you invent)
A text string you include with every message. The receiver checks the channel name before acting.

**Why this helps**: you and your partner agree on a unique name like "Roger" or "TacoBot". You both use it. When your friend's remote sends "TacoBot GO" on the same radio group, your bot sees the channel "TacoBot", compares it to your "Roger", and ignores it.

**Introduced in**: T2 Radio Channels.

### 3. Role (what this device is doing)
A variable on each device - "REMOTE" or "BOT". Each device decides which channel to listen on and what to do with messages based on its role.

**Why this matters**: with channels alone, both devices hear all messages on their channel. That's fine if they only ever do one thing (send commands, or receive commands). But when the bot also sends status messages *back* to the remote, you need a way to stop the bot from reacting to its own status messages. Roles do this.

**Introduced in**: T6 Two-Way Radio with Roles.

## Command channels vs status channels

A nuanced but important design decision in T6.

Instead of one channel for everything, you split into two:

- **channel_commands** (e.g. "Roger_cmd") - messages from remote TO bot
- **channel_status** (e.g. "Roger_status") - messages from bot TO remote

The bot only listens on `channel_commands`. The remote only listens on `channel_status`. Each device ignores the channel it doesn't care about.

**Why this matters**: without split channels, the bot would hear its own status messages and try to interpret them as commands. With split channels, each message goes to exactly the device that should act on it.

## When to use which

### Just the radio group
If you only have one pair, no classroom interference worries, and the bot doesn't need to send messages back - radio group is enough. This is how T1 works.

### Group + channel
For any classroom deployment. Prevents pair interference. This is the minimum for a shared environment. T2 introduces this.

### Group + channel + role
When the bot needs to send status or alerts back to the operator. T6 introduces this.

## Practical tips

**Picking a radio group number**: pick something unusual (73, 144, etc.) rather than 1 or 10. Most pairs default to 1, so you reduce collision chance.

**Picking a channel name**: something distinctive and memorable, not generic. "Pair1" is bad. "Jellyfish" is good. The goal is: if another pair secretly uses your channel name, it's obvious.

**Keep channels unique within your group**: if two pairs happen to pick the same channel name and same radio group, they'll interfere. Always agree on channel names with the class or teacher.

**When something breaks**: check radio group first (no messages at all), then check channel name spelling (messages come through but get ignored), then check role assignment (messages come through and get ignored for the right reason). Capital letters matter. "Roger" and "roger" are different.

## Scenario tie-ins

**Patrol and alert scenarios**: need command channel + status channel. The bot reports what it sees.

**Delivery scenarios**: need command channel. Status channel is optional - nice to confirm delivery but not essential.

**Detection scenarios**: need status channel especially. The bot runs autonomously, status is how it tells you anything happened.

**Remote operation scenarios**: need command channel. Status is unnecessary - you can see what the bot is doing.

**Mixed autonomy**: need both channels. Classic two-way communication.

## Tutorial references

- T1 Radio Remote Control - introduces radio group and basic send/receive
- T2 Radio Channels - adds channel filtering
- T6 Two-Way Radio with Roles - adds split channels and role-based listening
