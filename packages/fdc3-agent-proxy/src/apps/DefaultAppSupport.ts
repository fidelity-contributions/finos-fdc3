import { AppIdentifier, AppMetadata, ImplementationMetadata, OpenError, ResolveError } from '@finos/fdc3-standard';
import { Context } from '@finos/fdc3-context';
import { AppSupport } from './AppSupport';
import { Messaging } from '../Messaging';
import {
  FindInstancesRequest,
  FindInstancesResponse,
  GetAppMetadataRequest,
  GetAppMetadataResponse,
  GetInfoRequest,
  GetInfoResponse,
  OpenRequest,
  OpenResponse,
} from '@finos/fdc3-schema/dist/generated/api/BrowserTypes';
import { throwIfUndefined } from '../util';
export class DefaultAppSupport implements AppSupport {
  readonly messaging: Messaging;

  constructor(messaging: Messaging) {
    this.messaging = messaging;
  }

  async findInstances(app: AppIdentifier): Promise<AppIdentifier[]> {
    const request: FindInstancesRequest = {
      type: 'findInstancesRequest',
      payload: {
        app,
      },
      meta: this.messaging.createMeta(),
    };

    const out = await this.messaging.exchange<FindInstancesResponse>(request, 'findInstancesResponse');
    return out.payload.appIdentifiers ?? [];
  }

  async getAppMetadata(app: AppIdentifier): Promise<AppMetadata> {
    const request: GetAppMetadataRequest = {
      type: 'getAppMetadataRequest',
      payload: {
        app: app as AppIdentifier,
      },
      meta: this.messaging.createMeta(),
    };

    const response = await this.messaging.exchange<GetAppMetadataResponse>(request, 'getAppMetadataResponse');

    throwIfUndefined(
      response.payload.appMetadata,
      'Invalid response from Desktop Agent to getAppMetadata!',
      response,
      ResolveError.TargetAppUnavailable
    );

    return response.payload.appMetadata!;
  }

  async open(app: AppIdentifier, context?: Context | undefined): Promise<AppIdentifier> {
    const request: OpenRequest = {
      type: 'openRequest',
      payload: {
        app: {
          appId: app.appId,
          instanceId: app.instanceId,
        },
        context,
      },
      meta: this.messaging.createMeta(),
    };

    const response = await this.messaging.exchange<OpenResponse>(request, 'openResponse', OpenError.AppTimeout);

    throwIfUndefined(
      response.payload.appIdentifier,
      'Invalid response from Desktop Agent to open!',
      response,
      OpenError.AppNotFound
    );

    return response.payload.appIdentifier!;
  }

  async getImplementationMetadata(): Promise<ImplementationMetadata> {
    const request: GetInfoRequest = {
      type: 'getInfoRequest',
      payload: {},
      meta: this.messaging.createMeta(),
    };

    const response = await this.messaging.exchange<GetInfoResponse>(
      request,
      'getInfoResponse',
      'timed out waiting for getInfo response!'
    );

    if (response.payload.implementationMetadata) {
      return response.payload.implementationMetadata;
    } else {
      //This will only happen if the DA implementation returns an invalid message with a missing implementationMetadata property
      console.error('Invalid response from Desktop Agent to open!', response);
      const unknownImpl: ImplementationMetadata = {
        fdc3Version: 'unknown',
        provider: 'unknown',
        appMetadata: { appId: 'unknown', instanceId: 'unknown' },
        optionalFeatures: {
          OriginatingAppMetadata: false,
          UserChannelMembershipAPIs: false,
          DesktopAgentBridging: false,
        },
      };
      return unknownImpl;
    }
  }
}
