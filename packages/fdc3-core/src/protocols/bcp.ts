/**
 * Browser Communication Protocol (BCP) is used for communication between the "@kite9/fdc3" library and Browser-Resident DAs.
 */
import { Context } from "../context/ContextTypes";
import { ContextType } from "../context/ContextType";
import { AppIdentifier } from "../api/AppIdentifier";
import { AppMetadata } from "../api/AppMetadata";
import { AppIntent } from "../api/AppIntent";
import { ImplementationMetadata } from "../api/ImplementationMetadata";
import { DisplayMetadata } from "../api/DisplayMetadata";
import { ContextMetadata } from "../api/ContextMetadata";

type BCPMeta = {
	messageId: string;
};

/**
 * Messages initiated by DA (inbound)
 */

export type BCPBroadcastInbound = {
	type: "BroadcastInbound";
	payload: {
		context: Context;
		channel?: string;
	};
	meta: BCPMeta;
};

// Sent from library to DA, and then also received by library from DA
export type BCPIntentResult = {
	type: "raiseIntentResult";
	payload: {
		context?: Context;
		channel?: {
			channelId: string;
			type: "user" | "app" | "private";
		};
		// This will match the responseId from a previous BCPRaiseIntentResponse message
		responseId: string;
	};
	meta: BCPMeta;
};

// Increment subscriber count
export type BCPPrivateChannelOnAddContextListener = {
	type: "privateChannelOnAddContextListener";
	payload: {
		channelId: string;
		contextType?: string;
	};
	meta: BCPMeta;
};

export type BCPPrivateChannelOnDisconnect = {
	type: "privateChannelOnDisconnect";
	payload: {
		channelId: string;
	};
	meta: BCPMeta;
};

// Decrement subscriber count
export type BCPPrivateChannelOnUnsubscribe = {
	type: "privateChannelOnUnsubscribe";
	payload: {
		channelId: string;
		contextType?: string;
	};
	meta: BCPMeta;
};

export type BCPRaiseIntentInbound = {
	type: "raiseIntentInbound";
	payload: {
		intent: string;
		context: Context;
		metadata?: ContextMetadata;
		responseId: string; // generated by DA
	};
	meta: BCPMeta;
};

/**
 * Messages responses from DA
 */

export type BCPAck = {
	type: "ack";
	payload: {
		error?: string;
	}
	meta: BCPMeta;
}

export type BCPCreatePrivateChannelResponse = {
	type: "createPrivateChannelResponse";
	payload: {
		channel: {
			channelId: string;
			type: "private";
			displayMetadata?: DisplayMetadata;
		}
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPFindInstancesResponse = {
	type: "findInstancesResponse";
	payload: {
		instances: Array<AppIdentifier>;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPFindIntentResponse = {
	type: "findIntentResponse";
	payload: {
		appIntent?: AppIntent;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPFindIntentsByContextResponse = {
	type: "findIntentsByContextResponse";
	payload: {
		appIntents: Array<AppIntent>;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPGetAppMetadataResponse = {
	type: "getAppMetadataResponse";
	payload: {
		appMetadata?: AppMetadata;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPGetCurrentChannelResponse = {
	type: "getCurrentChannelResponse";
	payload: {
		// Channel will be undefined if not on a current channel
		channel?: {
			id: string;
			displayMetadata?: DisplayMetadata;
		}
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPGetCurrentContextResponse = {
	type: "getCurrentContextResponse";
	payload: {
		// context will be undefined if no current context
		context?: Context;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPGetInfoResponse = {
	type: "getInfoResponse";
	payload: {
		implementationMetadata: ImplementationMetadata;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPGetOrCreateChannelResponse = {
	type: "getOrCreateChannelResponse";
	payload: {
		channel: {
			channelId: string;
			type: "user" | "app" | "private";
			displayMetadata?: DisplayMetadata;
		}
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPGetUserChannelsResponse = {
	type: "getUserChannelsResponse";
	payload: {
		channels: Array<{
			id: string;
			displayMetadata?: DisplayMetadata;
		}>;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPOpenResponse = {
	type: "openResponse";
	payload: {
		appIdentifier: AppIdentifier;
	} | {
		error: string;
	};
	meta: BCPMeta;
};

export type BCPRaiseIntentResponse = {
	type: "raiseIntentResponse";
	payload: {
		data: {
			source: AppMetadata;
			intent: string;
			version?: string;
			// Use this to match up future inbound BCPRaiseIntentResult messages
			responseId: string;
		};
	} | {
		error: string;
	};
	meta: BCPMeta;
};

/**
 * Messages initiated by client (outbound)
 */

export type BCPAddContextListener = {
	type: "addContextListener";
	payload: {
		contextType: ContextType;
		// Set if the listener was added to a specific channel
		channel?: string;
	};
	meta: BCPMeta;
};

export type BCPAddIntentListener = {
	type: "addIntentListener";
	payload: {
		intent: string;
	};
	meta: BCPMeta;
};

export type BCPBroadcast = {
	type: "broadcast";
	payload: {
		context: Context;
		channelId?: string;
	};
	meta: BCPMeta;
};

export type BCPCreatePrivateClient = {
	type: "createPrivateClient";
	meta: BCPMeta;
};

export type BCPFindInstances = {
	type: "findInstances";
	app: AppIdentifier;
	meta: BCPMeta;
};

export type BCPFindIntent = {
	type: "findIntent";
	payload: {
		intent: string;
		context?: Context;
		resultType?: string;
	};
	meta: BCPMeta;
};

export type BCPFindIntentsByContext = {
	type: "findIntentsByContext";
	payload: {
		context?: Context;
		resultType?: string;
	};
	meta: BCPMeta;
};

export type BCPGetAppMetadata = {
	type: "getAppMetadata";
	payload: {
		app: AppIdentifier;
	}
	meta: BCPMeta;
};

export type BCPGetCurrentChannel = {
	type: "getCurrentChannel";
	meta: BCPMeta;
};

export type BCPGetCurrentContext = {
	type: "getCurrentContext";
	payload: {
		contextType?: string;
		channelId?: string;
	};
	meta: BCPMeta;
};

export type BCPGetInfo = {
	type: "getInfo";
	meta: BCPMeta;
};

export type BCPGetOrCreateChannel = {
	type: "getOrCreateChannel";
	payload: {
		channelId: string
	}
	meta: BCPMeta;
};

export type BCPGetUserChannels = {
	type: "getUserChannels";
	meta: BCPMeta;
};

export type BCPJoinUserChannel = {
	type: "joinUserChannel";
	payload: {
		channelId: string;
	};
	meta: BCPMeta;
};

export type BCPLeaveCurrentChannel = {
	type: "leaveCurrentChannel";
	meta: BCPMeta;
};

export type BCPOpen = {
	type: "open";
	payload: {
		app: AppIdentifier | string;
		context?: Context;
	};
	meta: BCPMeta;
};

export type BCPPrivateChannelDisconnect = {
	type: "privateChannelDisconnect";
	payload: {
		channelId: string;
	};
	meta: BCPMeta;
};

export type BCPRaiseIntent = {
	type: "raiseIntent";
	payload: {
		intent: string | null;
		context: Context;
		app?: AppIdentifier;
	};
	meta: BCPMeta;
};

export type BCPRaiseIntentForContext = {
	type: "raiseIntentForContext";
	payload: {
		context?: Context;
		app?: AppIdentifier
	};
	meta: BCPMeta;
};

export type BCPRemoveContextListener = {
	type: "removeContextListener";
	payload: {
		contextType?: ContextType;
		channel?: string;
	};
	meta: BCPMeta;
};

export type BCPRemoveIntentListener = {
	type: "removeIntentListener";
	payload: {
		intent: string;
	};
	meta: BCPMeta;
};

/**
 * Library provided UI messages
 */

// Sent from DA to App when an intent needs resolution and it does
// not have the ability to provide a graphical intent resolver
export type BCPResolveIntent = {
	type: "resolveIntent",
	payload: {
		// The intent to resolve
		intent: {
			name: string;
			displayName: string;
		};

		// If raiseIntentForContext
		context?: Context;

		// The DA provided list of launchable apps which may resolve this intent type
		launchableApps: {
			meta: AppMetadata;
			appId: string;
		}[];

		// The DA provided lists of open apps which are registered to receive this intent type
		openApps: {
			meta: AppMetadata;
			instanceId?: string;
		}[];

		// the originatingAppName may be displayed by the UI Resolver to indicate the source of the request.
		originatingAppName?: string;
	};
	meta: BCPMeta;
}

// Response from App to DA with intent resolution
export type BCPResolveIntentResponse = {
	type: "resolveIntentResponse",
	payload: {
		error?: string;

		// appId is set if intent should be delivered to a launchable app
		appId?: string;

		// instanceId is set if intent should be delivered to open app
		instanceId?: string;
	};
	meta: BCPMeta;
}

// Sent by the DA to the App to enable the built-in channel selector. `id` can optionally be set in order
// to initialize a specific channel (for instance when rehydrating an app from previous persistence)
export type BCPinitializeChannelSelector = {
	type: "initializeChannelSelector",
	payload: {
		// The id of the channel which should be enabled, if one should be initially set
		id?: string;
	}
}

export type BCPMessageInbound =
	BCPBroadcastInbound |
	BCPIntentResult |
	BCPPrivateChannelOnAddContextListener |
	BCPPrivateChannelOnDisconnect |
	BCPPrivateChannelOnUnsubscribe |
	BCPRaiseIntentInbound;

export type BCPMessageResponse =
	BCPAck |
	BCPCreatePrivateChannelResponse |
	BCPFindInstancesResponse |
	BCPFindIntentResponse |
	BCPFindIntentsByContextResponse |
	BCPGetAppMetadataResponse |
	BCPGetCurrentChannelResponse |
	BCPGetCurrentContextResponse |
	BCPGetInfoResponse |
	BCPGetOrCreateChannelResponse |
	BCPGetUserChannelsResponse |
	BCPOpenResponse |
	BCPRaiseIntentResponse;

export type BCPMessageOutbound =
	BCPAddContextListener |
	BCPAddIntentListener |
	BCPBroadcast |
	BCPCreatePrivateClient |
	BCPFindInstances |
	BCPFindIntent |
	BCPFindIntentsByContext |
	BCPGetAppMetadata |
	BCPGetCurrentChannel |
	BCPGetCurrentContext |
	BCPGetInfo |
	BCPGetOrCreateChannel |
	BCPGetUserChannels |
	BCPJoinUserChannel |
	BCPLeaveCurrentChannel |
	BCPOpen |
	BCPPrivateChannelDisconnect |
	BCPRaiseIntent |
	BCPRaiseIntentForContext |
	BCPRemoveContextListener |
	BCPRemoveIntentListener;

export type BCPMessage = BCPMessageInbound | BCPMessageOutbound | BCPMessageResponse;

// Returns a new type that equals the member of an original type
export type Member<T, K extends keyof T> = T[K];

export type BCPType = Member<BCPMessage, "type">;