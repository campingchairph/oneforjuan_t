# ONEforJuan — UI Spec & Claude Code Setup
> Master reference for all UI builds. Edit this file to update specs. Never delete sections — mark as `[DONE]` or `[REVISED]`.

---

## Project Info
- **Repo:** https://github.com/campingchairph/oneforjuan_t
- **GitHub Pages:** https://campingchairph.github.io/oneforjuan_t
- **Local path:** `C:\Users\josep\OneDrive\Documents\GitHub\oneforjuan`
- **Files:** `oneforjuan.html` / `oneforjuan.css` / `oneforjuan.js` — always separate, never merge

---

## Claude Code Setup

### First time
```bash
cd C:\Users\josep\OneDrive\Documents\GitHub\oneforjuan
claude
```

### Session starter — paste this every new Claude Code session
```
Project: ONEforJuan — Filipino favor/task marketplace
Files: oneforjuan.html / oneforjuan.css / oneforjuan.js — NEVER merge
Rules:
- CHANGE blocks only, never full files unless I say "give me the full file"
- One task per message
- No single quotes inside onclick="" strings
- No template literals with && inside innerHTML
- No min-height:100vh (use height:100vh;overflow:hidden)
- Ask before any change that affects more than one file
Spec file: oneforjuan-ui-spec.md (source of truth for all UI)
```

### Deploy after changes
```bash
git add .
git commit -m "your message"
git push
```

---

## Stack
- Plain HTML / CSS / JS — no frameworks, no JSX, no React
- Deploy: GitHub Pages (oneforjuan.html renamed to index.html in repo)
- Pixel art font: `Press Start 2P` (Google Fonts)
- Body font: `DM Sans` (Google Fonts)

---

## Design System

### Vibe
Stardew Valley — Spring season, daytime. Warm, cute, simple, 8-bit pixel art.
No complex UI. If a screen needs more than 5 UI elements, ask first.

### Palette
```
--bg:         #F2EDD7   warm parchment (main background)
--surface:    #FFFDF4   white-ish card surface
--card:       #FFFFFF
--border:     #D6CCB0
--border-soft:#E8E2CC

--ink:        #5C3D1E   dark soil brown (primary text)
--ink-mid:    #7A5C38
--ink-soft:   #A08060
--ink-faint:  #C4AA88

--green:      #5BA85A   grass green (success, accept)
--green-bg:   #EAF4E8
--green-dark: #3D7A3C

--sun:        #F4A62A   sunflower yellow (accent, post)
--sun-light:  #FEF3D0
--sun-dark:   #B87010

--sky:        #87CEEB   spring sky (map bg, highlights)
--pink:       #F2A7BB   soft spring pink (badges, tags)

--ember:      #D95F3B   warm red (warning, fail, report)
--ember-light:#FDEEE8
--ember-dark: #A03A20

--night:      #2C1810   near-black for pixel borders
--px: 'Press Start 2P', monospace
```

### Typography
```
Headings:     Press Start 2P, 8-10px, --ink
Labels:       Press Start 2P, 6-7px, --ink-soft, letter-spacing: 1-2px
Body:         DM Sans, 13-14px, --ink
Small:        DM Sans, 11-12px, --ink-soft
```

### Pixel Border Style (use on cards + buttons)
```css
border: 2px solid var(--night);
box-shadow: 3px 3px 0 var(--night);
border-radius: 4px; /* keep low — pixel style */
```

### Buttons
```
Primary (Post/Accept): --sun bg, --night border, 3px pixel shadow
Success (Confirm):     --green bg, --night border, 3px pixel shadow
Danger (Report/Cancel):--ember bg, --night border, 3px pixel shadow
Ghost:                 --surface bg, --border border, no shadow
All buttons: Press Start 2P font, 8px, uppercase
```

### Cards
```
bg: --surface
border: 2px solid --border
box-shadow: 3px 3px 0 --border (pixel style)
border-radius: 6px
padding: 14px 16px
```

### Badge System
Badges replace character levels. Trust is gained/lost via badge points.
```
🌱 Baguhan       0–99 pts     (newcomer)
🌼 Kapit-bahay   100–299 pts  (neighbor)
🌻 Tapat         300–699 pts  (trusted)
⭐ Pinagkakatiwalaan 700–1499 pts (reliable)
🏅 Bayani        1500+ pts    (legend)

+pts: favor completed, good review
-pts: favor failed, no-show, reported
Ban: confirmed bad/illegal report
```

---

## App Structure

### Bottom Nav (4 tabs)
```
🏠 Home     → s-home     (map + nearby favors feed)
📋 Activity → s-activity  (My Requests / My Favors tabs) + notif dot
🏅 Badges   → s-badges    (profile + reputation + history)
⚙️ Settings → s-settings
```

### Screen List
```
s-splash        Splash screen
s-onboard       Onboarding (2 slides)
s-verify        ID verification (no character builder)
s-home          Home: map + favor feed + Post button
s-post          Post a Favor form (sheet)
s-favor-detail  Favor detail sheet (view + accept)
s-activity      My Requests / My Favors tabs
s-badges        Badge profile page
s-report        Report a favor/user (sheet)
s-settings      Settings
```

---

## Screens

---

### s-splash `[ ]`
- Dark spring night → fade to morning sky
- Pixel art logo: `ONEforJuan`
- Tagline: `Favors. Community. Trust.`
- Auto-advance to s-onboard after 2s
- Stars fade out as sky brightens

---

### s-onboard `[ ]`
- 2 slides, swipeable, progress dots
- Slide 1: 🌻 "Ask for a favor" — post what you need, set your offer
- Slide 2: 🏅 "Do a favor, earn trust" — accept, complete, gain badge points
- CTA: `START →` goes to s-verify
- Style: warm spring morning, pixel art illustration per slide (simple SVG)

---

### s-verify `[ ]`
- Single screen, no steps/stepper
- Upload ID photo (one input)
- Enter name + birthdate
- CTA: `SUBMIT FOR REVIEW →`
- Info box: "Verification takes 24hrs. You'll get notified."
- No character builder. No avatar.

---

### s-home `[ ]`
Main screen. Two parts stacked:

**Top: Mini map (fixed 180px height)**
- Spring green pixel map bg (CSS, no real map API yet)
- Pixel art pins for nearby favors
- Sky blue top strip
- User location pin: `YOU`

**Bottom: Favor feed (scrollable)**
- Section label: `FAVORS NEAR YOU · X km`
- Favor cards (see Favor Card spec below)
- Floating `＋ POST A FAVOR` button (bottom right, --sun color)

**Favor Card (in feed)**
```
[emoji] Title of favor               ₱ Offer
        📍 Barangay · X.Xkm · ⏱ posted Xm ago
        [badge icon] Username · 🌻 Tapat
```
- Tap → opens s-favor-detail sheet
- No full item list shown in feed — summary only
- Pixel border style

---

### s-post (sheet) `[ ]`
Bottom sheet. Slides up over home.

Fields:
- Favor title (text, max 60 chars)
- Description (textarea, max 200 chars)
- Offer amount (₱ number input)
- Where (landmark / place name text)
- When (date/time picker or text)
- Category chips (single select):
  `🛍️ Errand` `🐕 Pet` `🎂 Food` `🧑‍🤝‍🧑 Company` `📄 Gov't` `🎉 Event` `🔧 Help` `❓ Other`

CTA: `POST FAVOR →` (--sun button)
Note below: "Offer is final. First to accept gets the quest."

---

### s-favor-detail (sheet) `[ ]`
Bottom sheet. Opens from feed card tap.

Shows:
- Title + category emoji
- Posted by: [badge] Username
- Description
- Offer: ₱XXX (large, --sun color, Press Start 2P)
- Where + When
- `✅ ACCEPT FAVOR →` (--green button)
- `🚩 Report` link (small, bottom)

If user is the poster: show `❌ CANCEL FAVOR` instead of accept.
If favor already taken: show `TAKEN` badge, no accept button.

---

### s-activity `[ ]`
Two tabs: `MY REQUESTS` | `MY FAVORS`

**MY REQUESTS** — favors I posted
```
[status badge] Title · ₱Offer
Active / Waiting / Completed / Cancelled
```

**MY FAVORS** — favors I accepted
```
[status badge] Title · ₱Offer
Accepted / Done / Failed
```

Status badges:
- Active: --green
- Waiting: --sun
- Completed: --sky (blue)
- Failed/Cancelled: --ember

Notification dot on nav tab if any active item exists.

---

### s-badges `[ ]`
- Username + current badge (large emoji + name)
- Badge points: `XXX pts` (Press Start 2P, --sun)
- Progress bar to next badge (pixel style)
- Badge history: list of earned/lost events
  ```
  ✅ +10pts  Completed "Buy milo"       2d ago
  ❌ -20pts  Failed "Dog walk"          5d ago
  ```
- Total favors done / posted stats

---

### s-report (sheet) `[ ]`
- Triggered from `🚩 Report` in favor detail
- Radio options:
  `Illegal request` `Scam / Fraud` `No-show` `Inappropriate` `Other`
- Optional description (textarea)
- CTA: `SUBMIT REPORT →` (--ember button)
- Note: "Confirmed reports result in permanent ban."

---

### s-settings `[ ]`
- Name / contact (display only)
- Notification toggle
- Radius selector: `10km / 15km / 20km`
- `LOG OUT` button
- App version (Press Start 2P, tiny, bottom)

---

## Known Bugs to Avoid
```
- Missing </div> on #app → blank screen
- min-height:100vh → all screens render simultaneously
  (use height:100vh; overflow:hidden)
- Single quotes inside onclick="..." → silent JS crash
- Template literals with && inside innerHTML → silent crash
- JS function name collision (e.g. buildStars defined twice)
- JSX syntax accidentally introduced → silent crash
- Mobile side gaps → @media(max-width:480px){#app{max-width:100%}}
```

---

## Status Tracker
```
s-splash          [ ] not started
s-onboard         [ ] not started
s-verify          [ ] not started
s-home            [ ] not started
s-post            [ ] not started
s-favor-detail    [ ] not started
s-activity        [ ] not started
s-badges          [ ] not started
s-report          [ ] not started
s-settings        [ ] not started
Design tokens      [ ] not started
Base CSS           [ ] not started
JS state/routing   [ ] not started
```
