Custom Breakthrough by andy6170 Version 3.0
================================================================================================================

Ready to play:
Breakthrough Template: zfxyv
Night Ops Breakthrough: 1ytr3


Included is the full package to get you started.
The 3 folders contain the full content for Custom Conquest.

Godot Spatial Editor Scene:
This includes the tscn level for Godot. Extract the file to:
GodotProject\levels


Exported Maps:
There are instances where copying the experience may not keep the map attached.
If this happens you an use the included JSON map already exported and upload it to the portal website.


Portal Blocks:
When some people open the experience link they are unable to see the blocks.
If this happens you can import the included JSON of the template onto the Portal website within the block editor.


IbjID Assignment:
+-------------+----------+----------+----------+----------+--------------+
| Item        | Sector 0 | Sector 1 | Sector 2 | Sector 3 | Final Sector |
+-------------+----------+----------+----------+----------+--------------+
| Sector      | 100      | 101      | 102      | 103      | 104          |
| Area Trigger| 600      | 601      | 602      | 603      | 604          |
| Objective A | N/A      | 1100     | 1200     | 1300     | N/A          |
| Objective B | N/A      | 1101     | 1201     | 1301     | N/A          |
| Team1 HQ    | N/A      | 301      | 302      | 303      | N/A          |
| Team2 HQ    | N/A      | 401      | 402      | 403      | N/A          |
| Vehicles    | N/A      | 1150-1199| 1250-1299| 1350-1399| N/A          |
| TeamSwitcher| 998      | N/A      | 999      | N/A      | N/A          |
| VFX         | 2000-2999| N/A      | N/A      | N/A      | N/A          |
| Push Back   | 700      | N/A      | N/A      | N/A      | N/A          |
| End Game Cam| 950      | N/A      | N/A      | N/A      | N/A          |
+-------------+----------+----------+----------+----------+--------------+


Notes about AI:
If playing Premium maps, the default (backfill/static) bots are recommended.
If playing RedSec maps, use the custom bots as they will play all objectives where the default are bugged.
As backfill are limited to 12 bots, custom bots to bypass this.

To use custom bots:
Turn off backfill and static AI.
Unable Custom blocks in the Block Editor at the top of the MOD.
These will fill in the spare player count up to 100. 
So if you have 64 player slots, then 36 bots will join.
The less player slots, the more bots.
When hosting locally, adding too many bots will slow down the game so I recommend setting to 60 if you plan to host locally.


Known Issues:
Some areas of maps have no hit detection. You must add a Combat Area around the play area to prevent the hit registration failing.
The F16 is not detected correctly (this is a game bug) and will trigger the out of bounds.
When hosting locally the scoreboard will break when changing team. If hosted on a server it will work correctly.
Vehicles spawn on the map and cannot be selected from the spawn menu.
Default bots do not work on RedSec maps if you have more than 1 Objective per sector. Custom AI has been added to address this.
VFX will only render for players at the start of a game. This is being investigated


================================================================================================================
================================================================================================================

Update Changes:


INFO REGARING BOTS:
If playing Premium maps, the default (backfill/static) bots are recommended.
If playing RedSec maps, use the custom bots as they will play all objectives where the default are bugged.
As backfill are limited to 12 bots, you can use custom bots to bypass this for a PvE experience.

V3.0

- Updated Spatial files for SDK 1.3.3.0
- Added Breakthrough prefab with 5 sectors and 3 objective per sector
- New "NightMode" toggle to make all maps have night
- New "RandomDayNight" toggle added to randomly choose time of day
- Added "RandomNightPercentage" setting to let you control the chance of night
- Bots will equip torches when night is enabled (except recon)
- New End Game camera (ObjID 950)
- Added toggle to give players Gas Masks
- Added toggle to give NVG to players
- Air Combat now uses default game logic with the Surrounding Combat Area
- HQs can now be linked to the sector and colours will be managed by the game
- Capture Points will automatically be assigned to team 2
- Retreating enemies will now be pinged
- Player capture UI update rate changed from 0.1 to .015 to reduce performance impact when high number of players are on points
- New "invisible wall" Area Trigger 700 will push players back
- Player UI is now toggled instead of being created and destroyed
- Custom AI will spawn in quicker at the start of the game
- Custom AI will skip mandown if no one is nearby
- Custom AI instructions only apply to custom bots
- Mixing default and custom bots no longer gives default bots double health
- UI no longer flickers when players join
- VO added for capture point events

New Maps:
- Operation Metro (Bellum1988)
- Cairo Bazaar
- Golmud Railway
- Hagental Base
- Contaminated
- Mirak Valley

IMPORTANT NOTES:
- You must add a Combat Area around the play area to prevent the hit registration failing.


================================================================================================================
================================================================================================================

Previous Changes:

V2.0

- New Map: Manhattan (New layout with beach landing)
- Air Combat logic added. Add an Area Trigger with ObjID 8000
- Team Switcher added from the Conquest Template
- Stationaries are now supported and run on the same ObjID range as Vehicles
- Players will now have Unique UI IDs assigned when joining so no more UI conflict
- UI Overhaul including new capture flash animation
- VO added
- SFX adjusted for capturing to mono sound
- General performance improvements
- Added Snow toggle
- Added Colour Filters
- Added auto VFX enablement. Range is 2000-2999

Complete rework for Season 2:
- Updated Spatial files for SDK 1.2.2.0
- Enter/Exit Capture Point Logic does not trigger when dying or revived so additional logic added for this to enable/disable UI
- Downed players are counted as on point so additional logic required to filter them out
- Enter/Exit Capture point still active when an objective is disabled. Additional check added to detect if capture point is active
- Enter/Exit Capture point not triggered when an objective is disabled. Custom AI need to be manually updated on sector change to scout
- Out of Bounds rebuilt to support Air Combat logic
- Capture Points will track their capture progress and calculate UI data for both teams
- Player UI on capture points now pulls pre calculated UI data to improve performance
- Capture points will only track variable data while being captured and active to improve performance
- Custom bots logic reworked and overhauled
- Rebalanced the Audio Levels of SFX
- Prevent default AI from deploying before game is ready




V1.1
- Attacking AI will now react more when an objective is being taken under their control
- New map Downtown has been added (Carrier and Landing Craft provided by Kurt)
- Added vehicle clean up toggle to destroy unoccupied vehicles when the sector changes
- Changing sector UI will now present in redeploy screen

