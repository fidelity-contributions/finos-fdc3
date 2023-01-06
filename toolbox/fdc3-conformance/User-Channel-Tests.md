# User Channel Tests  ![1.2](https://img.shields.io/badge/FDC3-1.2-green) ![2.0](https://img.shields.io/badge/FDC3-2.0-blue)

_NB:  User Channels were called System Channels in FDC3 1.2.  The new terminology is used in this specification_


## Basic Broadcast

| App | Step               |Details                                                                           |
|-----|--------------------|----------------------------------------------------------------------------------|
| A   | 1.addContextListener |A adds an _untyped_ Context Listener, and checks that it can unsubscribe it.|
| A   | 2.joinUserChannel     |A joins the first available user channel.|
| B   | 3.joinUserChannel     |B joins the same channel as A. |
| B   | 4.Broadcast          | B broadcasts some `fdc3.instrument` context to the channel. |
| A   | 5.Receive Context    | A receives the instrument object, matching the one broadcast by B.  |

- `UCBasicUsage1` Perform above test 
- `UCBasicUsage2` Perform steps in order: 2,1,3,4,5
- `UCBasicUsage3` Perform steps in order: 3,4,1,2,5
- `UCBasicUsage4` Perform steps in order: 3,4,2,1,5

## Filtered Broadcast

| App | Step               |Details                                                                           |
|-----|--------------------|----------------------------------------------------------------------------------|
| A   | 1.addContextListener |A adds a `fdc3.instrument` _typed_ Context Listener, and checks that it can unsubscribe it.|
| A   | 2.joinUserChannel     |A joins the first available user channel.|
| B   | 3.joinUserChannel     |B joins the same channel as A. |
| B   | 4.Broadcast          | B broadcasts some `fdc3.instrument` context to the channel. |
| A   | 5.Receive Context    | A receives the instrument object, matching the one broadcast by B.  |

- `UCFilteredUsage1` Perform above test 
- `UCFilteredUsage2` Perform steps in order: 2,1,3,4,5
- `UCFilteredUsage3` Perform steps in order: 3,4,1,2,5
- `UCFilteredUsage4` Perform steps in order: 3,4,2,1,5

## Broadcast With Multiple Listeners

| App | Step               | Details                                                                                                     |
|-----|--------------------|-------------------------------------------------------------------------------------------------------------|
| A   | 1.addContextListeners | A sets up two Context Listeners.  One for `fdc3.instrument` and one for `fdc3.contact`.  <br/> Both should be unsubscribable.    |
| A   | 2.joinUserChannel     |A joins the first available user channel.|
| B   | 3.joinUserChannel     |B joins the same channel as A. |
| B   | 4.Broadcast          | B broadcasts an `fdc3.instrument` and an `fdc3.context`.                   |
| A   | 5.Receive Context    | A's `fdc3.instrument` object matches the one broadcast by B, and arrives on the correct listener.<br>A's `fdc3.context` object matches the one broadcast  by B, and arrives on the correct listener.   |

 - `UCFilteredUsage5`: Perform above test
 - `UCFilteredUsage6`: Perform above test, except B will join a _different_ channel to A. Check that you _don't_ receive anything.
 - `UCFilteredUsageChange`: Perform above test, except that after joining, **A** changes channel to a _different_ channel via a further call to `fdc3.joinUserChannel`.  Check that **A** _doesn't_ receive anything.
 - `UCFilteredUsageUnsubscribe`: Perform above test, except that after joining, **A** then `unsubscribe()`s from the channel using the `listener.unsubscribe` function. Check that **A** _doesn't_ receive anything. 
 - `UCFilteredUsageLeave`: Perform above test, except that immediately after joining, **A** _leaves the channel_, and so receives nothing.
 - `UCFilteredUsageJoin`: Perform the above test except that **A** joins a different channel to **B**, and so receives nothing.
 - `UCFilteredUsageNoJoin`: Perform the above test, but skip step 2 so that **A** doesn't join a channel. Confirm that the _current channel_ for **A** is not set before continuing with the rest of the test.  **A** should receive nothing.