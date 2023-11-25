/* tslint:disable */
/* eslint-disable */
/**
 * 
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Serializer for requesting a password reset e-mail.
 * @export
 * @interface PasswordReset
 */
export interface PasswordReset {
    /**
     * 
     * @type {string}
     * @memberof PasswordReset
     */
    email: string;
}

/**
 * Check if a given object implements the PasswordReset interface.
 */
export function instanceOfPasswordReset(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;

    return isInstance;
}

export function PasswordResetFromJSON(json: any): PasswordReset {
    return PasswordResetFromJSONTyped(json, false);
}

export function PasswordResetFromJSONTyped(json: any, ignoreDiscriminator: boolean): PasswordReset {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
    };
}

export function PasswordResetToJSON(value?: PasswordReset | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
    };
}

