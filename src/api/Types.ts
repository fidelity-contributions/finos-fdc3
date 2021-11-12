/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2019 FINOS FDC3 contributors - see NOTICE file
 */

import { AppMetadata } from '..';
import { Context } from '../context/ContextTypes';

/**
 * Operations that target apps (like open or raiseIntent) can identify
 * an app just by by its name, or pass full app metadata, giving the
 * desktop agent more information about the targeted app.
 */
export type TargetApp = string | AppMetadata;
/**
 * Describes a callback that handles a context event.
 * Used when attaching listeners for context broadcasts.
 */
export type ContextHandler = (context: Context) => void;
/**
 * Describes a callback that handles a context event and may return a
 * promise of a Context object to be returned to the application that
 * raised the intent.
 * Used when attaching listeners for raised intents.
 */
export type IntentHandler = (context: Context) => Promise<Context> | void;
